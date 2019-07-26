const mysql = require("mysql");
const config = require("./config");

const pool = mysql.createPool({
  host: config.HOST,
  user: config.USERNAME,
  password: config.PASSWORD,
  port: config.PORT,
  database: config.DATABASE
});
module.exports = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        resolve(err);
      }
      connection.query(sql, values, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
        connection.release();
      });
    });
  });
};
