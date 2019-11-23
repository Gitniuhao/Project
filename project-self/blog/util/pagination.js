async function pagination(options){
	/*分页
	前提条件:想要显示那一页必须知道页码,page有前台传入
	约定:每一页显示几条数据 limit = 2
	第1页: 显示1-2 	skip(1-1)*2 limit = 2
	第2页: 显示3-4	skip(2-1)*2 limit = 2
	第3页: 显示5-6	skip(3-1)*2 limit = 2
 	......
	第page页 显示    skip(page-1)*2 limit = 2
	*/
	
	//限制每页只显示4条数据
	const limit = 4;
	
	let { page,model,query,projection,sort,populates } = options
	//当page不是数字时的处理
	if(isNaN(page)){
		page = 1
	}
	//上一页边界控制
	if(page == 0){
		page = 1
	}
	//用await处理异步减少回调函数的麻烦
	 const count = await model.countDocuments(query);
	//获取总页数(由总的数据条数除以每一页的数据得出页数)
	let pages = Math.ceil((count/limit));
	//下一页边界控制
	if(page > pages){
		page = pages;
	}
	//当总页数为零时，赋值当前页面为0，可以让page为1
	if(page == 0){
		page = 1
	}
	//因为swig无法对数字进行遍历循环，因此需要在后台生成页码
	let list = [];
	for(let i=1;i<=pages;i++){
		list.push(i)
	}
	//需要跳跃的页数
	let skip = (page-1)*limit;
	//查找数据
	let result =  model.find(query,projection)
	if(populates){
		populates.forEach(function(populate){
			return result.populate(populate)
		})
	}
	const docs = await result.sort(sort).skip(skip).limit(limit)
	//需要返回的值
	return {
		docs:docs,
		page:page,
		pages:pages,
		list:list
	}
}

module.exports = pagination;