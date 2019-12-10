//组件化：就是页面的一部分，把页面的一部分进行组件化写在另一个页面，然后导出，便于维护修改
//引入react和属于react的Compontent函数
import React,{Component,Fragment} from 'react'
import Login from 'pages/login'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom'

//子组件的集合组件
class App extends Component{	
	render(){
		return(
			<Router>
				<div className ='App'>
					<Route path='/login'  component={Login} />				 
				</div>
			</Router>
		) 
	}
}	

export default App;
