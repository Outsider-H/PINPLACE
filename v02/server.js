const express = require("express");
const mysql = require("mysql");
const fs = require("fs");
const multer = require("multer");
const internal = require("stream");
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

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "placeserv",
  multipleStatements: true,
});

con.connect((e) => {
  if (e) throw e;
  console.log("Connected to mySQL");
});

let app = express();
app.set('view engine', 'ejs');
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

app.post("/loginquery", (req, res) => {
  const loginQuery = (id, pw) => {
    con.query(
      `SELECT * FROM user WHERE name='${id}';`,
      (serr, sres, sfield) => {
        console.log("test");
        console.log(auth);
        if (serr) throw serr;
        if (sres.length === 1 && sres[0].password === pw) {
          console.log(`[LOGIN SUCCESS] from ${id}`);
          //   res.send("hi");
          res.end(`${auth}`);
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
        con.query(`SELECT * FROM placeserv.place ORDER BY pid ASC`, (serr, sres, sfield) => {
            console.log(sres);
            let ret = [];
            sres.forEach((elem) => ret.push(elem.name));
            console.log(ret);
            res.end(
                JSON.stringify({
                    html: sres
                    .map(
                        (elem) =>
                        `<option value="${elem.pid}">${elem.name}</option>`
                    )
                    .join(" "),
                })
            );
        });
    };
    listPlace();
});

const getList = (res, measurement) => {
  con.query(`SELECT * FROM (
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
        <div class="rank${rank}"><div class="tot-centred">${entries.length + 1}</div></div>
        <div class="list-name"><p class="list-text"><a href="/p/${elem.pid}">${elem.name}</a></p></div>
        <div class="list-image"><img src="${elem.path}" /></div>
      </div>`;
      entries.push(tmp);
    });
    res.end(
      JSON.stringify({
        html: entries.join("\n"),
      })
    );
  });
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
    con.query(`SELECT image.*, place.* FROM placeserv.image LEFT JOIN placeserv.place
    ON placeserv.image.pid = placeserv.place.pid WHERE placeserv.image.pid = ${pid}
    ORDER BY placeserv.image.imageid DESC LIMIT 9`,
    (serr, sres, sfield) => {
      console.log(sres);
      var pname = sres[0].name;
      var imagePaths = [];
      sres.forEach((elem) => {
        imagePaths.push(elem.path);
      });
      res.render('placeview', {pname: pname, imagePaths: imagePaths});
    });
  };
  getPhoto(req.params.pid);
});

app.get("/p", (req, res) => {
  res.writeHead(302, {
    location: '/placeRank.html',
  });
  res.end();
});

app.get("/u", (req, res) => {
  res.writeHead(302, {
    location: '/photoUpload.html',
  });
  res.end();
});

app.get("/s", (req, res) => {
    res.writeHead(302, {
        location: '/sns.html',
    });
    res.end();
});

app.get("/my", (req, res) => {
    const getMyPhoto = (uid) => {
        con.query(`SELECT image.*, user.* FROM placeserv.image LEFT JOIN placeserv.user
        ON placeserv.image.uid = placeserv.user.uid
        WHERE placeserv.image.uid = ${uid}
        ORDER BY placeserv.image.imageid DESC LIMIT 9`,
        (serr, sres, sfield) => {
            console.log(sres);
            var uname = sres[0].name;
            var uimage = sres[0].uimage;
            var imagePaths = [];
            sres.forEach((elem) => {
                imagePaths.push(elem.path);
            });
            res.render('mypage', {uname: uname, imagePaths: imagePaths, uimage: uimage});
        });
    };
    getMyPhoto(1); //should use actual user id
});
