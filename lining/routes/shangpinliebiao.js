const express = require("express");
const Shangpinliebiao = require("../middleware/shangpinliebiao");
const bodyParser = require("body-parser");

let shangpinliebiaoApp = express();

shangpinliebiaoApp.use(
  bodyParser.urlencoded({
    extended: false, // 是否拓展模式
    // limit: 2 * 1024 * 1024, // 服务器限制接收数据大小2M
  })
);

shangpinliebiaoApp.use(Shangpinliebiao.getGoodsList);

// 实现商品列表
shangpinliebiaoApp.get("/", (req, res) => {
  let { goodsList } = req;
  // 记住send和sendfile的前后顺序
  try {
    res.status(200).send({
      status: 200,
      msg: "获取商品列表数据成功",
      state: "success",
      data: goodsList,
    });
  } catch (error) {
    res.status(202).send({
      status: 202,
      msg: "获取商品列表数据失败",
      state: "failer",
      data: error,
    });
  }
});

// 实现商品列表子页面
shangpinliebiaoApp.get("/", (req, res) => {
  res.sendfile("public/shangpinliebiao.html");
});

module.exports = shangpinliebiaoApp;
