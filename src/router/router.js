import Vue from 'vue'
import VueRouter from 'vue-router'
// import goods from '../pages/goods/goods.vue'
import index from '../pages/index.vue'
import goodsdetail from '../pages/goodsdetail.vue'


Vue.use(VueRouter) //使用VueRouter插件

const router = new VueRouter({
    routes: [{
            path: '/',
            name: 'goods',
            component: index,
            children: [{
                    path: '/',
                    name: 'goods',
                    meta: {
                        title: '商品页面'
                    },
                    component: () => import('../pages/goods/goods.vue')
                },
                // {
                //     path: '/index/goods',
                //     name: '/index/goods',
                //     meta: {
                //         title: '商品页面'
                //     },
                //     component: () => import('../pages/goods/goods.vue')
                // },
                {
                    path: '/index/ratings',
                    name: 'ratings',
                    meta: {
                        title: '评价页面'
                    },
                    component: () => import('../pages/ratings/ratings.vue')
                },
                {
                    path: '/index/seller',
                    name: 'seller',
                    meta: {
                        title: '商家页面'
                    },
                    component: () => import('../pages/seller/seller.vue')
                }
            ]
        },
        {
            path:'/goodsdetail',
            name:'/goodsdetail',
            component:goodsdetail
        }

        // {
        //     path: '/ratings',
        //     name: 'ratings',
        //     meta: {
        //         title: '评价页面'
        //     },
        //     component: () => import('../pages/ratings/ratings.vue')
        // },
        // {
        //     path: '/seller',
        //     name: 'seller',
        //     meta: {
        //         title: '商家页面'
        //     },
        //     component: () => import('../pages/seller/seller.vue')
        // },
 
    

    ]


})

export default router