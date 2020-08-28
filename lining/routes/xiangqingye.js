const express = require("express");
const bodyParser = require("body-parser");
const xiangqingye = require("../model/xiangqingye");

let XiangqingyeApp = express();

XiangqingyeApp.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// 实现详情页页面
XiangqingyeApp.get("/", (req, res) => {
  let goodsId = req.query.goodsId;
  xiangqingye.getDetail(goodsId).then((result) => {
    try {
      res.status(200).send({
        status: 200,
        msg: "详情页数据获取成功",
        state: "success",
        data: result,
      });
    } catch (error) {
      res.status(202).send({
        status: 202,
        msg: "详情页数据获取失败",
        state: "failer",
        data: error,
      });
    }
  });
});

// 存入数据到购物车
XiangqingyeApp.post("/addCarts", (req, res) => {
  let user = req.body.user;
  let goodsId = req.body.goodsId;
  let goodsNum = req.body.goodsNum;
  let goodsSize = req.body.goodsSize;
  let goodsColor = req.body.goodsColor;

  xiangqingye
    .addCarts(user, goodsId, goodsNum, goodsSize, goodsColor)
    .then((result) => {
      try {
        res.status(200).send({
          status: 200,
          msg: "成功添加至数据库",
          state: "success",
          data: "",
        });
      } catch (error) {
        res.status(202).send({
          status: 202,
          msg: "添加数据库失败",
          state: "failer",
          data: "",
        });
      }
    });
});

module.exports = XiangqingyeApp;
