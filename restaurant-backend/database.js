var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

/** To Check the DB is connected */
conn.connect(function (err) {
  if (err) throw err;
  conn.query("SELECT * FROM restaurants", function (err, result, fields) {
    if (err) throw err;
  });
});

module.exports = conn;
