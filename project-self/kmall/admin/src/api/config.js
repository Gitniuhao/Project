export const SERVER = 'http://127.0.0.1:3000'
export const UPLOAD_PRODUCT_IMAGE = SERVER + '/products/images'
export const UPLOAD_PRODUCT_DETAILS_IMAGE = SERVER + '/products/detailImages'
export const UPLOAD_AD_IMAGE = SERVER + '/ads/image'

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
	updateCategoryIsShow:   ['/categories/isShow','put'],
	addProduct:             ['/products','post'],
	getProductsList:        ['/products/list','get'],
	updateProductIsShow:    ['/products/isShow','put'], 
	updateProductStatus:    ['/products/status','put'], 
	updateProductIsHot:    	['/products/isHot','put'],
	getProductDetail:       ['/products/detail','get'],
	updateProduct:       	['/products','put'],
	//广告api
	getAdsList:                  	["/ads/list","get"],
    getAdsDetail:                	["/ads/detail","get"],
    addAds:                      	["/ads","post"],
    updateAds:                  	["/ads","put"],
    updateAdsOrder:              	["/ads/order","put"],
    updateAdsIsShow:             	["/ads/isShow","put"],
}