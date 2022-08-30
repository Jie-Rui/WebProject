const express = require('express');
const session = require('express-session');
const cors = require('cors');
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:false}));
server.use(session({
    secret: 'keyboard cat', // secret 属性可以为任意字符串
	resave: 'false',       // 固定写法
	saveUninitialized: true // 固定写法
}));

server.use('/api/category',require('./routes/category'));

server.listen(3000,()=>{
    console.log('服务器运行在 http://localhost:3000');
})