require("dotenv").config();
const express = require("express");
const ApiError = require("./utils/apiError");
const errorHeandler = require("./controller/errorController");
const morgan = require("morgan");
const router = require("./routes");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use(router);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.all("*", (req, res, next) => {
  next(new ApiError("Routes does not exist", 404));
});

app.use(errorHeandler);

app.listen(PORT, () => {
  console.log(`server jalan di ${PORT}`);
});
