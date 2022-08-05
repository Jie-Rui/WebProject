// 1.导入fs模块
const fs = require('fs')

// 调用fs.readFile() 读取文件内容
fs.readFile('../Node-案例/files/成绩.txt', 'utf-8', function(err, dataStr) {
    // 3.判断是否读取成功
    if (err) {
        return console.log('读取文件失败！' + err.message)
    }
    // console.log('读取文件成功！' + dataStr);


    // 4.1 先把成绩的数据，按照空格进行分割
    const arrOld = dataStr.split('，')
    // 4.2 循环分割后，对每一项数据，进行字符串的替换操作
    const arrNew = []
    arrOld.forEach(item => {
        arrNew.push(item.replace('=',': '))
    })
    // 4.3 把新数组中的每一项，进行合并，得到一个新的字符串
    const newStr = arrNew.join('\r\n')
    console.log(newStr);

    // 5. 调用fs.write()方法 把处理完毕的成绩写入到新的文件中
    fs.writeFile('../Node-案例/files/成绩-OK.txt', newStr, 'utf-8', function(err) {
        if (err) {
            return console.log('文件写入失败！' + err.message);
        }
        console.log('成绩写入成功！');
    })
})

