// 代码生成时间: 2025-09-22 15:36:25
const http = require('http');

// 定义一个响应函数，用于处理HTTP请求并返回响应
function handleRequest(request, response) {
  // 检查请求方法
  if (request.method === 'GET') {
    // 处理GET请求
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello, World!');
  } else {
    // 对于非GET请求，返回405 Method Not Allowed
    response.writeHead(405, {'Content-Type': 'text/plain'});
    response.end('Method Not Allowed');
  }
}

// 创建HTTP服务器
const server = http.createServer(handleRequest);

// 服务器监听3000端口
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

// 错误处理
server.on('error', (error) => {
  console.error('Server error:', error);
});

// 监听未处理的请求
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// 监听未捕获的异常
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});