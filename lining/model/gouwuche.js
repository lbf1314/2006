module.exports = class Gouwuche extends require("./model") {
  // 未登录实现购物车列表
  static getCartsList(goodsIdStr) {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT id,goodsName,salePrice,specPrice FROM goodsInfo WHERE id in (" +
        goodsIdStr +
        ")";
      this.query(sql, [goodsIdStr])
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // 已登录实现购物车列表
  static getCartsList1(user) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT cart.goodsid,cart.goodsnum,cart.goodsize,cart.goodscolor,goodsinfo.goodsName,goodsinfo.salePrice,goodsinfo.specPrice
      FROM goodsinfo
      LEFT JOIN cart ON goodsinfo.id = cart.goodsid
      WHERE cart.userid = ${user}`;

      this.query(sql, [user])
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // 删除指定商品
  static deleGoods(user, goodsId) {
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM cart WHERE userid=? AND goodsid=?";

      this.query(sql, [user, goodsId])
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // 已登录改变商品数量
  static changGoodsNum(user, goodsId, goodsNum) {
    return new Promise((resolve, reject) => {
      let sql =
        "UPDATE cart SET goodsnum=" +
        goodsNum +
        " WHERE userid=" +
        user +
        " AND goodsid=" +
        goodsId;

      this.query(sql, [user, goodsId, goodsNum])
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
