<template>
  <div class="order-box">
    <div class="order-left">
      <!--2. 使用better-scroll必须要在滚动的dom容器中 讨一个div -->
      <div>
        <!-- 侧边导航数据 -->
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            :title="item.name"
            v-for="(item,index) in list_x"
            :key="index"
            @click="clickTab(index)"
          />
        </van-sidebar>
      </div>
    </div>
    <div class="order-right">
      <!--2. 使用better-scroll必须要在滚动的dom容器中 讨一个div -->
      <div>
        <!-- 商品选项 -->
        <div v-for="(item,index) in list_x" :key="index" :id="index">
          <div class="classname">{{item.name}}</div>
          <div
            class="order"
            v-for="(items,index) in item.foods"
            :key="index"
            
          >
            <van-row>
              <van-col span="7">
                <van-image width="80" height="80" :src="items.imgUrl" radius="5px" />
              </van-col>
              <van-col span="17">
                <div class="comname" @click="goodsdetails(items)">{{items.name}}</div>
                <div>
                  <span class="icon">特惠</span>
                </div>
                <div class="num">
                  <span class="sale_num">月售{{items.sellCount}}份</span>
                  <span>好评度{{items.rating}}%</span>
                </div>
                <div class="Price">
                  <span class="nowprice">￥{{items.price}}</span>
                  <span class="oldprice">￥99.40</span>
                  <van-stepper v-model="items.num" theme="round" button-size="22" disable-input min=0 />
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getcommodity } from "@/api/apis.js";
//1.引入botter-scroll
import BScroll from "better-scroll";
export default {
  data() {
    return {
      //侧边导航 选中的索引
      activeKey: 0,
      //商品数据
      // list: [],

      //商品图片数据
      src:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597944529253&di=1be447a81ac144bd54376cf53e2044d3&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F10%2F54%2F20300543009208144238549255948.jpg",

     
    };
  },

  mounted() {
    // 3.在mounted中，new插件实例，使用即可
    // 它只是优化滚屏！！！所以你的容器必须原来就有滚动条！！！！容器必须固定高度， overflow: scroll || auto
    // 参数1： DOM容器 || DOM选择器（如果传入字符串，则会自动转换为querySelector）
    // 参数2： 配置对象Dom
    new BScroll(".order-left", { click: true });

    //功能二：滚动右边菜单 左边商品分类相应的滚动
    this.rightscroll = new BScroll(".order-right", {
      click: true, //允许滚动面板点击
      probeType: 3, //实时派发滚动事件
    });
    // console.log(rightscroll);
    this.rightscroll.on("scroll", (obj) => {
      //注意 因为向上滑动   所以获取的y值是负数  这个时候可以转化成正数计算 方便计算 Math.abs()方法
      // console.log(this.getdivarr);
      let _y = Math.abs(obj.y);
      //  console.log(_y);
      //循环判断区间值 设置选项卡选中索引
      for (let obj1 of this.getdivarr) {
        if (_y >= obj1.starty && _y < obj1.endy) {
          // console.log(123);
          this.activeKey = obj1.index;
          break;
        }
      }
    });
  },

  methods: {
    //查看商品的详情
    goodsdetails(comdata) {

      // console.log(comdata);
      this.$router.push('/goodsdetail')
    //  sessionStorage.cid=comdata.id
    this.$store.commit('getdetaillist',comdata)

    },

    //功能一：点击左边导航栏 对应右边跳转
    clickTab(index) {
      //  alert(55)
      //  console.log(index);
      // 保存点击的索引
      this.activeKey = index;

      //点击某个选项卡,则让右侧滚动到对应的div上s
      this.rightscroll.scrollToElement(document.getElementById(index), 600);
    },
  },

  created() {
    //获取数据
    getcommodity().then((res) => {
      // console.log(res);
      // this.list = res.data.goodsList;
      
      //添加一个商品数量属性
      for(let obj of res.data.goodsList){
        for(let cd of obj.foods){
          cd.num=0
        }
      }
      // console.log(res.data.goodsList);

      //一。发送vuex-mutation请求
      this.$store.commit("getlist", res.data.goodsList);
    });




  },

  //计算属性
  computed: {
    //功能二：滚动右边菜单 左边商品分类相应的滚动
    //获取所有的div高度并拿到区间段值

    getdivarr() {
      console.log("计算属性被运行了！！");
      //存放数据的数组
      let arr = [];
      //存放累加的高度总和  因为高度和对应的商品类别相对应
      let totalheight = 0;

      for (let i = 0; i < this.list_x.length; i++) {
        let divheight = document.getElementById(i).offsetHeight;
        // console.log(divheight);
        arr.push({
          starty: totalheight, //每个盒子对应的高度范围 开始
          endy: totalheight + divheight, //每个盒子对应的高度范围 结束
          index: i, //对象的索引值
        });
        totalheight += divheight;
      }

      return arr;
    },

   //二。界面取值  取vuex的值
     list_x(){
       return this.$store.state.list
     }
  },
};
</script>

<style lang="less" scoped>
.order-box {
  flex: 1;
  display: flex;
  overflow: hidden;
  .order-left {
    width: 90px;
    overflow: scroll;
  }
  .order-right {
    flex: 1;
    overflow-y: auto;
    overflow: scroll;
    // height: 100%;
    .classname {
      line-height: 30px;
      border-left: 3px solid #e0e0e0;
      box-sizing: border-box;
      padding-left: 10px;
      background-color: #f4f4f4;
    }
    .order {
      padding: 15px 10px;
      .comname {
        font-size: 14px;
        font-weight: bolder;
      }
      .icon {
        display: inline-block;
        font-size: 12px;
        padding: 2px;
        background-color: #eeeeee;
      }
      .num {
        margin-top: 10px;
        margin-bottom: 15px;
      }
      .sale_num {
        margin-right: 15px;
      }
      .Price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .nowprice {
          font-size: 18px;
          color: red;
          font-weight: bolder;
        }
        .oldprice {
          color: #999999;
          text-decoration: line-through;
        }
      }
    }
  }
}
.van-sidebar {
  width: 90px;
}
.van-popup--bottom {
  bottom: 40px;
  left: 0;
  width: 100%;
}
</style>