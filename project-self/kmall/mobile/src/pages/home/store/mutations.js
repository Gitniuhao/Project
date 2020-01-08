//唯一更改state的方法
//mutation必须是同步函数
import { GET_ADS,GET_FLOORS } from '../store/types.js'
export default{//第一个参数为state数据，第二个是新数据
	[GET_ADS](state,payload){
		state.ads =payload.homeAds
	},
	[GET_FLOORS](state,payload){
		state.floors =payload.homeFloors
	}
}