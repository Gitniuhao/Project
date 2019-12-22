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
}

module.exports = {
	API_CONFIG
}