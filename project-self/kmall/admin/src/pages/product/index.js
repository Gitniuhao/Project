import React,{Component,Fragment} from 'react'
import {
	Switch,
	Route
} from 'react-router-dom'
import ProductList from './list.js'
import ProductSave from './save.js'

class Product extends Component{
	render(){
		return(
			<div className='Product'>
				<Switch>
					<Route exact path='/product/' component={ProductList}/>
					<Route path='/product/save' component={ProductSave}/>
				</Switch>
			</div>
		)
	}
}
export default Product