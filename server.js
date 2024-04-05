import { join } from "path";
import express from "express";
import mssql from "mssql";
import { getCurrentDirectory } from "./helper.js";

const app = express();

const CurrentDirectory = getCurrentDirectory(import.meta.url);

// Serve static files from a specified directory (e.g., 'public')
app.use(express.static(join(CurrentDirectory, "src")));

// Configure your database connection

// Get request
app.get("/", function (req, res) {
  // Config your database credential
  const config = {
    user: "OJT",
    password: "123!@#qwe",
    server: "192.168.180.22",
    database: "WMS-OJT",
  };

  // Connect to your database
  mssql.connect(config, function (err) {
    // Create Request object to perform
    // query operation
    let request = new mssql.Request();

    // Query to the database and get the records
    request.query("select * from Masterfile.Location", function (err, records) {
      if (err) console.log(err);

      // Send records as a response
      // to browser
      res.send(records);
    });
  });
});

let server = app.listen(5000, function () {
  console.log(`Server running at http://localhost:5000`);
});
