//组件化：就是页面的一部分，把页面的一部分进行组件化写在另一个页面，然后导出，便于维护修改
//引入react和属于react的Compontent函数
import React,{Component,Fragment} from 'react'
import TodoList from './pages/todolist/index.js'
import {
	BrowserRouter as Router,
	// HashRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom'
//使用BrowserRouter(h5路由)时,页面刷新会向服务器发送请求,而HashRouter(hash路由)不会
//但是h5路由便于书写，而h5路由又比较符合刷新页面保持原页，不向后台发送请求的要求，故需要在配置文件的edv-server里添加配置
class Home extends Component{
	render(){
		return (
				<h1>this is home page</h1>
			)
	}
}
class About extends Component{
	render(){
		return (
				<h1>this is about page</h1>
			)
	}
}
class User extends Component{
	render(){
		return (
				<h1>this is User page,and the UserId is {this.props.match.params.id}</h1>
			)
	}
}
class Admin extends Component{
	render(){//Switch(路由选项)，由简单路由到复杂路由，需要加输精准匹配，且有id的放到最后
		return (
			<Switch>
				<Route exact path='/admin' render={(props)=>(<h2>this is admin page</h2>)} />
				<Route path='/admin/article' render={(props)=>(<h2>this is admin article page</h2>)} />
				<Route path='/admin/:id' render={(props)=>(<h2>this is admin page,admin id is{props.match.params.id}</h2>)} />
			</Switch>
		)
	}
}
//子组件的集合组件
class App extends Component{
	constructor(props){
		super(props)
		this.state = {
			isAdmin:true
		}
	}
	render(){//自定义路由
		const protectRouter =(component:Component,...rest)=>{
			return <Router
				{...rest} 
				render={(props)=>{
					return this.state.isAdmin ? <Component {...props}/> : <h1>this is the login page</h1>	
				}}
			/>
		}
		return(
			<Router>
				<div className ='App'>
					<nav>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='/TodoList'>TodoList</Link>
						</li>
						<li>
							<Link to='/About'>About</Link>
						</li>
						<li>
							<Link to='/User/123'>User/Id</Link>
						</li>
						<li><Link to='/admin'>Admin</Link></li>
						<li><Link to='/admin/123'>Admin/123</Link></li>
						<li><Link to='/admin/article'>Admin/article</Link></li>
						 <Route exact path='/' component={Home} />
						 <Route path='/TodoList' component={TodoList} />
						 <Route path='/About' component={About} />
						 <Route path='/User/:id' component={User} />
						 <Route path='/admin' component={Admin} />
						{
							// <Route exact path='/'><Home /></Route>
							// <Route exact path='/TodoList'><TodoList /></Route>
						}
					</nav>
				</div>
			</Router>
		) 
	}
}	

export default App;
