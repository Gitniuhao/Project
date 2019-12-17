export const SERVER = 'http://127.0.0.1:3000'
export const UPLOAD_PRODUCT_IMAGE = SERVER + '/products/images'
export const UPLOAD_PRODUCT_DETAILS_IMAGE = SERVER + '/products/detailImages'

export const API_CONFIG = {
	login:     				['/sessions/users','post'],
	logout:   		 		['/sessions/users','delete'],
	getCounts:  			['/counts',"get"],
	getUserList:   			['/users/list','get'],
	addCategories:       	['/categories','post'],
	getLevelCategories:  	['/categories/levelCategories','get'],
	getCategoryList:   		['/categories/list','get'],
	updateCategoryName:     ['/categories/name','put'],
	updateCategoryMobileName:['/categories/mobileName','put'],
	updateCategoryOrder:    ['/categories/order','put'],
	updateCategoryIsShow:   ['/categories/isShow','put']
}