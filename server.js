const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')

const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Coda Full Stack Task." });
});

require("./app/routes/candidate.routes.js")(app);
require("./app/routes/auth.routes.js")(app);


app.listen(4000, () => {
  console.log("Server is running on port 4000.");
});