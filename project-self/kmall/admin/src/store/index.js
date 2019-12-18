import {createStore,applyMiddleware} from 'redux';
import reducer from './reducer.js'
import thunk from 'redux-thunk'//处理异步程序，让dispatch可以处理一个函数
import { createLogger } from 'redux-logger'//展示操作日志，更加详细
//此页面创建store,相当于组件与reducer的一个中转站,组件中数据一般都要先存到store里面，然后再通过各种方法拿到数据

const middleWares = [thunk]

if(process.env.NODE_ENV == 'development'){//当环境是开发环境的时候，才调用logger
	const logger = createLogger({

	})
	middleWares.push(logger)
}

const store = createStore(reducer,applyMiddleware(...middleWares))

export default store