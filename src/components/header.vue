<template>
  <div class="box">
    <!-- 商店名称 -->
    <div class="shopname">
      <div class="name">
        <!-- 头像 -->
        <van-image width="70" height="70" :src="shopdata.avatar" radius="10px" />
        <!-- 名称 -->
        <div class="title">
          <span class="icon">品牌</span>
          <span>{{shopdata.name}}</span>
          <p>{{shopdata.description}}/{{shopdata.deliveryTime}}分钟送达</p>
          <!-- 活动 满减 -->
          <div class="active">
            <span class="icon2">减</span>
            <div class="activity">
              <span v-for="(item,index) in shopdata.supports" :key="index">{{item}}</span>
            </div>

            <van-button
              round
              type="info"
              size="small"
              color="rgba(0,0,0,0.5)"
              @click="showPopup"
            >5个></van-button>
          </div>
        </div>
      </div>

      <!-- 公告 -->
      <div class="Notice" @click="showPopup">
        <van-tag type="danger">公告</van-tag>
        <div>
          <van-notice-bar :scrollable="false" mode="link" background="rgba(0, 0, 0, 0.5)">
            <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
              <van-swipe-item class="van-ellipsis">{{shopdata.bulletin}}</van-swipe-item>
            </van-swipe>
          </van-notice-bar>
        </div>
      </div>
    </div>


    <!-- 点击 公告 优惠弹出模态框 -->
    <div class="Discount">
      <van-popup v-model="show">
        <!-- 店铺名 -->
        <p class="name_p">{{shopdata.name}}</p>
        <!-- 评分 -->
        <p>
          <van-rate v-model="value" :size="25" color="#ffd21e" void-icon="star" void-color="#eee"  allow-half  />
        </p>
        <!-- 优惠信息 -->
        <div>
          <van-divider :style="{ color: '#fff', borderColor: '#fff', padding: '0 16px' }">优惠信息</van-divider>
          <div>
            <p v-for="(item,index) in shopdata.supports" :key="index">
              <van-tag color="#fff" text-color="red">标签</van-tag>
              {{item}}</p>
          </div>
        </div>
        <!-- 商家公告 -->
        <div>
          <van-divider :style="{ color: '#fff', borderColor: '#fff', padding: '0 16px' }">商家公告</van-divider>
          <p>{{shopdata.bulletin}}</p>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { getmerchant } from "@/api/apis.js";

export default {
  data() {
    return {
      //店铺信息数据
      shopdata: {},

      // 模态框显示数据
      show: false,
      //评分星星数据
      value: 5,
    };
  },

  methods: {
    showPopup() {
      this.show = true;
    },

    //封装获取店铺函数
    getshop() {
      getmerchant().then((res) => {
        console.log(res);
        this.shopdata = res.data.data;
        this.value=res.data.data.score
      });
    },
  },
  created() {
    this.getshop();
  },
};
</script>

<style lang="less" scoped>
.box {
  height: 160px;
  //  background-color:red;
  background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597930195997&di=220be9c59409d95ea46a417e3b38bfcb&imgtype=0&src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2F100a0k000000cdu006827.jpg");
  background-size: 100% 100%;
  .shopname {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    display: flex;
    // flex-wrap: wrap;
    flex-flow: column;
    .title {
      padding-left: 10px;
      .icon {
        font-size: 14px;
        display: inline-block;
        width: 40px;
        height: 20px;
        background-color: red;
        text-align: center;
        border-radius: 5px;
        margin-right: 10px;
        margin-bottom: 5px;
      }
      .icon2 {
        display: inline-block;
        width: 20px;
        line-height: 20px;
        background-color: #fff;
        color: red;
        text-align: center;
        margin-right: 10px;
      }
      .active {
        display: flex;
        align-items: center;
      }

      .activity {
        font-size: 12px;
        display: inline-block;
        width: 170px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .name {
      display: flex;
      padding: 20px 0 0 20px;
      height: 65%;
    }
    .Notice {
      flex: 1;
      padding-left: 15px;
      display: flex;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.8);
      .van-notice-bar {
        width: 320px;
        height: 36px;
      }
      .notice-swipe {
        height: 34px;
        line-height: 36px;
      }
    }
  }
  .Discount{
    color: #ffffff;
  }
  .van-popup {
    background-color: transparent;
    .name_p {
      color: #ffffff;
      padding-bottom: 10px;
    }
    .van-divider {
      margin-bottom: 20px;
    }
  }
}
</style>