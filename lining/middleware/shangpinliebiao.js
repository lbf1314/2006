const Shangpinliebiao = require("../model/shangpinliebiao");

module.exports = {
  // 获取商品列表
  // 必须有next() 不然无法向下执行
  getGoodsList: (req, res, next) => {
    Shangpinliebiao.getGoodsList()
      .then((results) => {
        req.goodsList = results;
        next();
      })
      .catch((err) => {
        next(err);
      });
  },
};
