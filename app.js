const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const authRouter = require("./routes/api/auth");
const foodRouter = require("./routes/api/food");
const waterRouter = require("./routes/api/water");
const weightRouter = require("./routes/api/weight");
const userRouter = require("./routes/api/user");

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", authRouter);
app.use("/api/user", foodRouter);
app.use("/api/user", waterRouter);
app.use("/api/user", weightRouter);
app.use("/api/user", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});


app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;