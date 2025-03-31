const express = require("express");
const PORT = 8001;
const app = express();

let errCount = 0;

app.get("/user", function (req, res) {
  // Write your logic here -> next time
  throw new Error({ msg: "User not found" }); //pre build JS error -> throw
  res.status(200).json({ name: "john" });
});

app.post("/user", function (req, res) {
  throw new Error("User not found!"); // this blocks here -> res don't work
  res.status(200).json({ msg: "created dummy user" });
});

app.get("/errorCount", function (req, res) {
  res.status(200).json({ errCount });
});

//error handling middleware
app.use((err, req, res, next) => {
  errCount += 1;
  res.status(404).send({ err: "Internal server Error!" }); //this print when error founds
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT ${PORT}`);
});
