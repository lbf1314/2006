module.exports = class Xiangqingye extends require("./model") {
  // 实现详情页
  static getDetail(goodsId) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM `goodsInfo` WHERE id = ?";
      this.query(sql, [goodsId])
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // 添加购物车
  static addCarts(user, goodsId, goodsNum, goodsSize, goodsColor) {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO cart (userid, goodsid,goodsnum,goodsize,goodscolor) VALUE (?,?,?,?,?)`;

      this.query(sql, [user, goodsId, goodsNum, goodsSize, goodsColor])
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
