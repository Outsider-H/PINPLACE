const express = require("express");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const multer = require("multer");
const internal = require("stream");
const { con } = require("./controller/sql_controller");
const { loginqueryRouter } = require("./router/loginquery");
const { redirectRouter } = require("./router/redirect");
const { getlistRouter } = require("./router/getlist");
const { signupRouter } = require("./router/signup");
require("ejs");

const PORT = 8898;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./page/resources");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
let upload = multer({ storage: storage });

let app = express();
app.use(cookieParser());
app.set("view engine", "ejs");
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

const auth = new Date().getTime();
app.use("/get", getlistRouter);
app.use("/loginquery", loginqueryRouter);
app.use("/sign", signupRouter);

app.get("/main", (req, res) => {
  console.log(req.query.auth);
  if (1 == req.query.auth) {
    res.sendFile(__dirname + "/page/main.html");
  }
});

app.post("/imguploadform", upload.single("image"), (req, res) => {
  let filename = req.file.filename;
  let placeId = req.file.filename.split("-")[1];
  let userId = req.file.filename.split("-")[2];
  let path = `/resources/${filename}`;

  console.log(path);
  console.log(userId);
  console.log(filename);

  //get additional content here
  console.log(req.body);

  const uploadImg = (uid, pid, img) => {
    console.log(uid, pid, img);
    con.query(
      `INSERT INTO placeserv.image (uid, pid, path) VALUES (${uid}, ${pid}, "${img}")`,
      (serr, sres, sfield) => {
        if (serr) throw serr;
      }
    );
  };
  uploadImg(userId, placeId, path);
  res.end("success");
});

app.get("/getplace", (req, res) => {
  const listPlace = () => {
    con.query(
      `SELECT * FROM placeserv.place ORDER BY pid ASC`,
      (serr, sres, sfield) => {
        console.log(sres);
        let ret = [];
        sres.forEach((elem) => ret.push(elem.name));
        console.log(ret);
        res.end(
          JSON.stringify({
            html: sres
              .map(
                (elem) => `<option value="${elem.pid}">${elem.name}</option>`
              )
              .join(" "),
          })
        );
      }
    );
  };
  listPlace();
});

app.get("/p/:pid", (req, res) => {
  const getPhoto = (pid) => {
    con.query(
      `SELECT image.*, place.* FROM placeserv.image LEFT JOIN placeserv.place
    ON placeserv.image.pid = placeserv.place.pid WHERE placeserv.image.pid = ${pid}
    ORDER BY placeserv.image.imageid DESC LIMIT 9`,
      (serr, sres, sfield) => {
        console.log(sres);
        var pname = sres[0].name;
        var imagePaths = [];
        sres.forEach((elem) => {
          imagePaths.push(elem.path);
        });
        res.render("placeview", { pname: pname, imagePaths: imagePaths });
      }
    );
  };
  getPhoto(req.params.pid);
});

app.use("/redirect", redirectRouter);
