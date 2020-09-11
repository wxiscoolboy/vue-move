<template>
  <div class="app-box">
    <!-- 头部组件 -->
    <Header />
    <!-- 导航组件 -->
    <van-tabs v-model="active">
      <van-tab title="商品" to="/"></van-tab>
      <van-tab title="评价" to="/index/ratings"></van-tab>
      <van-tab title="商家" to="/index/seller"></van-tab>
    </van-tabs>
    <!-- 路由内容 -->
    <router-view></router-view>

    <!-- 底部购物车 -->
    <div class="bottom-box">
      <div class="contactshop">
        <van-icon name="smile-o" size="20" />
        <p>联系商家</p>
      </div>
      <div class="shopcar">
        <div class="caricon" :class="{comactive:shopcarlist_x.length>0? true:false}">
          <van-icon name="shopping-cart" size="30" badge="9" />
        </div>
        <div class="price" @click="showPopup">
          <p>
            ￥
            <span class="cost">{{totalprice}}</span>
          </p>
          <p>另需配送费4元 | 支持自取</p>
        </div>
      </div>
      <div class="account" :class="{comactive:shopcarlist_x.length>0? true:false}">
        <span >{{shopcarlist_x.length>0? '去结算':'￥20起送'}}</span>
      </div>
    </div>

    <!--点击去中间盒子 弹出层 -->
    <van-popup v-model="show" position="bottom">
      <div class="carbox">
        <div class="newuser">新用户下单立减5元</div>
        <div class="comnum">
          <p class="clearcar">
            <span>购物车</span>
            <span>
              <van-icon name="delete" />清空购物车
            </span>
          </p>
          <!-- 商品 -->
          <div class="totalprice" v-for="(child,index) in shopcarlist_x" :key="index">
            <van-row type="flex">
              <van-col span="14">
                <div class="van-ellipsis">{{child.name}}</div>
              </van-col>
              <van-col span="5" style="color:red">￥{{child.price}}</van-col>
              <van-col span="5">
                <van-stepper
                  v-model="child.num"
                  theme="round"
                  button-size="22"
                  disable-input
                  min="0"
                />
              </van-col>
            </van-row>
          </div>
        </div>
        <div class="box6"></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Header from "../components/header";
import { getcommodity } from "@/api/apis.js";
export default {
  data() {
    return {
      //导航组件数据
      active: 0,
      //弹出层数据
      show: false,
 
    comactive:true
    
    };
  },

  components: {
    Header,
  },

  methods: {
    //弹出层函数 点击去结算 弹出弹出层
    showPopup() {
      if (this.show) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    //封装获取商品的信息函数
    getcom() {
      getcommodity().then((res) => {
        console.log(res);
        // this.list = res.data.goodsList;
      });
    },
  },
  created() {
    this.getcom();
  },

  computed: {

    //从vuex获取要买的商品数据
    shopcarlist_x() {
      return this.$store.getters.shopcarlist;
    },
    //计算总价
    totalprice(){
      let tp=0
      for(let obj of this.shopcarlist_x){
         tp += obj.price * obj.num
      }
      return tp.toFixed(2)
    }
  },
};
</script>

<style lang="less" scoped>
.app-box {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.bottom-box {
  width: 90%;
  height: 60px;
  background-color: red;
  position: fixed;
  bottom: 10px;
  left: 5%;
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  background-color: #000;
  z-index: 110000;
  .contactshop {
    flex: 1;
    text-align: center;
    font-size: 12px;
    padding-top: 10px;
    box-sizing: border-box;
    border-right: 3px solid #ffffff;

    color: #a6a6a6;
  }

  .shopcar {
    flex: 3;

    display: flex;
    font-size: 12px;
    padding-top: 5px;
    align-items: center;
    .caricon {
      width: 50px;
      height: 40px;
      border-radius: 50%;
      background-color: #333333;
      text-align: center;
      padding-top: 10px;
      line-height: 50px;
      margin: 0 10px;
    }
    .comactive {
      background-color: #ffc300;
      color: #000;
    }
    .price {
      color: #ffffff;
      .cost {
        font-size: 20px;
      }
    }
  }
  .account {
    flex: 1;
    color: #eeeeee;
    // background-color: #ffc300;
    text-align: center;
    line-height: 60px;
    font-weight: bold;
  }
  .comactive{
  background-color: #FFC300;
  color: #000;
}
}

//弹出层样式
.carbox {
  // min-height: 300px;
  .newuser {
    line-height: 30px;
    background-color: #fee7c8;
    text-align: center;
    font-size: 14px;
    color: red;
  }
  .comnum {
    padding: 10px;
    .clearcar {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .totalprice {
      padding: 10px 0;
    }
  }
  .box6 {
    height: 70px;
    background-color: #ffffff;
  }
}
</style>