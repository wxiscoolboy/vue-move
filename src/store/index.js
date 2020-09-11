import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



//创建数据仓库
let store = new Vuex.Store({
    //核心 概念    
    //1.state 属性   状态 要交互的数据  仓库中真正存储交互数据的对象 所有需要传递的数据都放在state中
    state: {
        // 商品页 页面数据
        list:[],

        // //商品详情页 页面数据
        detaillist:{}


    },
    //mutations 改变属性   是改变state值的唯一方式 如果想要改变state的值，就必须触发一个mutation  为了统一集中管理
     mutations:{
        getlist(state,newarr){
            state.list=newarr
            // console.log(newarr);
        },

        getdetaillist(state,res){
            // console.log(res);
            state.detaillist=res
        }
     },
     //getters 计算属性 用法和computed相同属于vuex 所以只能计算vuex的值  只要母体数据不变 不会重复计算
     getters:{
        shopcarlist(state){
            //购物车数据 数量>0的商品
            let arr=[]
            for(let obj of state.list){
                for(let child of obj.foods){
                    if(child.num>0){
                       arr.push(child)
                    }
                }
            }
            return arr
        }
     }
})




export default store