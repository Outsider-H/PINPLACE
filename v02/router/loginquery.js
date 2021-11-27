const express = require("express");
const loginqueryRouter = express.Router();
const bcrpyt = require("bcrypt");
const { con } = require("../controller/sql_controller");

loginqueryRouter.post("/", (req, res) => {
  const loginQuery = (id, pw) => {
    con.query(`SELECT * FROM user WHERE id="${id}";`, (serr, sres, sfield) => {
      console.log("test");
      if (serr) throw serr;
      if (sres.length === 0) {
        res.json({
          success: false,
          statement: "[INVALID PASSWORD OR USERNAME]",
        });
      } else if (sres.length === 1) {
        console.log(`[LOGIN SUCCESS] from ${id}`);
        //   res.send("hi");
        // res.end(`${auth}`);
        console.log(sres[0].password);
        console.log(pw);
        bcrpyt.compare(pw, sres[0].password, (err, bres) => {
          console.log(bres);
          if (bres) {
            res.cookie("userId", sres[0].uid);
            res.json({ success: true, statement: "success", uid: sres[0].uid });
          } else {
            res.json({
              success: false,
              statement: "[INVALID PASSWORD OR USERNAME]",
            });
          }
        });
      } else {
        console.log(`[ERROR]`);
      }
    });
  };
  loginQuery(req.body.id, req.body.password);
});

ret = { loginqueryRouter };
module.exports = ret;
