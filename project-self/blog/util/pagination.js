async function pagination(options){
	const limit = 4;
	//page是当前页数，通过获取路由上的信息而得出
	
	let { page,model,query,projection,sort } = options
	//当page不是数字时的处理
	if(isNaN(page)){
		page = 1
	}
	//上一页边界控制
	if(page == 0){
		page = 1
	}

	 const count = await model.countDocuments();
	//获取总页数(由总的数据条数除以每一页的数据得出页数)
	let pages = Math.ceil((count/limit));
	//下一页边界控制
	if(page > pages){
		page = pages;
	}

	if(page == 0){
		page = 1
	}
	//因为swig无法对数字进行遍历循环，因此需要在后台生成页码
	let list = [];
	for(let i=1;i<=pages;i++){
		list.push(i)
	}
	let skip = (page-1)*limit;
	//查找数据
	const docs = await model.find(query,projection).sort(sort).skip(skip).limit(limit)
	
	return {
		docs:docs,
		page:page,
		pages:pages,
		list:list
	}
}

module.exports = pagination;