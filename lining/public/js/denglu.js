class Denglu {
  constructor() {
    this.loginAjax();
  }

  loginAjax() {
    $(".reg_login_btn>input").click(() => {
      if (
        $(".user").val() != "" &&
        $(".pwd").val() != "" &&
        $(".authCode").val() == "appd"
      ) {
        let user = $(".user").val();
        let pwd = $(".pwd").val();
        let authcode = $(".authCode").val();
        $.post("http://localhost:9999/denglu/denglu", {
          username: user,
          userpassword: pwd,
          authcode: authcode,
        }).then((res) => {
          console.log(res);
          if (res.status == 200) {
            // 存入cookie并跳转至主页
            localStorage.setItem("user", res.data[0].username);
            location.href = "zhuye.html";
          }
        });
      } else {
        alert("检查信息是否填写正确！！！！");
      }
    });
  }
}

new Denglu();
