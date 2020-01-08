//组件中用由this.$store.dispatch方法来派发action,
//action中用commit来提交mutation
//action中可以包含异步操作
import { GET_ADS,GET_FLOORS } from '../store/types.js'
import api from 'api'
export default{//第一参数是选择使用的方法，第二个参数是数据
	async [GET_ADS]({commit}){
		 const result = await api.getPositionAds()
		if(result.data.code == 0){
			commit(GET_ADS,{homeAds:result.data.data})
		}
	},
	async [GET_FLOORS]({commit}){
		 const result = await api.getFloor()
		if(result.data.code == 0){
			commit(GET_FLOORS,{homeFloors:result.data.data})
		}
	}
}