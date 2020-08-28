const headerTopShop = document.getElementById("headerTop_shop");
const headerShopInfo = document.querySelector(".headerShop_info");

// 用户名展示

if (localStorage.getItem("user")) {
  document.getElementById(
    "header-top-right"
  ).lastElementChild.innerHTML = localStorage.getItem("user");
} else {
  document.getElementById("header-top-right").lastElementChild.innerHTML =
    "我的李宁";
}

// 主页头部购物车信息
headerTopShop.addEventListener("mouseenter", () => {
  headerShopInfo.style.display = "flex";
});
headerTopShop.addEventListener("mouseleave", () => {
  headerShopInfo.style.display = "none";
});

// 主页锚点
class AnchorCls {
  constructor() {
    this.addEvent();
  }

  //事件委托
  entrust(eve) {
    let e = window.event || eve;
    let target = e.target || e.srcElement;
    let cls = target.className;
    switch (cls) {
      case "navsiderBar_content1":
        document.documentElement.scrollTop = 1157;
        break;
      case "navsiderBar_content2":
        document.documentElement.scrollTop = 3810;
        break;
      case "navsiderBar_content3":
        document.documentElement.scrollTop = 4700;
        break;
      case "navsiderBar_content4":
        document.documentElement.scrollTop = 5978;
        break;
      case "navsiderBar_content5":
        document.documentElement.scrollTop = 10497;
        break;
      default:
        break;
    }
  }

  addEvent() {
    document
      .querySelector("#navsiderBar_content")
      .addEventListener("click", this.entrust.bind(this));
  }
}

new AnchorCls();

// 尖货发售轮播图
var swiper1 = new Swiper(".xinpinfabu_banner", {
  // 区分容器
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-p1",
  },
  mousewheel: true,
  keyboard: true,
});
