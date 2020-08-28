const goodsTypeDom = document.querySelector(
  "#cateSearch>.main_goodsList_urlDetail"
);
const goodsLists = document.getElementsByClassName("goods_serach_content")[0];

class goodsList {
  constructor() {
    // 每页商品数
    this.size = 25;

    this.list();
    this.addEvent();
  }

  // 发送ajax
  // 这里可以用switch
  list() {
    $.get("http://localhost:9999/shangpinliebiao").then((res) => {
      console.log(res);
      let arr = [];
      res.data.forEach((ele) => {
        let goodsType = goodsTypeDom.innerHTML.replace("鞋", "");
        let goodstype = ele.goodstype;
        if (
          goodsType.indexOf(goodstype) != -1 ||
          goodstype.indexOf(goodsType) != -1
        ) {
          arr.push(ele);
        }
      });

      // console.log(arr);
      // 实现商品列表
      let str = "";
      for (let i = 0; i < this.size; i++) {
        // console.log(arr[i]);
        str += `
        <div class="selItem goods_serach_content_item">
            <div class="hgoodsPic">
                <a href="javascript:;" index="${
                  arr[i].id
                }"><img src="./images/${
          arr[i].thumColorImg1
        }" alt="" class="goGoodsInfo"></a>
                <div class="hgoodsPic_list">
                    <div class="hgoodsPic_list_item">
                        <img src="./images/${arr[i].thumColorImg1}" alt="">
                    </div>
                    <div class="hgoodsPic_list_item">
                        <img src="./images/${arr[i].thumColorImg2}" alt="">
                    </div>
                </div>
            </div>
            <div class="hgoodsName">${arr[i].goodsName}</div>
            <div class="hgoodsPrice">￥${Number(arr[i].salePrice).toFixed(
              2
            )}</div>
            <div class="hgoodsLine"></div>
        </div>
        `;
      }
      goodsLists.innerHTML = str;
    });
  }

  //事件绑定
  eventEntrust(eve) {
    let e = window.event || eve;
    let target = e.target || e.srcElement;
    if (target.className == "goGoodsInfo") {
      let goodsId = target.parentElement.getAttribute("index");
      console.log(goodsId);
      location.href = "../xiangqingye.html?goodsId=" + goodsId;
    }
  }

  // 添加事件
  addEvent() {
    document
      .getElementsByClassName("goods_serach_content")[0]
      .addEventListener("click", () => {
        this.eventEntrust();
      });
  }
}

new goodsList();
