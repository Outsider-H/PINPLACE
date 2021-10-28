const express = require("express");
const mysql = require("mysql");
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
app.use(express.urlencoded({ extended: false }));
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
