const crypto = require('crypto');
//进行加密的工具页面
module.exports = (str =>{
	const hmac = crypto.createHmac('sha512','jlhdfjsdnfjln');
	//进行加密
	hmac.update(str);
	//返回加密数据
	return hmac.digest('hex');
})