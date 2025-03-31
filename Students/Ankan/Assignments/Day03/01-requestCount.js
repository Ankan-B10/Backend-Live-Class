const express = require("express");
const PORT = 8000;
const app = express();

//Solutions of Assignments ->

//global
let requestCount = 0;

//global middleware
const middlewareForRequestCount = (req, res, next) => {
  requestCount += 1;
  next();
};

app.use(middlewareForRequestCount); //using middleware

app.get("/user", function (req, res) {
  res.status(200).json({ name: "ankan" });
});

app.post("/user", function (req, res) {
  res.status(200).json({ msg: "created dummy user" });
});

app.get("/requestCount", function (req, res) {
  res.status(200).json({ requestCount });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT ${PORT}`);
});
