var API_CONFIG = {
	login: 					['/sessions/users','post'],
	getUsername: 			['/sessions/username','get'],
	logout: 				['/sessions/users','delete'],
	register:               ['/users','post'],
	checkUsername:          ['/users/checkUsername','get'],
	getUserInfo:            ['/sessions/users','get'],
	updatePassword:         ['/users','put'],
	getHomeCategories:      ['/categories/homeCategories','get'],
	getPositionAds:         ['/ads/positionAds','get'],
	getFloor:         		['/floors','get'],
	getProductsList:        ['/products/list','get'],
	getProductDetail:       ['/products/detail','get'],
	addCart:                ['/carts','post'],
	getCartCount:           ['/carts/count','get'],
	getCartDetail:          ['/carts','get'],
	updateCartChoice:       ['/carts/choices','put'],
	deleteCartProduct:      ['/carts','delete'],
	updateCartCount:        ['/carts/counts','put'],
	getOrderProducts:       ['/orders/products','get'],
	addShippings:           ['/shippings','post'],
	getShippingsList:       ['/shippings/list','get'],
	deleteShipping:         ['/shippings','delete'],
	getShippingDetail:      ['/shippings/detail','get'],
	updateShippingDetail:   ['/shippings','put'],
	addOrder:   			['/orders','post'],
	getPayments:   			['/payments','get'],
	getPaymentStatus:       ['/payments/status','get'],
	getOrderList:           ['/orders/list','get'],
}

module.exports = {
	API_CONFIG
}