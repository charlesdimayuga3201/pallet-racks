import { join } from "path";
import express from "express";
import sql from "mssql"; // Use import for mssql module

import { getCurrentDirectory } from "./helper.js";

const app = express();

const CurrentDirectory = getCurrentDirectory(import.meta.url);

// Serve static files from a specified directory (e.g., 'public')
app.use(express.static(join(CurrentDirectory, "src")));

var config = {
  user: "OJT",
  password: "123!@#qwe",
  server: "192.168.180.22",
  database: "WMS-OJT",
  options: {
    encrypt: false,
  },
  // "requestTimeOut" : 1000000
};

async function queryDatabase() {
  try {
    await sql.connect(config);
    const query =
      "select * from Masterfile.Location where LocationCode= '01AISLE'";
    const request = new sql.Request();
    const result = await request.query(query);
    console.log(result.recordset);
    return result.recordset; // Process the query results
  } catch (error) {
    console.error("Error querying the database:", error);
  } finally {
    await sql.close();
  }
}
queryDatabase();

app.get("/data", async (req, res) => {
  try {
    const data = await queryDatabase();
    res.json(data); // Send the data as JSON response\
  } catch (error) {
    res.status(500).send("Error retrieving data from database");
  }
});

let server = app.listen(5000, function () {
  console.log(`Server running at http://localhost:5000`);
});
