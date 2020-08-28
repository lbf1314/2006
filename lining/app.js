const express = require("express");
const path = require("path");

let app = express();

// 配置静态资源
app.use(express.static(path.join(__dirname, "./public")));

// 调用子应用
app.use(/\/(zhuye)?/, require("./routes/zhuye"));
app.use("/denglu", require("./routes/denglu"));
app.use("/zhuce", require("./routes/zhuce"));
app.use("/shangpinliebiao", require("./routes/shangpinliebiao"));
app.use("/xiangqingye", require("./routes/xiangqingye"));
app.use("/gouwuche", require("./routes/gouwuche"));

app.listen(9999, () => {
  console.log("跳转至：http://localhost:9999");
});
