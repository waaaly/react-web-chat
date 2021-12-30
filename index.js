const md5 = require('md5')
let params = { user: 'waaaly', password: '123456' };
// 1、将传输对象转换成json字符串jsonStr;
let jsonStr = JSON.stringify(params);
// 2、使用md5对jsonStr字符串做摘要处理生成md5摘要；
let md5Content = md5(jsonStr)
// 3、使用RSA公钥对md5数据加密生成签名signature；
//let signature = 
console.log(md5Content)
