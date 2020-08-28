const express = require("express");
const Denglu = require("../model/denglu");
const bodyParser = require("body-parser");

let dengluApp = express();

dengluApp.use(
  bodyParser.urlencoded({
    extended: false, // 是否拓展模式
    // limit: 2 * 1024 * 1024, // 服务器限制接收数据大小2M
  })
);

// 加载登录页页面
dengluApp.get("/", (req, res) => {
  res.sendfile("public/denglu.html");
});

// 实现登录操作
dengluApp.post("/denglu", (req, res) => {
  let user = req.body.username;
  let pwd = req.body.userpassword;
  let authcode = req.body.authcode;

  Denglu.denglu(user, pwd, authcode).then((result) => {
    if (result.length == 0) {
      res.status(202).send({
        status: 202,
        msg: "账号或密码错误",
        state: "failer",
        data: "",
      });
    } else {
      res.status(200).send({
        status: 200,
        msg: "登录成功",
        state: "success",
        data: result,
      });
    }
  });
});

module.exports = dengluApp;
