const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "cn_userdatabase",
  multipleStatements: true,
});

con.connect((e) => {
  if (e) throw e;
  console.log("Connected to mySQL");
});

const getAllUser = (req, res) => {
  con.query(
    `SELECT iduser, username, isAdmin FROM cn_userdatabase.user`,
    (serr, sres, sfield) => {
      console.log(sres);
      res.json(sres);
    }
  );
};
const loginRequest = (req, res, next) => {
  console.log(req.body);

  res.json({ success: true, userId: 1 });
};

const ret = { getAllUser, loginRequest };
module.exports = ret;
