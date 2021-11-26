const express = require("express");

const fs = require("fs");
const multer = require("multer");
const internal = require("stream");
const { con } = require("./controller/sql_controller");
const { loginqueryRouter } = require("./router/loginquery");
const { redirectRouter } = require("./router/redirect");
require("ejs");
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./page/resources");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
let upload = multer({ storage: storage });
const PORT = 8898;

let app = express();
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

app.use("/loginquery", loginqueryRouter);

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

const getList = (res, measurement) => {
  con.query(
    `SELECT * FROM (
      SELECT place.*, place_pop.${measurement}, image.path, image.imageid
      FROM placeserv.place
      LEFT JOIN placeserv.place_pop ON placeserv.place.pid = placeserv.place_pop.pid
      LEFT JOIN placeserv.image ON placeserv.place.pid = placeserv.image.pid
      ORDER BY placeserv.image.imageid DESC
    ) AS a WHERE imageid IN (SELECT MAX(image.imageid) FROM image GROUP BY image.pid)
    ORDER BY ${measurement} DESC;`,
    (serr, sres, sfield) => {
      console.log(sres);
      let entries = [];
      sres.forEach((elem) => {
        if (entries.length % 2 === 0) {
          var evenodd = "odd-line";
        } else {
          var evenodd = "even-line";
        }
        if (entries.length === 0) {
          var rank = " first";
        } else if (entries.length === 1) {
          var rank = " second";
        } else if (entries.length === 2) {
          var rank = " third";
        } else {
          var rank = "";
        }
        var tmp = `
      <div class="list-entry ${evenodd}${rank}">
        <div class="rank${rank}"><div class="tot-centred">${
          entries.length + 1
        }</div></div>
        <div class="list-name"><p class="list-text"><a href="/p/${elem.pid}">${
          elem.name
        }</a></p></div>
        <div class="list-image"><img src="${elem.path}" /></div>
      </div>`;
        entries.push(tmp);
      });
      res.end(
        JSON.stringify({
          html: entries.join("\n"),
        })
      );
    }
  );
  console.log();
};

app.get("/getdailylist", (req, res) => {
  getList(res, "daily");
});

app.get("/getweeklylist", (req, res) => {
  getList(res, "weekly");
});

app.get("/getmonthlylist", (req, res) => {
  getList(res, "monthly");
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
