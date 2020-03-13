import React,{Component,Fragment} from 'react'
import {
	Switch,
	Route
} from 'react-router-dom'
import ArticleList from './list.js'
import ArticleSave from './save.js'
import ArticleDetail from './detail.js'



class Article extends Component{
	render(){//:articleId?,后面加上?的意思是可有可无，有的话匹配到有id的路由，没有id的话就匹配之前的路由
		return(
			<div className='Article'>
				<Switch>
					<Route exact path='/article' component={ArticleList}/>					
					<Route path='/article/save/:articleId?' component={ArticleSave}/>					
					<Route path='/article/detail/:articleId?' component={ArticleDetail}/>					
				</Switch>
			</div>
		)	
	}
}
export default Article