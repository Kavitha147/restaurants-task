const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const whitelist = "http://localhost:3000";

/** Used for thr CROS origin erros */
app.use(express.json());
const corsOptions = {
  origin: (origin, callback) => {
    if (
      !whitelist ||
      whitelist.includes(origin) ||
      whitelist === "*" ||
      !origin
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

/** Used for thr get Hostels list API */
app.get("/getHotels", (req, res) => {
  const mysql = require("mysql");
  const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
  });

  conn.connect(function (err) {
    if (err) throw err;
    conn.query("SELECT * FROM restaurants", function (err, result, fields) {
      if (err) throw err;
      res.json({ "message": "ok", list: result });
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
