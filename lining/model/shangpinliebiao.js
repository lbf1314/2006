module.exports = class Shangpinliebiao extends require("./model") {
  // 获取商品列表
  static getGoodsList() {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM `goodsInfo`";
      this.query(sql)
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          console.log("获取商品列表失败");
          reject(err);
        });
    });
  }
};
