import axios from 'axios'


axios.defaults.baseURL='http://192.168.31.179:5000'
// axios.defaults.baseURL='http://172.16.15.147:5000'


//接口封装
//获取商品数据
export var getcommodity = () => axios.get('/goods/goods_list')

//获取商家接口
export var getmerchant = () => axios.get('/shop/seller')

//获取评价数据
export var getassess = () => axios.get('/shop/ratings')