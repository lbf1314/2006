const mysql = require("mysql");

module.exports = class Model {
  // 连接对象
  static conn = null;

  // 连接数据库
  static connection() {
    Model.conn = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "root",
      database: "lining",
      port: 3306,
    });
    Model.conn.connect((err) => {
      if (err) {
        console.log(`数据库连接失败：${err.message}`);
      }
    });
  }

  // 关闭数据库
  static end() {
    if (null != Model.conn) {
      Model.conn.end();
    }
  }

  // 通用查询方法
  static query(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.connection();

      Model.conn.query(sql, params, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });

      this.end();
    });
  }
};
