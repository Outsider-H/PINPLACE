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
  console.log(req.cookies.userId);
  const getMyPhoto = (uid) => {
    let uname;
    let uimage;
    let imagePaths = [];
    con.query(
      `SELECT * FROM placeserv.user WHERE uid = "${uid}"`,
      (serr, sres, sfield) => {
        console.log(sres);

        uname = sres[0].name;
        console.log(uname);
        uimage = sres[0].uimage;
        console.log(uname, imagePaths, uimage);
        con.query(
          `SELECT * FROM placeserv.image WHERE placeserv.image.uid = ${uid}`,
          (sserr, ssres, ssfield) => {
            ssres.forEach((elem) => {
              imagePaths.push(elem.path);
            });
            res.render("mypage", {
              uname: uname,
              imagePaths: imagePaths,
              uimage: uimage,
            });
          }
        );
      }
    );

    // con.query(
    //   `SELECT image.*, user.* FROM placeserv.image LEFT JOIN placeserv.user
    //     ON placeserv.image.uid = placeserv.user.uid
    //     WHERE placeserv.image.uid = ${uid}
    //     ORDER BY placeserv.image.imageid DESC LIMIT 9`,
    //   (serr, sres, sfield) => {
    //     console.log(sres);
    //     // var uname = sres[0].name;
    //     // var uimage = sres[0].uimage;
    //     let uname = sres[0].name;
    //     let uimage = sres[0].uimage;
    //     var imagePaths = [];
    //     sres.forEach((elem) => {
    //       // console.log(elem.path);
    //       imagePaths.push(elem.path);
    //     });
    //     console.log(uname, imagePaths, uimage);
    //     console.log(imagePaths);
    //     imagePaths.slice(1).forEach((path) => {
    //       console.log(path);
    //     });
    //     res.render("mypage", {
    //       uname: uname,
    //       imagePaths: imagePaths,
    //       uimage: uimage,
    //     });
    //   }
    // );
  };
  getMyPhoto(req.cookies.userId); //should use actual user id
});

const ret = { redirectRouter };
module.exports = ret;
