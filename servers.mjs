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

// async function queryDatabase() {
//   try {
//     await sql.connect(config);
//     const query =
//       "select * from Masterfile.Location where WarehouseCode= 'MLICEB' AND PlantCode = 'METS 1' AND LocationCode = '01AISLE' ";
//     const request = new sql.Request();
//     const result = await request.query(query);
//     // console.log(result.recordset);
//     return result.recordset; // Process the query results
//   } catch (error) {
//     console.error("Error querying the database:", error);
//   } finally {
//     await sql.close();
//   }
// }
// queryDatabase();
async function queryDatabase(query) {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    const result = await request.query(query);
    console.log(result.recordset);
    return result.recordset; // Return the query results
  } catch (error) {
    console.error("Error querying the database:", error);
  } finally {
    await sql.close();
  }
}

app.get("/data", async (req, res) => {
  try {
    const query =
      "select * from Masterfile.Location where WarehouseCode= 'MLICEB' AND PlantCode = 'METS 1' AND LocationCode = '01AISLE' ";
    const data = await queryDatabase(query);
    res.json(data); // Send the data as JSON response\
  } catch (error) {
    res.status(500).send("Error retrieving data from database");
  }
});

app.get("/data1", async (req, res) => {
  try {
    // Assuming you've defined a function like `queryDatabase` that can execute a SQL query
    const query = `SELECT A.Location,
    A.WarehouseCode,
    A.ItemCode,
    B.ShortDesc,
    C.PlantCode,
    C.LocationCode,
    C.RoomCode,
    C.StorageType,
	C.CurrentPalletCount,
	C.MaxPalletCount

FROM
    WMS.CountSheetSetUp A
LEFT JOIN Masterfile.Item B
    ON A.ItemCode = B.ItemCode
LEFT JOIN Masterfile.Location C
    ON A.Location = C.LocationCode`;
    const result = await queryDatabase(query); // Use this function to execute the query
    res.json(result); // Send the query results back as JSON
  } catch (error) {
    console.error("Error retrieving data from database:", error);
    res.status(500).send("Error retrieving data from database");
  }
});

app.get("/data2", async (req, res) => {
  try {
    // Assuming you've defined a function like `queryDatabase` that can execute a SQL query
    const query =
      "select * from Masterfile.Location where WarehouseCode= 'MLIBAL' AND PlantCode = 'METS 1' AND LocationCode Like '01AR01%' AND LocationCode LIKE '%D%'";
    const result = await queryDatabase(query); // Use this function to execute the query
    res.json(result); // Send the query results back as JSON
  } catch (error) {
    console.error("Error retrieving data from database:", error);
    res.status(500).send("Error retrieving data from database");
  }
});

let server = app.listen(5000, function () {
  console.log(`Server running at http://localhost:5000`);
});
