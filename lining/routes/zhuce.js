const express = require("express");
const bodyParser = require("body-parser");
const zhuce = require("../model/zhuce");

let zhuceApp = express();

zhuceApp.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// 加载注册页面
zhuceApp.get("/", (req, res) => {
  res.sendfile("public/zhuce.html");
});

// 实现注册操作
zhuceApp.post("/zhuce", (req, res) => {
  let user = req.body.username;
  let pwd = req.body.userpassword;
  let authcode = req.body.authcode;
  if (user == "" || pwd == "" || authcode == "") {
    res.status(202).send({
      status: 202,
      msg: "账号、密码或验证码为空",
      state: "failer",
      data: "",
    });
    return;
  }
  zhuce.zhuce(user, pwd, authcode).then((result) => {
    res.status(200).send({
      status: 200,
      msg: "注册成功",
      state: "success",
      data: result,
    });
  });
});

module.exports = zhuceApp;
