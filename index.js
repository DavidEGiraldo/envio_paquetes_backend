let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
require("dotenv").config();

const orderRoute = require("..routes/order.route");
const userRoute = require("..routes/user.route");

require("../db/db");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/orders", orderRoute);
app.use("/users", userRoute);

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});
// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
