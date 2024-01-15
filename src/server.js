//const { usersRouter } = require("./routes/users");
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/../client"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/../client/index.html");
});

app.use((req, res, next) => {
  const error = Error("Not found");
  error.statusCode = 404;
  res.sendFile(process.cwd() + "/client/404.html");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000!");
});
