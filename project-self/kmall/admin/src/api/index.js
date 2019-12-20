import { SERVER,API_CONFIG } from './config.js'
import axios from 'axios'
import { removeUsername } from 'util'

const getApiObj = (API_CONFIG)=>{
	const apiObj = {};
	for(let key in API_CONFIG){//for in遍历 API_CONFIG对象，从而获取每一项
		apiObj[key] = (data)=>{//让每一项称为一个方法
			let url = SERVER + API_CONFIG[key][0];
			let method = API_CONFIG[key][1];
			return request(url,method,data)
		}
	}

	return apiObj
}
const request = (url,method,data)=>{
	return new Promise((resolve,reject)=>{
		const options = {
			method:method,
			url:url,
			withCredentials:true,
		}
		switch(method.toUpperCase()){//axios发送ajax时且方法是get或delete，携带参数必须用params携带
			case'GET':
			case'DELETE':
				options.params = data
				break;
			default:
			 	options.data = data
		}
		axios(options)
		.then(result=>{
			console.log(result)
			if(result.data.code == 10){
			//当后台session过期或者通过其他方法去除，需要清除前台localstorage，保持前后台一致
				//1、去除前台localstorage	
				removeUsername()
				//2、跳转到登录页面
				window.location.href = '/login'
				reject('请求失败，请有权限登录！')
			}
			resolve(result)
		})
		.catch(err =>{
			 reject(err)
		})
	})
}
export default getApiObj(API_CONFIG);//最后传出去一个对象