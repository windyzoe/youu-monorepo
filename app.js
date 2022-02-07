var express = require('express');
var path = require('path');
var app = express();
var pathname = path.resolve(__dirname, './packages/youu-components/docs-dist');
app.use(express.static(pathname));
app.listen(3000);

console.log('服务已启动---bbbbb---   http://localhost:3000');

// 测试dumi打包的脚本