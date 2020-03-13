import React,{Component,Fragment} from 'react'
import {
	Switch,
	Route
} from 'react-router-dom'
import AdminList from './list.js'
import AdminAdd from './add.js'
import AdminReset from './reset.js'


class Admin extends Component{
	render(){
		return(
			<div className='Admin'>
				<Switch>
					<Route exact path='/admin/' component={AdminList}/>
					<Route path='/admin/add' component={AdminAdd} />					
					<Route path='/admin/resetPassword' component={AdminReset} />					
				</Switch>
			</div>
		)
	}
}
export default Admin