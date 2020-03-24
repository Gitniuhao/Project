export const SERVER = 'http://127.0.0.1:5757/weapp'	
export const UPLOAD_ARTICLE_IMAGE = SERVER + '/uploadImage'	
export const UPLOAD_ARTICLE_DETAILS_IMAGE = SERVER + '/uploadDetailImage'	

export const API_CONFIG = {
	login:          	 ['/adminLogin','post'],
	resetSession:   	 ['/resetSession','post'],
	getCounts:      	 ['/getCount','get'],
	getAdminList:   	 ['/getAdminList','get'],
	addAdmin:       	 ['/addAdmin','post'],
	delteAdmin:       	 ['/delteAdmin','post'],
	resetPassword:       ['/resetPassword','post'],
	getUserList:       	 ['/getUserList','get'],
	delteUser:       	 ['/delteUser','post'],	
	addArticle:       	 ['/addArticle','post'],	
	getArticleList:      ['/getArticleList','get'],	
	updateArticleIsShow: ['/updateArticleIsShow','post'],	
	getArticleDetail:    ['/getArticleDetail','get'],	
	updateArticle:       ['/updateArticle','post'],	
	deleteArticle:       ['/deleteArticle','post'],	
	getOpinionList:      ['/getOpinionList','get'],	
	delteOpinion:        ['/delteOpinion','post'],	
	getOpinionDetail:    ['/getOpinionDetail','get']	
}