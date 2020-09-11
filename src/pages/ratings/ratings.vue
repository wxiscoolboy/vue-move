<template>
  <div id="box">
    <!-- 上边评分 -->
    <div class="score">
      <!-- 左边总体评分 -->
      <div class="left">
        <p class="num">5.0</p>
        <p class="total">综合评分11</p>
        <p class="compare">高于周边商家96%</p>
      </div>

      <!-- 右边详细评分 -->
      <div class="right">
        <div class="option">
          <span class="tname">服务态度</span>
          <span>
            <van-rate
              v-model="service"
              allow-half
              readonly
              :size="20"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </span>
          <span class="service">4.5</span>
        </div>
        <div class="option">
          <span class="tname">菜品质量</span>
          <span>
            <van-rate
              v-model="food"
              allow-half
              readonly
              :size="20"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </span>
          <span class="food">4.5</span>
        </div>
        <div class="option">
          <span class="tname">送达时间</span>
          <span class="time">20分钟</span>
        </div>
      </div>
    </div>

    <!-- 下边评论 -->
    <div class="comment">
      <!-- 选项卡 -->
      <div>
        <van-tabs type="card" color="#FFC300">
          <van-tab title='全部'>
            <!-- 评论内容 -->
            <div class="commentcontent" v-for="(item,index) in persondata" :key="index">
              <!-- 左边头像 -->
              <div class="leftpic">
                <van-image round width="4rem" height="4rem" :src="item.avatar" />
              </div>
              <!-- 右边内容 -->
              <div class="rightcont">
                <div class="nametime">
                  <span class="username">{{item.username}}</span>
                  <span class="commenttime">{{item.rateTime}}</span>
                </div>
                <div class="star">
                  <van-rate
                    v-model="item.score"
                    :size="15"
                    readonly
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                  />
                  <span class="servicetime">{{item.deliveryTime}}分钟送达</span>
                  <div class="text">{{item.text}}</div>
                  <div class="good">
                    <van-icon name="good-job" color="#FDCA23" size="20px" />
                    <van-tag
                      plain
                      type="primary"
                      v-for="(items,index) in item.recommend"
                      :key="index"
                    >{{items}}</van-tag>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="满意">
            <!-- 评论内容 -->
            <div class="commentcontent" v-for="(item,index) in gooddata" :key="index">
              <!-- 左边头像 -->
              <div class="leftpic">
                <van-image round width="4rem" height="4rem" :src="item.avatar" />
              </div>
              <!-- 右边内容 -->
              <div class="rightcont">
                <div class="nametime">
                  <span class="username">{{item.username}}</span>
                  <span class="commenttime">{{item.rateTime}}</span>
                </div>
                <div class="star">
                  <van-rate
                    v-model="item.score"
                    :size="15"
                    readonly
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                  />
                  <span class="servicetime">{{item.deliveryTime}}分钟送达</span>
                  <div class="text">{{item.text}}</div>
                  <div class="good">
                    <van-icon name="good-job" color="#FDCA23" size="20px" />
                    <van-tag
                      plain
                      type="primary"
                      v-for="(items,index) in item.recommend"
                      :key="index"
                    >{{items}}</van-tag>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>

          <van-tab title="不满意">

              <!-- 评论内容 -->
            <div class="commentcontent" v-for="(item,index) in baddata" :key="index">
              <!-- 左边头像 -->
              <div class="leftpic">
                <van-image round width="4rem" height="4rem" :src="item.avatar" />
              </div>
              <!-- 右边内容 -->
              <div class="rightcont">
                <div class="nametime">
                  <span class="username">{{item.username}}</span>
                  <span class="commenttime">{{item.rateTime}}</span>
                </div>
                <div class="star">
                  <van-rate
                    v-model="item.score"
                    :size="15"
                    readonly
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                  />
                  <span class="servicetime">{{item.deliveryTime}}分钟送达</span>
                  <div class="text">{{item.text}}</div>
                  <div class="good">
                    <van-icon name="good-job" color="#FDCA23" size="20px" />
                    <van-tag
                      plain
                      type="primary"
                      v-for="(items,index) in item.recommend"
                      :key="index"
                    >{{items}}</van-tag>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { getassess } from "@/api/apis.js";
import { gettime } from "@/utils/utils.js";
export default {
  data() {
    return {
      //评分数据  服务态度
      service: 4.5,
      //评分数据  菜品质量
      food: 4.5,

      //所有评论数据
      persondata: [],
      //好评
      gooddata: [],
      //差评
      baddata: [],
    };
  },
  methods: {
    //封装获取评论的函数
    getass() {
      getassess().then((res) => {
        console.log(res);
        for (let obj of res.data.data) {
          obj.rateTime = gettime(obj.rateTime);
    
        }
        this.gooddata=res.data.data.filter(res=>{
          return res.rateType==0
        })
        this.baddata=res.data.data.filter(res=>{
          return res.rateType==1
        })
        console.log(this.gooddata);

        this.persondata = res.data.data;
      });
    },
  },
  created() {
    this.getass();
  },
};
</script>

<style lang="less" scoped>
#box {
  height: 100%;
  // background-color: #f4f5f7;
  overflow-y: auto;
  display: flex;
  // flex-flow: column;
  flex-direction: column;
}
// 上边总体评分
.score {
  background-color: #fff;
  padding: 20px;
  display: flex;

  // margin-bottom: 20px;

  .left {
    width: 100px;
    text-align: center;
    border-right: 1px solid #e4e4e4;
    padding-right: 15px;
    .num {
      font-size: 24px;
      font-weight: bolder;
      color: #f9c61c;
    }
    .total {
      font-size: 16px;
      color: #000;
      padding: 5px 0px;
    }
    .compare {
      font-size: 12px;
      color: #9e9e9e;
    }
  }
  .right {
    flex: 1;
    padding-left: 20px;
    .option {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .tname {
        color: #000;
        font-weight: bold;
        padding-right: 20px;
      }
      .time {
        font-size: 14px;
        color: #ababab;
      }
      .food,
      .service {
        color: gold;
        margin-left: 10px;
      }
    }
  }
}

//下边评论
.comment {
  background-color: #fff;
  // flex: 1;
  height: 100px;
  padding-top: 15px;
  margin-top: 20px;
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
          // display: flex;
          align-items: center;
          .van-tag {
            margin: 0px 5px;
          }
        }
      }
    }
  }
}
</style>