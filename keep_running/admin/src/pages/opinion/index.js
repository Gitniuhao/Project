import React,{Component,Fragment} from 'react'
import {
	Switch,
	Route
} from 'react-router-dom'
import OpinionList from './list.js'
import OpinionDetail from './detail.js'




class Opinion extends Component{
	render(){//:articleId?,后面加上?的意思是可有可无，有的话匹配到有id的路由，没有id的话就匹配之前的路由
		return(
			<div className='Opinion'>
				<Switch>
					<Route exact path='/opinion' component={OpinionList}/>										
					<Route path='/opinion/detail/:opinionId' component={OpinionDetail}/>										
				</Switch>
			</div>
		)	
	}
}
export default Opinion