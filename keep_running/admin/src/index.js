//安装并引进react react-dom然后用ReactDom.render进行页面渲染
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Provider } from 'react-redux' 
import store from './store'
//在最顶层组件外用provider包裹整个app组件，并且将store赋予store的含义在于app里所以的组件都可以共享store里的数据
ReactDOM.render(
	<Provider store={store}>
		<App />		
	</Provider>,
	document.getElementById('root')
)
