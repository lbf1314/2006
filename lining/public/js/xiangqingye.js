// let goodsId = location.href.split("?")[1].split("=")[1];

// $.get("http://localhost:9999/xiangqingye", { goodsId: goodsId }).then((res) => {
//   console.log(res);
// });
const goodsNum = document.getElementById("goodsnum");
class goodsDetail {
  constructor() {
    this.init();
    this.isTejia = document.querySelector(
      "#xiangqingye_goodsinfo_goodsname>div:nth-of-type(1)"
    );
  }

  // 页面渲染
  init() {
    let goodsinfo1 = "";
    let goodsinfo2 = "";
    let goodsinfo3 = "";
    let goodsinfo4 = "";
    let goodsinfo5 = "";

    let goodsId = location.href.split("?")[1].split("=")[1];
    $.get("http://localhost:9999/xiangqingye", { goodsId: goodsId }).then(
      (res) => {
        console.log(res);
        res = res.data;
        // 大图展示
        goodsinfo1 += `
        <a href="javascript:;">
          <div class='glassShow' style="background-image: url(./images/${res[0].goodImg});background-size: 370px 306px;"></div>
        </a>
        `;
        document.getElementsByClassName("imgshowBar")[0].innerHTML = goodsinfo1;

        // 可选样式
        for (const key in res[0]) {
          if (res[0].hasOwnProperty(key)) {
            if (key.indexOf("thumImg") != -1) {
              goodsinfo2 += `
                <li>
                  <div class="tb-selected">
                    <a href="javascript:;"
                      ><img src="./images/${res[0][key]}" alt=""
                    /></a>
                  </div>
                </li>
              `;
            }
          }
        }
        document.querySelector(".imgbox_showImgBox>ul").innerHTML = goodsinfo2;

        // 商品介绍
        goodsinfo3 += `
          <h1 id="xiangqingye_goodsinfo_goodsname">${
            res[0].goodsName == null ? "" : res[0].goodsName
          }</h1>
          <div id="xiangqingye_goodsinfo_goodspromotion">
              <a href="javascript:;">${
                res[0].activity == null ? "" : res[0].activity
              }</a>
          </div>
          <div id="xiangqingye_goodsinfo_draw">参与抽奖，可再减5元</div>
          <div id="xiangqingye_goodsinfo_pinkage">
              <a href="javascript:;">全场满99包邮，部分地区除外</a>
          </div>
          <div id="xiangqingye_bargin_starting">
              <div>${res[0].specTime == 0 ? "非特价商品" : "特价商品"}</div>
              ${
                res[0].specTime == 0
                  ? ""
                  : `<div id="xiangqingye_activity_down">
              距离结束：<span>${
                res[0].specTime + "小时 "
              }</span><span>请尽快购买！</span>
          </div>`
              }
              
          </div>
          <div class="xiangqingye_bgc_gray">
              <span id="xiangqingye_goods_coding" class="font-gray">
                  <span class="t">商品编码：</span>
                  <span class="v">${res[0].id}</span>
              </span>
              <span id="xiangqingye_goods_price">
                  <div id="xiangqingye_goods_originalPrice" class="font-gray">
                      <span class="t">吊牌价：</span>
                      <span class="v">￥${
                        res[0].tagPrice == null
                          ? ""
                          : Number(res[0].tagPrice).toFixed(2)
                      }</span>
                  </div>
                  <div id="xiangqingye_goods_currentPrice" class="font-gray">
                      <span class="t">销售价：</span>
                      <span class="v">￥${
                        res[0].salePrice == null
                          ? ""
                          : Number(res[0].salePrice).toFixed(2)
                      }</span>
                  </div>
                  <div id="xiangqingye_goods_specialPrice" class="font-gray">
                     ${
                       res[0].specPrice == 0
                         ? ""
                         : `<span class="t">特 价 ：</span>
                     <span class="v">
                         <span>￥</span>
                         <span>${Number(res[0].specPrice).toFixed(2)}</span>
                         <span>潮流价</span>
                     </span>`
                     }
                  </div>
              </span>
          </div>
      `;

        document.getElementById("xiangqingye_goodsinfo").innerHTML = goodsinfo3;

        // 尺码
        for (const key in res[0]) {
          if (res[0].hasOwnProperty(key)) {
            if (key.indexOf("goodsize") != -1) {
              if (res[0][key] != null) {
                goodsinfo4 += `
                <div class="size-layer">
                  <input style='border: 1px solid #cfcece;' type="button" value="${res[0][key]}" onclick=goodsDetail.choice(this) />
                </div>
              `;
              }
            }
          }
        }
        document.querySelector(
          "#xiangqingye_choiceaarea_size>div"
        ).innerHTML = goodsinfo4;

        // 可选颜色
        for (const key in res[0]) {
          if (res[0].hasOwnProperty(key)) {
            if (key.indexOf("thumColorImg") != -1) {
              goodsinfo5 += `
                <li>
                  <a style="display:block;" class="clear_fix" href="javascript:;" onclick=goodsDetail.choice(this)
                    ><img src="./images/${res[0][key]}" alt=""
                  /></a>
                </li>
              `;
            }
          }
        }
        document.querySelector(
          "#xiangqingye_choiceaarea_shoestyle"
        ).innerHTML = goodsinfo5;
      }
    );
  }

  // 数量
  static add() {
    goodsNum.value = goodsNum.value - 0 + 1;
  }
  static reduce() {
    if (goodsNum.value == "1") {
      return;
    }
    goodsNum.value = goodsNum.value - 0 - 1;
  }

  // 选择颜色
  static choice(target) {
    for (
      let i = 0;
      i < target.parentElement.parentElement.children.length;
      i++
    ) {
      target.parentElement.parentElement.children[
        i
      ].firstElementChild.style.borderColor = "";
      target.parentElement.parentElement.children[
        i
      ].firstElementChild.removeAttribute("index");
    }
    target.setAttribute("data-index", 1);
    target.style.borderColor = "red";
  }

  // 数据加入购物车
  static addCarts() {
    const goodsId = document.getElementsByClassName("v")[0].innerHTML;
    const goodsNum = document.getElementById("goodsnum").value;
    const sizeLayer = document.getElementsByClassName("size-layer");
    const colorImg = document.getElementById(
      "xiangqingye_choiceaarea_shoestyle"
    ).children;
    let goodsColor = "";
    for (let i = 0; i < colorImg.length; i++) {
      if (colorImg[i].firstElementChild.getAttribute("data-index") == "1") {
        goodsColor = colorImg[
          i
        ].firstElementChild.firstElementChild.src.replace(
          location.origin + "/images/",
          ""
        );
      }
    }
    let goodsSize = "";
    for (let i = 0; i < sizeLayer.length; i++) {
      if (sizeLayer[i].firstElementChild.getAttribute("data-index") == "1") {
        goodsSize = sizeLayer[i].firstElementChild.value;
      }
    }
    if (
      goodsId == "" ||
      goodsNum == "" ||
      goodsSize == "" ||
      goodsColor == ""
    ) {
      alert("请选择你要购买的商品详细信息");
      return;
    } else {
      // 判断是否已登录
      if (localStorage.getItem("user")) {
        // 已登录
        goodsDetail.addServer(goodsId, goodsNum, goodsSize, goodsColor);
      } else {
        // 未登录
        goodsDetail.addBrowser(goodsId, goodsNum, goodsSize, goodsColor);
      }
    }
  }

  // 存到浏览器
  static addBrowser(goodsId, goodsNum, goodsSize, goodsColor) {
    goodsNum = Number(goodsNum);
    // 判断localStorage是否存在carts
    let carts = localStorage.getItem("carts");
    if (carts) {
      // 转化为json数组
      carts = JSON.parse(carts);
      console.log(carts);
      // for (const gId in carts) {
      // 查看商品是否存在,且商品属性是否相同
      // 商品不存在，新增
      carts[goodsId] = [goodsNum, goodsSize, goodsColor];
      localStorage.setItem("carts", JSON.stringify(carts));
      // }
    } else {
      // 新增carts
      let obj = { [goodsId]: [Number(goodsNum), goodsSize, goodsColor] };
      localStorage.setItem("carts", JSON.stringify(obj));
    }
  }
  // 存到数据库
  static addServer(goodsId, goodsNum, goodsSize, goodsColor) {
    let user = localStorage.getItem("user");

    $.post("http://localhost:9999/xiangqingye/addCarts", {
      user: user,
      goodsId: goodsId,
      goodsNum: goodsNum,
      goodsSize: goodsSize,
      goodsColor: goodsColor,
    }).then((res) => {
      console.log(res);
    });
  }
}

new goodsDetail();
