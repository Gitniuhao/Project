import Vue from 'vue'
import VueRouter from 'vue-router'
//引进组件
import Home from 'pages/home'
import Cart from 'pages/cart'
import Me from 'pages/me'
//声明使用
Vue.use(VueRouter)

//导出路由对象
export default new VueRouter({
	routes:[
		{path:"/home",component:Home},
		{path:"/cart",component:Cart},
		{path:"/me",component:Me},
		{path:"/",redirect:"/home"},
	]
})


