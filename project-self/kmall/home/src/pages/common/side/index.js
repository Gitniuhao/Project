require('./index.css')

var list = [
			 {
			 	name:'user-center',
			 	desc:'用户中心',
			 	link:'./user-center.html'
			 },
			 {
			 	name:'order-list',
			 	desc:'我的订单',
			 	link:'./order-list.html'
			 },
			 {
			 	name:'user-update-password',
			 	desc:'修改密码',
			 	link:'./user-update-password.html'
			 }
		]
module.exports = {
	render:function(name){
		list.find(function(item){
			return item.name = name
		}).isActive = true
	}
}