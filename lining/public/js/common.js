// 主页商品展示样式封装
class GoodShowDom {
  constructor(Dom) {
    this.Dom = Dom;
    this.boxDom();
  }

  boxDom() {
    let strDom = "";
    for (let i = 0; i < 15; i++) {
      strDom += this.creatDom();
    }
    this.Dom.innerHTML = strDom;
  }

  creatDom() {
    let str = `
      <div class="tab_shop_sku">
      <a href="javascript:;" class="tab_shop_img tab_shop_img"
        ><img src="./images/display_519034_1.jpg" alt=""
      /></a>
      <div class="tab_shop_info">
        <div class="tab_shop_name">男子经典休闲鞋</div>
          <div class="tab_shop_price">
            <div class="tab_shop_rmb">¥</div>
            <div class="tab_shop_pe">239</div>
          </div>
          <a href="javascript:;" class="tab_shop_buyitnow"
            ><img src="./images/buyitnow.png" alt=""
          /></a>
        </div>
        <div class="zhijiang_tab_shop_zhijiang">
          <div class="zhijiang_word1">直降</div>
          <div class="zhijiang_word2">21</div>
        </div>
      </div>
    `;
    return str;
  }
}

new GoodShowDom(document.querySelector(".zhijiang_tab_shop"));

const goTop1 = document.getElementsByClassName("go_top1")[0];
// 左侧导航悬浮和顶部悬浮
function windowScroll() {
  const headerDom = document.querySelector("header");
  const navsiderBar = document.querySelector(".navsiderBar");
  let headerTop = headerDom.offsetTop;

  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop > headerTop) {
    headerDom.style.position = "fixed";
    headerDom.style.zIndex = 1;
    headerDom.style.width = "100%";
    headerDom.style.backgroundColor = "white";
  }

  window.onscroll = () => {
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    // 主页头部悬浮置顶效果
    if (scrollTop > headerTop) {
      headerDom.style.position = "fixed";
      headerDom.style.zIndex = 1;
      headerDom.style.width = "100%";
      headerDom.style.backgroundColor = "white";
    } else {
      headerDom.style.position = "";
    }

    // 左侧导航悬浮
    if (scrollTop >= 1000) {
      goTop1.style.display = "flex";
      navsiderBar.style.display = "";
    } else {
      navsiderBar.style.display = "none";
      goTop1.style.display = "none";
    }
  };
}
windowScroll();
