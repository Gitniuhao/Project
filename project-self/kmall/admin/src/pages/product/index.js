import React,{Component,Fragment} from 'react'
import {
	Switch,
	Route
} from 'react-router-dom'
import ProductList from './list.js'
import ProductSave from './save.js'

class Product extends Component{
	render(){//:productId?,后面加上?的意思是可有可无，有的话匹配到有id的路由，没有id的话就匹配之前的路由
		return(
			<div className='Product'>
				<Switch>
					<Route exact path='/product/' component={ProductList}/>
					<Route path='/product/save/:productId?' component={ProductSave}/>
				</Switch>
			</div>
		)
	}
}
export default Product