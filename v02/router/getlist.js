const express = require("express");
const { con } = require("../controller/sql_controller");
const getlistRouter = express.Router();
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

getlistRouter.get("/dailylist", (req, res) => {
  getList(res, "daily");
});

getlistRouter.get("/weeklylist", (req, res) => {
  getList(res, "weekly");
});

getlistRouter.get("/get/monthlylist", (req, res) => {
  getList(res, "monthly");
});

const ret = { getlistRouter };
module.exports = ret;
