const express = require("express");
const bodyParser = require("body-parser");
const gouwuche = require("../model/gouwuche");

let gouwucheApp = express();

gouwucheApp.use(
  bodyParser.urlencoded({
    extended: false, // 是否拓展模式
    // limit: 2 * 1024 * 1024, // 服务器限制接收数据大小2M
  })
);

// 未登录实现购物车页面
gouwucheApp.get("/", (req, res) => {
  let { goodsIdStr } = req.query;

  gouwuche.getCartsList(goodsIdStr).then((result) => {
    try {
      res.status(200).send({
        status: 200,
        msg: "未登录购物车页数据获取成功",
        state: "success",
        data: result,
      });
    } catch (error) {
      res.status(202).send({
        status: 202,
        msg: "未登录购物车页数据获取失败",
        state: "failer",
        data: error,
      });
    }
  });
});

// 已登录实现购物车页面
gouwucheApp.post("/", (req, res) => {
  let { user } = req.body;
  // console.log(req.body);

  gouwuche.getCartsList1(user).then((result) => {
    try {
      res.status(200).send({
        status: 200,
        msg: "已登录实现购物车页数据获取成功",
        state: "success",
        data: result,
      });
    } catch (error) {
      res.status(202).send({
        status: 202,
        msg: "已登录实现购物车页数据获取失败",
        state: "failer",
        data: error,
      });
    }
  });
});

// 删除指定商品
gouwucheApp.post("/delte", (req, res) => {
  let { user, goodsId } = req.body;

  gouwuche.deleGoods(user, goodsId).then((result) => {
    try {
      res.status(200).send({
        status: 200,
        msg: "指定商品删除成功",
        state: "success",
        data: "",
      });
    } catch (error) {
      res.status(202).send({
        status: 202,
        msg: "指定商品删除失败",
        state: "failer",
        data: error,
      });
    }
  });
});

// 已登录改变商品数量
gouwucheApp.post("/changeNum", (req, res) => {
  console.log(req.body);
  let { user, goodsId, goodsNum } = req.body;
  gouwuche.changGoodsNum(user, goodsId, goodsNum).then((result) => {
    try {
      res.status(200).send({
        status: 200,
        msg: "改变商品数量成功",
        state: "success",
        data: "",
      });
    } catch (error) {
      res.status(202).send({
        status: 202,
        msg: "改变商品数量失败",
        state: "failer",
        data: error,
      });
    }
  });
});

//加载购物车页面
gouwucheApp.get("/", (req, res) => {
  res.sendfile("public/gouwuche.html");
});

module.exports = gouwucheApp;
