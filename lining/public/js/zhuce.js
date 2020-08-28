const zhuceDom = document.getElementsByClassName("reg_login")[0];
const sortPwd = document.getElementsByClassName("sortPwd")[0];
const pwdStrongText = document.getElementsByClassName("safety-name")[0];
const pwdStrongRank = document.getElementsByClassName("safety-rank");
const registerBtn = document.getElementsByClassName("reg_login_btn")[0];

class Zhuce {
  constructor() {
    // 通过次数
    this.count = 0;
    this.addEvent();
  }

  // 正则验证
  RegExp(regExp, target) {
    let val = target.value;
    let reg = regExp;
    // 判断是否为空
    if (val == "") {
      target.style.borderColor = "";
      return false;
    }
    let flag = null;

    if (reg.test(val)) {
      flag = true;
      this.count++;
      target.style.borderColor = "green";
    } else {
      flag = false;
      target.style.borderColor = "red";
    }

    return flag;
  }

  // 事件委托
  eventEntrust(eve) {
    let e = window.event || eve;
    let target = e.target || e.srcElement;
    let cls = target.className;
    switch (cls) {
      case "user":
        this.RegExp(/^[1]\d{10}$/, target);
        break;
      case "pwd":
        this.RegExp(/^\w{6,20}$/, target);
        this.pwdStrong(target);
        break;
      case "sortPwd":
        this.RegExp(new RegExp(sortPwd.value), target);
        break;
      case "authCode":
        this.RegExp(/^appd$/, target);
        break;
      default:
        break;
    }
  }

  // 密码强弱判断
  pwdStrong(target) {
    let bool = target.value;
    let a,
      b,
      c = 0;

    a = /\d+/.test(target.value) ? 1 : 0;
    b = /[a-z]+/.test(target.value) ? 1 : 0;
    c = /[A-Z]+/.test(target.value) ? 1 : 0;

    switch (a + b + c) {
      case 1:
        pwdStrongText.innerHTML = "弱";
        pwdStrongRank[0].style.backgroundColor = "red";
        break;
      case 2:
        pwdStrongText.innerHTML = "中";
        pwdStrongRank[0].style.backgroundColor = "red";
        pwdStrongRank[1].style.backgroundColor = "red";
        break;
      case 3:
        pwdStrongText.innerHTML = "强";
        pwdStrongRank[0].style.backgroundColor = "red";
        pwdStrongRank[1].style.backgroundColor = "red";
        pwdStrongRank[2].style.backgroundColor = "red";
        break;
      default:
        break;
    }
    if (target.value == "") {
      pwdStrongText.innerHTML = "";
      pwdStrongRank[0].style.backgroundColor = "rgb(162, 162, 162)";
      pwdStrongRank[1].style.backgroundColor = "rgb(162, 162, 162)";
      pwdStrongRank[2].style.backgroundColor = "rgb(162, 162, 162)";
    }
  }

  // 后端验证
  server() {
    $(".reg_login_btn>input").click(() => {
      if (this.count != 4) {
        alert("请检查信息是否正确！！！！");
      } else {
        let user = $(".user").val();
        let pwd = $(".pwd").val();
        let authcode = $(".authCode").val();
        $.post("http://localhost:9999/zhuce/zhuce", {
          username: user,
          userpassword: pwd,
          authcode: authcode,
        }).then((res) => {
          console.log(res);
          // location.href = "denglu.html";
        });
      }
    });
  }

  // 绑定事件
  addEvent() {
    zhuceDom.addEventListener("change", () => {
      this.eventEntrust();
    });
    registerBtn.addEventListener("click", () => {
      this.server();
    });
  }
}

new Zhuce();
