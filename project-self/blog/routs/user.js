const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();



router.post('/register',(req,res)=>{
	const { username,password } = req.body
	console.log(username,password)
})
module.exports = router;