require('./index.css')
var Hogan = require('hogan.js')
var tpl = require('./index.tpl')
var _util = require('util')

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
		list.find(function(item){//当传进来的name和item.name相等时，其isActive为true
			return item.name = name
		}).isActive = true
		// console.log(list)
		//自定义hogan模板并运用模板渲染数据
		// var template = Hogan.compile(tpl);
		// var html = template.render({
		// 	list:list
		// });
		var html = _util.render(tpl,{
			list:list
		})

		$('.side').html(html)
	}
}