const express = require("express");
const loginqueryRouter = express.Router();
const { con } = require("../controller/sql_controller");

loginqueryRouter.post("/", (req, res) => {
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

ret = { loginqueryRouter };
module.exports = ret;
