<template>
  <div id="box">
    <!-- 上边商品详情 -->
    <div class="topdetail">
      <!-- 背景图片 -->
      <div class="bg_div"></div>

      <!-- 商品详情 -->
      <div class="detail_div">
        <!-- 商品名称 -->
        <p class="title_p">{{getdetail_x.name}}</p>
        <!-- 销售量和好评 -->
        <p class="sole">
          <span>月售{{getdetail_x.sellCount}}份</span>
          <span>好评率{{getdetail_x.rating}}%</span>
        </p>
        <!-- 价格和加入购物车 -->
        <div class="priceaddcar">
          <!-- 价格 -->
          <div class="price_div">
            <span class="newprice">￥{{getdetail_x.price}}</span>
            <span class="oldprice">￥99.40</span>
          </div>
          <!-- 加入购物车按钮 -->
          <van-button round type="info" color="#FFC300" @click="addcar(getdetail_x)">
            <van-icon name="cart"  />加入购物车
          </van-button>
        </div>
      </div>
    </div>
    <!-- 中间商品介绍 -->
    <div class="middle">
      <h2>商品介绍</h2>
      <p>{{getdetail_x.goodsDesc}}</p>
    </div>
    <!-- 下边评论 -->
    <div class="bottomcomment">
      <!-- 选项卡 -->
      <div>
        <van-tabs type="card" color="#FFC300">
          <van-tab title="全部24"></van-tab>
          <van-tab title="满意18"></van-tab>
          <van-tab title="不满意6"></van-tab>
        </van-tabs>
      </div>
      <!-- 评论内容 -->
      <div class="commentcontent" v-for="(item,index) in getdetail_x.ratings" :key="index">
        <!-- 左边头像 -->
        <div class="leftpic">
          <van-image round width="4rem" height="4rem" :src="item.avatar" />
        </div>
        <!-- 右边内容 -->
        <div class="rightcont">
          <div class="nametime">
            <span class="username" >{{item.username}}</span>
            <span class="commenttime">{{gettime(item.rateTime)}}</span>
          </div>
          <div class="star">
            <van-rate
              v-model="personal"
              :size="15"
              readonly
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
            <span class="servicetime">30分钟送达</span>
            <div class="text">{{item.text}}</div>
            <div class="good">
              <van-icon name="good-job" color="#FDCA23" size="20px" />
              <van-tag plain type="primary">标签</van-tag>
              <van-tag plain type="primary">标签</van-tag>
              <van-tag plain type="primary">标签</van-tag>
              <van-tag plain type="primary">标签</van-tag>
              <van-tag plain type="primary">标签</van-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getcommodity } from "@/api/apis.js";
import {gettime} from '@/utils/utils.js'
export default {
  data() {
    return {
      // //评分数据 个人评分
      personal: 5,
      // //发送过来的数据
      comdata: {},

      gettime
    };
  },
  created() {
  this.gettime=gettime
  

  },
  methods: {
    addcar(comdata){
      // alert(66)
     console.log(comdata);
     comdata.num=this.getdetail_x.num+1
      // console.log(this.comdata);
      // this.$store.commit('getlist',comdata)
     
    }
 
 
  },

  computed: {
   //取通过vuex从商品页面传送过来的值
   getdetail_x(){
     return this.$store.state.detaillist
   }
   



  },
};
</script>

<style lang="less" scoped>
#box {
  height: 100%;
  background-color: #f4f5f7;
  display: flex;
  flex-flow: column;
  .topdetail {
    background-color: #fff;
    .bg_div {
      height: 250px;
      background: url("https://p1.meituan.net/xianfu/3009c488fa6ffec198a84a084ac593ad233739.jpg");
      background-size: 100% 100%;
    }
    .detail_div {
      padding: 10px;
      .title_p {
        font-size: 20px;
        color: #000;
        font-weight: bolder;
        margin-bottom: 5px;
      }
      .sole {
        color: #999999;
        margin-bottom: 20px;
      }
      .priceaddcar {
        display: flex;
        justify-content: space-between;
        .price_div {
          .newprice {
            font-size: 24px;
            color: red;
            font-weight: bolder;
          }
          .oldprice {
            color: #999999;
            font-size: 18px;
            text-decoration: line-through;
          }
        }
      }
    }
  }
  .middle {
    margin-top: 20px;
    padding: 20px 10px;
    background-color: #fff;
    h2 {
      padding-bottom: 20px;
    }
  }
  .bottomcomment {
    margin-top: 20px;
    padding: 10px;
    background-color: #fff;
    flex: 1;
    .commentcontent {
      padding: 20px 10px;
      display: flex;
      //左边头像
      .leftpic {
        padding-right: 15px;
      }
      //右边内容
      .rightcont {
        flex: 1;
        .nametime {
          display: flex;
          justify-content: space-between;
          .username {
            color: #000;
            font-weight: bold;
          }
          .commenttime {
            color: #999999;
          }
        }
        .star {
          margin: 10px 0px;
          .servicetime {
            margin-left: 10px;
            font-size: 14px;
            color: #999999;
          }
          .text {
            margin: 10px;
          }
          .good {
            display: flex;
            align-items: center;
            .van-tag {
              margin: 0px 5px;
            }
          }
        }
      }
    }
  }
}
</style>