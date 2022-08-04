// 1.1 导入 http 模块
const http = require('http');
// 1.2 导入 fs 文件系统模块
const fs = require('fs');
// 1.3 导入 path 路径处理模块
const path = require('path');
const { log } = require('console');
// 2.1 创建 web 服务器
const server = http.createServer();
// 2.2 为 web 服务器绑定 request 事件
server.on('request', (req, res) => {
    // 3.1 获取到客户端请求的 url 地址
    const url = req.url;

    // 3.2 把请求的 url 地址，映射为本地文件的存放路径
    // const fp = path.join(__dirname, url);

    // 5.1 预定义空白文件的存放路径
    let fp = '';
    if(url === '/') {
        // 5.2 如果请求的路径是否为 /，则手动指定文件的存放路径
        fp = path.join(__dirname, './clock/index.html');
    }else {
        // 5.2 如果请求的路径不为 /，则动态拼接文件的存放路径
        fp = path.join(__dirname, './clock', url);
    }

    // 4.1 根据映射过来的文件读取路径
    fs.readFile(fp, 'utf8', (err, dataStr) => {
        // 4.2 读取文件失败后，向客户响应固定的错误消息
        if(err) return res.end('404 Not Found');
        // 4.3 读取文件成功后，将读取成功的文件内容响应给客户端
        res.end(dataStr);
    })
});
// 2.3 启动 web 服务器
server.listen(80, () => {
    console.log('http server running at http://127.0.0.1');
});
