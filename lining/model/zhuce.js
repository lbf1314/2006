module.exports = class Zhuce extends require("./model") {
  static zhuce(username, userpassword, authcode) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT username FROM `user` WHERE username = " + username;
      this.query(sql, username).then((result) => {
        if (result.length == 0) {
          let sql =
            "INSERT INTO `user` (`username`,`userpassword`,`authcode`) VALUE (?,?,?)";
          this.query(sql, [username, userpassword, authcode])
            .then((result) => {
              resolve(result);
            })
            .catch((err) => {
              console.log(err.message);
              reject(err);
            });
        } else {
          console.log("账号重复");
        }
      });
    });
  }
};
