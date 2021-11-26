const express = require("express");
const redirectRouter = express.Router();
const { con } = require("../controller/sql_controller");

redirectRouter.get("/predict", (req, res) => {
  res.writeHead(302, {
    location: "/predict.html",
  });
  res.end();
});

redirectRouter.get("/p", (req, res) => {
  res.writeHead(302, {
    location: "/placeRank.html",
  });
  res.end();
});

redirectRouter.get("/u", (req, res) => {
  res.writeHead(302, {
    location: "/photoUpload.html",
  });
  res.end();
});

redirectRouter.get("/s", (req, res) => {
  res.writeHead(302, {
    location: "/sns.html",
  });
  res.end();
});

redirectRouter.get("/my", (req, res) => {
  const getMyPhoto = (uid) => {
    con.query(
      `SELECT image.*, user.* FROM placeserv.image LEFT JOIN placeserv.user
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
        res.render("mypage", {
          uname: uname,
          imagePaths: imagePaths,
          uimage: uimage,
        });
      }
    );
  };
  getMyPhoto(1); //should use actual user id
});

const ret = { redirectRouter };
module.exports = ret;
