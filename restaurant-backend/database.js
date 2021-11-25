var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

conn.connect(function (err) {
  if (err) throw err;
  //Select all customers and return the result object:
  conn.query("SELECT * FROM restaurants", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

module.exports = conn;
