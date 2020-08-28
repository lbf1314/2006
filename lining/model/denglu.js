// 登录
module.exports = class Denglu extends require("./model") {
  static denglu(username, userpassword, authcode) {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT username,userpassword,authcode FROM `user` WHERE username = ? AND userpassword = ? AND authcode = ?";
      this.query(sql, [username, userpassword, authcode])
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          console.log(`用户名或密码错误：${err.message}`);
          reject(err);
        });
    });
  }
};
