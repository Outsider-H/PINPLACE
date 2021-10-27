let express = require("express");
const mysql = require("mysql");
const multer = require("multer");
const upload = multer();
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "cn_userdatabase",
  multipleStatements: true,
});
con.connect((e) => {
  if (e) throw e;
  console.log("Connected to SQL");
});
const fs = require("fs");
const { resourceLimits } = require("worker_threads");
const { urlencoded } = require("express");

const read = (path, res) => {
  fs.readFile(path, (e, d) => {
    res.end(d);
  });
};

let app = express();
app.use(urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(`${new Date()} - ${req.method} ==> ${req.url}`);
  next();
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/page/login.html");
});
app.get("/login.js", (req, res) => {
  res.sendFile(__dirname + "/page/login.js");
});
app.get("/main.js", (req, res) => {
  res.sendFile(__dirname + "/page/main.js");
});
app.get("/imagenet_classes.js", (req, res) => {
  res.sendFile(__dirname + "/page/imagenet_classes.js");
});
app.get("/imagenet_classes2.js", (req, res) => {
  res.sendFile(__dirname + "/page/imagenet_classes2.js");
});
app.get("/model/mobilenet/model.json", (req, res) => {
  res.sendFile(__dirname + "/page/model/mobilenet/model.json");
});
app.get("/model/mobilenet/group1-shard1of5.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/mobilenet/group1-shard1of5.bin");
});
app.get("/model/mobilenet/group1-shard2of5.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/mobilenet/group1-shard2of5.bin");
});
app.get("/model/mobilenet/group1-shard3of5.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/mobilenet/group1-shard3of5.bin");
});
app.get("/model/mobilenet/group1-shard4of5.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/mobilenet/group1-shard4of5.bin");
});
app.get("/model/mobilenet/group1-shard5of5.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/mobilenet/group1-shard5of5.bin");
});

app.get("/model/place/model.json", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/model.json");
});
app.get("/model/place/group1-shard1of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard1of23.bin");
});
app.get("/model/place/group1-shard2of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard2of23.bin");
});
app.get("/model/place/group1-shard3of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard3of23.bin");
});
app.get("/model/place/group1-shard4of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard4of23.bin");
});
app.get("/model/place/group1-shard5of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard5of23.bin");
});

app.get("/model/place/group1-shard6of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard6of23.bin");
});
app.get("/model/place/group1-shard7of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard7of23.bin");
});
app.get("/model/place/group1-shard8of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard8of23.bin");
});
app.get("/model/place/group1-shard9of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard9of23.bin");
});
app.get("/model/place/group1-shard10of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard10of23.bin");
});

app.get("/model/place/group1-shard11of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard11of23.bin");
});
app.get("/model/place/group1-shard12of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard12of23.bin");
});
app.get("/model/place/group1-shard13of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard13of23.bin");
});
app.get("/model/place/group1-shard14of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard14of23.bin");
});
app.get("/model/place/group1-shard15of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard15of23.bin");
});

app.get("/model/place/group1-shard16of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard16of23.bin");
});
app.get("/model/place/group1-shard17of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard17of23.bin");
});
app.get("/model/place/group1-shard18of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard18of23.bin");
});
app.get("/model/place/group1-shard19of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard19of23.bin");
});
app.get("/model/place/group1-shard20of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard20of23.bin");
});

app.get("/model/place/group1-shard21of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard21of23.bin");
});
app.get("/model/place/group1-shard22of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard22of23.bin");
});
app.get("/model/place/group1-shard23of23.bin", (req, res) => {
  res.sendFile(__dirname + "/page/model/place/group1-shard23of23.bin");
});

app.listen(3000, () => {
  console.log("Server on");
});
const auth = new Date().getTime();

app.post("/loginquery", (req, res) => {
  const loginQuery = (id, pw) => {
    con.query(
      `SELECT * FROM user WHERE username='${id}';`,
      (serr, sres, sfield) => {
        console.log(auth);
        if (serr) throw serr;
        if (sres.length === 1 && sres[0].password === pw) {
          console.log(`[LOGIN SUCCESS] from ${id}`);
          //   res.send("hi");
          res.send(`${auth}`);
        } else {
          console.log(`[INVALID LOGIN ATTEMPT] from ${id}`);
        }
      }
    );
  };
  loginQuery(req.body.id, req.body.password);
});

app.get("/main", (req, res) => {
  console.log(req.query.auth);
  if (auth == req.query.auth) {
    res.sendFile(__dirname + "/page/main.html");
  }
});
