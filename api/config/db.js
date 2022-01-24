const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "auth_test",
});

//connect to database
db.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

module.exports = db;
