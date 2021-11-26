var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "192.168.30.20",
  user: "root",
  password: "",
  database: "test",
});

conn.connect(function (err) {
  if (err) throw err;
  conn.query("SELECT * FROM restaurants", function (err, result, fields) {
    if (err) throw err;
  });
});

module.exports = conn;
