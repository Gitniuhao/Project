import React,{Component,Fragment} from 'react'
import {
	Switch,
	Route
} from 'react-router-dom'
import OrderList from './list.js'
import OrderDetail from './detail.js'

class Order extends Component{
	render(){//:productId?,后面加上?的意思是可有可无，有的话匹配到有id的路由，没有id的话就匹配之前的路由
		return(
			<div className='Order'>
				<Switch>
					<Route exact path='/order/' component={OrderList}/>
					<Route path='/order/detail/:orderNo?' component={OrderDetail}/>
				</Switch>
			</div>
		)
	}
}
export default Order