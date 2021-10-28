const express = require("express");
const mysql = require("mysql");
const fs = require("fs");
const PORT = 8899;

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "cn_userdatabase",
  multipleStatements: true,
});

con.connect((e) => {
  if (e) throw e;
  console.log("Connected to mySQL");
});

let app = express();
app.use((req, res, next) => {
  console.log(`${new Date()}: ${req.method}=>${req.url}`);
  next();
});
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static("./page"));
app.listen(PORT, () => {
  console.log(`Serving Static on ${PORT}`);
});

app.post("/textupload", (req, res) => {
  console.log(req.body.id);
  console.log(req.body.content);

  console.log(`Received request to post Text from ${req.body.id}`);
  const uploadText = (id, cont) => {
    con.query(
      `INSERT INTO cn_userdatabase.text (iduser, content) VALUES (${id},"${cont}")`,
      (serr, sres, sfield) => {
        if (serr) {
          res.end("failed");
          throw serr;
        }
      }
    );
  };
  uploadText(req.body.id, req.body.content);
  res.end("success");
});

app.get("/textload", (req, res) => {
  console.log("Inside");
  const loadText = () => {
    con.query(
      `SELECT username, content FROM cn_userdatabase.text
LEFT JOIN cn_userdatabase.user ON cn_userdatabase.user.iduser = cn_userdatabase.text.iduser`,
      (serr, sres, sfield) => {
        if (serr) throw serr;
        console.log(sres);
        console.log(sres[0].iduser);
        console.log(sres[0].content);
        res.end(
          sres
            .map(
              (element) => `<li>${element.username}: ${element.content}</li>`
            )
            .join(" ")
        );
      }
    );
  };
  console.log("Here");
  loadText();
  console.log("There");
});

app.post("/imgupload", (req, res) => {
  // console.log("img input");
  // console.log(req.body.id);
  console.log(req.body.img[0].size);

  const uploadImg = (id, img) => {
    let name = `${Date.now()}_${id}`;
    let path = `./resources/${name}`;
    fs.writeFileSync(path, img);
    con.query(
      `INSERT INTO cn_userdatabase.image (iduser, image) VALUES (${id}, "${path}")`,
      (serr, sres, sfield) => {
        if (serr) throw serr;
      }
    );
  };

  uploadImg(req.body.id, req.body.img);
  res.end("success");
});

app.get("/imageload", (req, res) => {
  const loadImage = () => {
    con.query(
      `SELECT username, image, idimage FROM cn_userdatabase.image LEFT JOIN cn_userdatabase.user ON cn_userdatabase.user.iduser = cn_userdatabase.image.iduser`,
      (serr, sres, sfield) => {
        console.log(sres);
        // console.log(sres[0].image);
        // let temp = fs.readFileSync(sres[0].image, { encoding: "utf-8" });
        res.end(
          sres
            .map(
              (elem) =>
                `<li class="img${elem.idimage}">${elem.idimage}: ${elem.username}`
            )
            .join(" ")
        );
      }
    );
  };
  loadImage();
});
app.post("/getimage", (req, res) => {
  console.log(`got ${req.body.id}`);

  const loadImage = (id) => {
    con.query(
      `SELECT image FROM cn_userdatabase.image WHERE cn_userdatabase.image.idimage = ${id}`,
      (serr, sres, sfield) => {
        console.log(sres);
        let ret = fs.readFileSync(sres[0].image, "utf-8");
        res.end(ret);
      }
    );
  };
  loadImage(req.body.id);
});
