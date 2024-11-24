const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

const filename = "login.txt";

app.get("/login", (req, res) => {
  const login = req.query.login;
  const pass = req.query.pass;
  // appendToFile(`${login} === ${pass}`);
  res.send("test!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function appendToFile(text) {
  if (!fs.existsSync(filename)) {
    fs.writeFileSync(filename, "");
  }

  fs.appendFileSync(filename, text + "\n", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return;
    }
  });

  console.log("Text has been appended to file successfully");
}
