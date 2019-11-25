;(function($){
var $register = $('#register') 
var $login = $('#login');
var $userInfo = $('#user-info');

//1.1.登录 => 注册 没有账号，跳转注册页面
$('#go-register').on('click',function(){
	$login.hide();
	$register.show()
})

//1.1.注册 => 登录 已有账号，跳转到登录页面
$('#go-login').on('click',function(){
	$register.hide();
	$login.show()
})

//2.点击注册进行验证然后发送ajax请求
$('#sub-register').on('click',function(){
	var username = $register.find('[name = username]').val()
	var password = $register.find('[name = password]').val()
	var repassword = $register.find('[name = repassword]').val()
	var $err = $register.find('.err')
	var errMassage = '';
	//规定用户名是字母开头，且后面可以是数字字母下划线，个数为3-8位
	var	userReg = /^[a-z]\w{2,7}$/i
	//规定密码可以是任意数字字母下划线，个数为5-10
	var passwordReg = /^\w{5,10}$/
	if(!userReg.test(username)){//验证用户名是否符合要求
		errMassage = '用户名是字母开头的3-8位任意字符，请重新命名!'
	}else if(!passwordReg.test(password)){//验证密码是否符合要求
		errMassage = '密码是5-10的任意字符，请重新设置!'
	}else if(repassword != password){//验证两次密码是否一致
		errMassage = '两次密码不一致，请重新输入!'
	}else{//注册成功
		errMassage = ''
	}

	if(errMassage){
		$err.html(errMassage)
	}else{
		$err.html('')
		//发送ajax请求
		$.ajax({
			url:'/user/register',
			type:'POST',
			dataType:'json',
			data:{
				username:username,
				password:password
			}
		})
		.done(function(data){//当发送ajax成功并且从后台返回数据进行处理
			if(data.code == 0){//当注册成功后直接自动跳转到登录页面
				$('#go-login').trigger('click');
			}else{//当注册失败后显示后台返回的失败信息
				$err.html(data.message);
			}
		})
		.fail(function(err){//发生ajax请求失败
			$err.html('请求失败，请稍后重试！')
		})
	}
})

//3.点击登录进行验证然后发送ajax请求
$('#sub-login').on('click',function(){
	var username = $login.find('[name = username]').val()
	var password = $login.find('[name = password]').val()
	var repassword = $login.find('[name = repassword]').val()
	var $err = $login.find('.err')
	var errMassage = '';
	//规定用户名是字母开头，且后面可以是数字字母下划线，个数为3-8位
	var	userReg = /^[a-z]\w{2,7}$/i
	//规定密码可以是任意数字字母下划线，个数为5-10
	var passwordReg = /^\w{5,10}$/
	if(!userReg.test(username)){//验证用户名是否符合要求
		errMassage = '用户名是字母开头的3-8位任意字符，请重新命名!'
	}else if(!passwordReg.test(password)){//验证密码是否符合要求
		errMassage = '密码是5-10的任意字符，请重新设置!'
	}else{//注册成功
		errMassage = ''
	}

	if(errMassage){
		$err.html(errMassage)
	}else{
		$err.html('')
		//发送ajax请求
		$.ajax({
			url:'/user/login',
			type:'POST',
			dataType:'json',
			data:{
				username:username,
				password:password
			}
		})
		.done(function(data){//当发送ajax成功并且从后台返回数据进行处理
			if(data.code == 0){//当登录成功后直接自动跳转到个人信息页面
				// $login.hide()
				// $('#user-info').show()
				// $('#user-info').find('span').html(data.user.username)
				window.location.reload();//重新刷新页面
			}else{//当登录失败后显示后台返回的失败信息
				$err.html(data.message);
			}
		})
		.fail(function(err){//发生ajax请求失败
			$err.html('请求失败，请稍后重试！')
		})
	}
})

//4.点击退出登录
$('#logout').on('click',function(){
	$.ajax({
		url:'/user/logout',
		type:'GET',
	})
	.done(data =>{
		//退出登录成功就跳转到首页
		if(data.code == 0){
			window.location.href ='/' ;
		}
	})
	.fail(err =>{
		$userInfo.find('.err').html('请求失败，请稍后重试！')
	})
})

//5.处理前台文章分页功能
	var $articlePage = $('#articlePage');
	//构建文章内容的函数
	function buildArticleHtml(articles){	
			var html = '';
			articles.forEach(function(article){
				var createTime = moment(article.createAt).format('YYYY-MM-DD HH:mm:ss')
				html += `
	              <div class="panel panel-default content-item">
	                <div class="panel-heading">
	                  <h3 class="panel-title">
	                    <a href="/detail/${article._id.toString()}" class="link" target="_blank">${article.title}</a>
	                  </h3>
	                </div>
	                <div class="panel-body">
	                  ${ article.intro }
	                </div>
	                <div class="panel-footer">
	                  <span class="glyphicon glyphicon-user"></span>
	                  <span class="panel-footer-text text-muted">${ article.user.username }</span>
	                  <span class="glyphicon glyphicon-th-list"></span>
	                  <span class="panel-footer-text text-muted">${ article.category.name }</span>
	                  <span class="glyphicon glyphicon-time"></span>
	                  <span class="panel-footer-text text-muted">${ createTime }</span>
	                  <span class="glyphicon glyphicon-eye-open"></span>
	                  <span class="panel-footer-text text-muted"><em>${ article.click }</em>已阅读</span>
	                </div>
	              </div>
	            `
			})
		return html;
	}

	//创建分页内容的函数
	function buildPaginationHtml(page,pages,list){
		var html = '';
		if(page == 1){
			html += `<li class="disable">`
		}else{
			html += `<li>`
		}
		html += `<a href="javascript:;" aria-label="Previous">
	          <span aria-hidden="true">&laquo;</span>
	        </a>
	      </li>`
	    list.forEach(function(i){
	    	if(i == page){
	    		html +=	`<li class="active"><a href="javascript:;">${ i }</a></li>`
	    	}else{
	   		 	html +=	`<li><a href="javascript:;">${ i }</a></li>`
	    	}
	    })
	    if(page == pages){
	    	html += `<li class="disable">`
	    }else{
	    	html += `<li>`
	    }
	    html += ` <a href="javascript:;" aria-label="Next">
	          <span aria-hidden="true">&raquo;</span>
	        </a>
	      </li>`
	      
	      return html;
	}
	//将事件绑定在分页器上
	$articlePage.on('get-data',function(ev,data){
		//构建文章html
		$('#article-wrap').html(buildArticleHtml(data.docs))
		//构建分页器html
		$pagination = $articlePage.find('.pagination')
		if(data.pages > 1){
			// console.log(data)
			$pagination.html(buildPaginationHtml(data.page,data.pages,data.list))
		}else{
			$pagination.html('')
		}
		
	})
	//调用分页组件发送ajax
	$articlePage.pagination({//传值	
		url:'/articles'
	})

//6.处理评论分页，局部渲染页面
	$commentPage = $('#comment-page');
	function buildCommentHtml(comments){
		var html = '';
		comments.forEach(function(comment){
			var createTime = moment(comment.createAt).format('YYYY-MM-DD HH:mm:ss')
			html += `
				<div class="panel panel-default">
			        <div class="panel-heading">${ comment.user.username } 发表于 ${ createTime } </div>
			        <div class="panel-body">
			          ${ comment.content }
			        </div>
			     </div>	`
		})
		return html;
	}
	//将事件绑定在分页器上
	$commentPage.on('get-data',function(ev,data){
			//构建评论部分html在评论面板上
			$('#comment-wrap').html(buildCommentHtml(data.docs))
			//构建分页器html
			$pagination = $commentPage.find('.pagination')
			if(data.pages > 1){
				// console.log(data)
				$pagination.html(buildPaginationHtml(data.page,data.pages,data.list))
			}else{
				$pagination.html('')
			}
	})
	$commentPage.pagination({
		url:'/comment/list'
	})

})(jQuery);