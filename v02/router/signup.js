const express = require("express");
const { con } = require("../controller/sql_controller");
const bcrpyt = require("bcrypt");
const signupRouter = express.Router();

signupRouter.post("/signupform", (req, res) => {
  console.log(req.body);
  let hashedPassword;
  let saltcount = 10;
  bcrpyt.genSalt(saltcount, (err, salt) => {
    console.log("something");
    bcrpyt.hash(req.body.password, salt, (err, hash) => {
      hashedPassword = hash;
      console.log(hashedPassword);
      con.query(
        `INSERT INTO placeserv.user (id, name, password) VALUE ("${req.body.id}", "${req.body.name}", "${hashedPassword}")`,
        (serr, sres, sfield) => {
          if (serr) throw serr;
        }
      );
    });
  });

  res.send("success");
});

const ret = { signupRouter };
module.exports = ret;
