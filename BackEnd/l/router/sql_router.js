const express = require("express");
const sql_router = express.Router();
const { getAllUser, loginRequest } = require("../controller/sql_controller");

sql_router.get("/test", (req, res) => {
  res.send("sql_router functioning..");
});

sql_router.get("/user", getAllUser);
sql_router.post("/login", loginRequest);

const ret = { sql_router };
module.exports = ret;
