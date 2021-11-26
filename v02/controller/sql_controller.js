const mysql = require("mysql");
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
const ret = { con };
module.exports = ret;
