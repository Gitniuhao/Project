//入口文件
import Vue from 'vue'
import App from './App.vue'
import store from './store'
//引入公共css
import './assets/css/common.css'
//引入路由对象
import router from './router'
//全局加载vant组件
import './plugins/vant'
// 消除打印台提示信息
Vue.config.productionTip = false

new Vue({//将store进入，全部组件都可以拿到store里的数据
	store,
	router,
  render: h => h(App),
}).$mount('#app')//绑定dom节点
