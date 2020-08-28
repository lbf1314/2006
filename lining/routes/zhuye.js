const express = require("express");

let zhuyeApp = express();

// 加载首页页面
zhuyeApp.get("/", (req, res) => {
  res.sendfile("public/zhuye.html");
});

module.exports = zhuyeApp;
