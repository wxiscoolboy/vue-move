<template>
  <div id="box">
    <!-- 上边店铺信息 -->
    <div class="shop">
      <!-- 店铺信息 -->
      <div class="shopmsg">
        <!-- 左边店铺名 -->
        <div class="leftshopname">
          <p class="shopname">{{shopdata.name}}</p>
          <div class="star">
            <van-rate
              v-model="value"
              :size="25"
              color="#ffd21e"
              readonly
              void-icon="star"
              void-color="#eee"
            />
            <span class="solenum">月售{{shopdata.sellCount}}单</span>
          </div>
        </div>
        <!-- 右边收藏 -->
        <div class="rightcollect">
          <div class="icon">
            <van-icon name="like" size="30" color="red" />
          </div>
          <div class="collect">已收藏</div>
        </div>
      </div>
      <!-- 店铺配送信息 -->
      <div class="Distribution">
        <van-row>
          <van-col span="8">
            <p class="msgname">起送价</p>
            <div>
              <span class="msgnum">{{shopdata.minPrice}}</span>
              <span class="Company">元</span>
            </div>
          </van-col>
          <van-col span="8">
            <p class="msgname">商家配送</p>
            <div>
              <span class="msgnum">8</span>
              <span class="Company">元</span>
            </div>
          </van-col>
          <van-col span="8">
            <p class="msgname">平局配送时间</p>
            <div>
              <span class="msgnum">20</span>
              <span class="Company">分钟</span>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- 下边活动与公告 -->
    <div class="activeNotice">
      <div class="activeNoticetitle">活动与公告</div>
      <div class="activecontent">{{shopdata.bulletin}}</div>
      <div class="active" v-for="(item,index) in shopdata.supports" :key="index">
        <van-tag type="danger">减</van-tag>
        <span>{{item}}</span>
      </div>
   
    </div>
  </div>
</template>

<script>
import { getmerchant } from "@/api/apis.js";

export default {
  data() {
    return {
      //  商店评分数据
      value: 5,
      //商店数据
      shopdata:{}
    };
  },
  methods: {
    //封装获取店铺函数
    getshop() {
      getmerchant().then((res) => {
        console.log(res);
        this.shopdata = res.data.data;
        this.value = res.data.data.score;
      });
    },
  },
  created() {
    this.getshop();
  },
};
</script>

<style lang="less" scoped>
#box {
  height: 100%;
  background-color: #f4f5f7;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  .shop {
    background-color: #fff;
    padding: 15px;
    margin-bottom: 20px;
    .shopname {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .star {
      display: flex;
      align-items: center;
      .solenum {
        font-size: 16px;
        color: #666666;
        margin-left: 10px;
      }
    }
    .icon {
      text-align: center;
    }
  }
}
.shopmsg {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #edeef0;
}
.Distribution {
  text-align: center;
  padding-top: 20px;
  .msgname {
    font-size: 18px;
    color: #999999;
    margin-bottom: 10px;
  }
  .msgnum {
    font-size: 30px;
  }
}

//下边公告
.activeNotice {
  flex: 1;
  background-color: #fff;
  padding: 20px 10px;
  .activeNoticetitle {
    font-size: 22px;
    padding-bottom: 20px;
    font-weight: bold;
  }
  .activecontent {
    color: red;
    padding-bottom: 20px;
    border-bottom: 1px solid #edeef0;
  }

  .active {
    display: flex;
    align-items: center;
    font-size: 20px;
    padding: 10px 0px;
  }
}
</style>