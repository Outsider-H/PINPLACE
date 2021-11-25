PORT = 11235;
const express = require("express");
const morgan = require("morgan");
const { sql_router } = require("./router/sql_router");
const multer = require("multer");
const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().array());

app.use(express.static("./static"));
app.listen(PORT, () => {
  console.log(`Server Static on ${PORT}`);
});
app.use("/sql", sql_router);
// app.use("/sql/login", (req, res) => {
//   console.log(req.body);
//   res.send("suc");
// });
