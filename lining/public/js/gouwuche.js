const xjDoms = document.getElementsByClassName("xj");
class Carts {
  constructor() {
    this.cartlsit();
    this.addEvent();
  }

  // 创建dom
  creatDom(
    goodsColor,
    goodsName,
    goodsSize,
    salePrice,
    goodsNum,
    delePrice,
    xj,
    goodsId
  ) {
    let strDom = `
      <tr goodsid='${goodsId}'>
        <td>
          <input type="checkbox" class="check-one" id="oneCHK" />
        </td>
        <td>
          <img src="./images/${goodsColor}" alt="" />
        </td>
        <td style="text-align: left; padding-right: 32px;">
          <a href="javascript:;" style="margin-left:32px">${goodsName}</a>
        </td>
        <td>
          <div>尺码：${goodsSize}</div>
        </td>
        <td><div class='danjia'>￥${salePrice}</div></td>
        <td>
          <div>
            <a class="changeNum reduceNum" href="javascript:;">-</a>
            <input class="Num inputChange" type="text" value="${goodsNum}" />
            <a class="changeNum addNum" href="javascript:;">+</a>
          </div>
        </td>
        <td class="youhui">￥${delePrice}</td>
        <td class="xj">
          ￥${xj}
        </td>
        <td>
          <a href="javascript:;" class="dele">删除</a>
        </td>
      </tr>
      `;
    return strDom;
  }

  // 实现购物车页面
  cartlsit() {
    let strDom = "";
    let user = localStorage.getItem("user");

    if (user) {
      // 已登录，后台获取数据
      $.post("http://localhost:9999/gouwuche", { user: user }).then((res) => {
        console.log(res);
        res.data.forEach((ele) => {
          let goodsColor = ele.goodscolor;
          let goodsName = ele.goodsName;
          let goodsSize = ele.goodsize;
          let salePrice = Number(ele.salePrice).toFixed(2);
          let goodsNum = ele.goodsnum;
          let delePrice =
            Number(ele.specPrice) == 0
              ? "0.00"
              : (Number(ele.salePrice) - Number(ele.specPrice)).toFixed(2);
          let xj = (
            (Number(ele.specPrice) == 0
              ? Number(ele.salePrice)
              : Number(ele.specPrice)) * goodsNum
          ).toFixed(2);
          let goodsId = ele.goodsid;

          strDom += this.creatDom(
            goodsColor,
            goodsName,
            goodsSize,
            salePrice,
            goodsNum,
            delePrice,
            xj,
            goodsId
          );
        });
        document.querySelector(".gouwuche-wrap>.grid>tbody").innerHTML = strDom;
      });
    } else {
      // 未登录
      let carts = localStorage.getItem("carts");
      carts = JSON.parse(carts);
      // console.log(carts);

      let goodsIdStr = "";
      for (const goodsId in carts) {
        goodsIdStr += goodsId + ",";
      }
      goodsIdStr = goodsIdStr.substring(0, goodsIdStr.length - 1);

      // 获取所需商品信息
      $.get("http://localhost:9999/gouwuche", { goodsIdStr: goodsIdStr }).then(
        (res) => {
          console.log(res);
          res.data.forEach((ele) => {
            for (const goodsid in carts) {
              // console.log(goodsid == ele.id);
              if (goodsid == ele.id) {
                ele[goodsid] = carts[goodsid];
              }
            }
            // console.log(ele);

            let goodsColor = ele[String(ele.id)][2];
            let goodsName = ele.goodsName;
            let goodsSize = ele[String(ele.id)][1];
            let salePrice = Number(ele.salePrice).toFixed(2);
            let goodsNum = ele[String(ele.id)][0];
            let delePrice =
              Number(ele.specPrice) == 0
                ? "0.00"
                : (Number(ele.salePrice) - Number(ele.specPrice)).toFixed(2);
            let xj = (
              (Number(ele.specPrice) == 0
                ? Number(ele.salePrice)
                : Number(ele.specPrice)) * goodsNum
            ).toFixed(2);
            let goodsId = ele.id;

            strDom += this.creatDom(
              goodsColor,
              goodsName,
              goodsSize,
              salePrice,
              goodsNum,
              delePrice,
              xj,
              goodsId
            );
          });

          document.querySelector(
            ".gouwuche-wrap>.grid>tbody"
          ).innerHTML = strDom;
        }
      );
    }
  }

  // 删除商品
  deleteGoods(target) {
    let trDom = target.parentElement.parentElement;
    let goodsId = trDom.getAttribute("goodsid");
    // console.log(goodsId);
    let user = localStorage.getItem("user");
    // console.log(user);
    // 判断是否登录
    if (user) {
      // 已登录
      $.post("http://localhost:9999/gouwuche/delte", {
        goodsId: goodsId,
        user: user,
      }).then((res) => {
        console.log(res);
      });
    } else {
      // 未登录
      let cartsGoods = localStorage.getItem("carts");
      cartsGoods = JSON.parse(cartsGoods);

      // 删除对应键值
      delete cartsGoods[goodsId];
      // 更新localStorage
      localStorage.setItem("carts", JSON.stringify(cartsGoods));
    }

    // 删除对应节点
    trDom.remove();
  }

  // 价格计算
  static priceCount() {
    // 所有单选框
    let oneCHK = document.getElementsByClassName("check-one");
    let zj = 0;

    for (const ele of oneCHK) {
      // 找出所有选中的
      if (ele.checked) {
        // console.log(ele);
        // 选中的那一行
        let trDom = ele.parentElement.parentElement;
        // 获取小计
        let xj = trDom
          .getElementsByClassName("xj")[0]
          .innerHTML.trim()
          .replace("￥", "");
        zj = xj - 0 + zj;
      }
    }
    // console.log(zj);
    // 渲染页面
    document.getElementsByClassName("cartsfootright")[0].children[1].innerHTML =
      "￥" + Number(zj).toFixed(2);
  }

  // 复选框操作
  checkFn(target) {
    // console.log(target.className);
    let oneCHK = document.getElementsByClassName("check-one");
    let allCHK = document.getElementsByClassName("check-all");
    let cls = target.className;
    // 开关
    let flag = true;
    if (cls.indexOf("check-one") != -1) {
      for (let i = 0; i < oneCHK.length; i++) {
        if (!oneCHK[i].checked) {
          flag = false;
          return;
        }
      }
      allCHK[0].checked = allCHK[1].checked = target.checked;
    } else {
      for (let i = 0; i < oneCHK.length; i++) {
        oneCHK[i].checked = target.checked;
      }
      allCHK[0].checked = allCHK[1].checked = target.checked;
    }
  }

  // 增加商品数量
  addNum(target) {
    let targetTr = target.parentElement.parentElement.parentElement;
    let goodsNum = target.previousElementSibling.value;
    //改变页面数量
    goodsNum = goodsNum - 0 + 1;
    target.previousElementSibling.value = goodsNum;
    //改变页面小计
    targetTr.getElementsByClassName("xj")[0].innerHTML =
      "￥" +
      (targetTr
        .getElementsByClassName("danjia")[0]
        .innerHTML.trim()
        .replace("￥", "") -
        targetTr
          .getElementsByClassName("youhui")[0]
          .innerHTML.trim()
          .replace("￥", "")) *
        goodsNum;

    // 判断是否已登录
    let user = localStorage.getItem("user");
    let goodsId = targetTr.getAttribute("goodsid");

    if (user) {
      this.severGoodsNum(goodsId, goodsNum);
    } else {
      this.webGoodsNum(goodsId, goodsNum);
    }
  }

  // 减少商品数量
  reduceNum(target) {
    let targetTr = target.parentElement.parentElement.parentElement;
    let goodsNum = target.nextElementSibling.value;
    //改变页面数量
    if (goodsNum == 0) {
      return;
    }
    goodsNum = goodsNum - 0 - 1;
    target.nextElementSibling.value = goodsNum;
    //改变页面小计
    targetTr.getElementsByClassName("xj")[0].innerHTML =
      "￥" +
      (targetTr
        .getElementsByClassName("danjia")[0]
        .innerHTML.trim()
        .replace("￥", "") -
        targetTr
          .getElementsByClassName("youhui")[0]
          .innerHTML.trim()
          .replace("￥", "")) *
        goodsNum;

    // 判断是否已登录
    let user = localStorage.getItem("user");
    let goodsId = targetTr.getAttribute("goodsid");

    if (user) {
      this.severGoodsNum(goodsId, goodsNum);
    } else {
      this.webGoodsNum(goodsId, goodsNum);
    }
  }

  // input框直接改变数字改变商品数量
  inputChange(target) {
    let targetTr = target.parentElement.parentElement.parentElement;
    target.onblur = () => {
      let goodsNum = target.value;
      //改变页面数量
      if (goodsNum == 0) {
        return;
      }
      target.value = goodsNum;
      //改变页面小计
      targetTr.getElementsByClassName("xj")[0].innerHTML =
        "￥" +
        (targetTr
          .getElementsByClassName("danjia")[0]
          .innerHTML.trim()
          .replace("￥", "") -
          targetTr
            .getElementsByClassName("youhui")[0]
            .innerHTML.trim()
            .replace("￥", "")) *
          goodsNum;

      target.onblur = null;
      Carts.priceCount();

      // 判断是否已登录
      let goodsId = targetTr.getAttribute("goodsid");
      let user = localStorage.getItem("user");

      if (user) {
        this.severGoodsNum(goodsId, goodsNum);
      } else {
        this.webGoodsNum(goodsId, goodsNum);
      }
    };
  }

  // 浏览器该变加入购物车商品数量
  webGoodsNum(goodsId, goodsNum) {
    let carts = localStorage.getItem("carts");
    carts = JSON.parse(carts);

    for (const gId in carts) {
      if (gId == goodsId) {
        carts[gId][0] = goodsNum;
      }
    }
    // 更新localStorage
    localStorage.setItem("carts", JSON.stringify(carts));
  }
  // 服务器该变加入购物车商品数量
  severGoodsNum(goodsId, goodsNum) {
    let user = localStorage.getItem("user");
    $.post("http://localhost:9999/gouwuche/changeNum", {
      user: user,
      goodsId: goodsId,
      goodsNum: goodsNum,
    }).then((res) => {
      console.log(res);
    });
  }

  // 事件委托
  eventEntrust(eve) {
    let e = window.event || eve;
    let target = e.target || e.srcElement;
    let cls = target.className;
    if (cls.indexOf("dele") != -1) cls = "dele";
    if (cls.indexOf("addNum") != -1) cls = "addNum";
    if (cls.indexOf("reduceNum") != -1) cls = "reduceNum";
    if (cls.indexOf("check") != -1) cls = "check";
    if (cls.indexOf("inputChange") != -1) cls = "inputChange";
    switch (cls) {
      case "dele": // 删除指定商品
        this.deleteGoods(target);
        Carts.priceCount();
        break;
      case "addNum": // 增加数量
        this.addNum(target);
        Carts.priceCount();
        break;
      case "reduceNum": // 减少数量
        this.reduceNum(target);
        Carts.priceCount();
        break;
      case "check": // 复选框选择
        this.checkFn(target);
        Carts.priceCount();
        break;
      case "inputChange": // input框直接改变数字改变商品数量
        this.inputChange(target);
        break;
      default:
        break;
    }
  }

  // 事件绑定
  addEvent() {
    document.body.addEventListener("click", () => {
      this.eventEntrust();
    });
  }
}

new Carts();
