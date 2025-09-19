// 代码生成时间: 2025-09-19 09:14:48
const https = require('https');
const fs = require('fs');
const url = require('url');

// 定义抓取网页内容的函数
function fetchWebContent(urlString, outputPath) {
    // 解析输入的URL
    const parsedUrl = url.parse(urlString);

    // 设置HTTPS请求选项
    const options = {
        hostname: parsedUrl.hostname,
        path: parsedUrl.path,
        method: 'GET'
    };

    // 创建HTTPS请求
    const req = https.request(options, (res) => {
        // 检查响应状态码
        if (res.statusCode === 200) {
            // 创建文件写入流
            const writeStream = fs.createWriteStream(outputPath);

            // 将响应数据写入文件
            res.pipe(writeStream);

            // 监听写入流完成事件
            writeStream.on('finish', () => {
                writeStream.close();
                console.log('网页内容已保存到:', outputPath);
            });

            // 监听写入流错误事件
            writeStream.on('error', (err) => {
                console.error('文件写入失败:', err);
            });

        } else {
            console.error('请求失败，状态码:', res.statusCode);
        }
    });

    // 监听HTTPS请求错误事件
    req.on('error', (err) => {
        console.error('HTTPS请求失败:', err);
    });

    // 发送HTTPS请求
    req.end();
}

// 主函数，用于处理命令行参数
function main() {
    if (process.argv.length < 4) {
        console.error('用法: node web_scraper.js <URL> <输出文件路径>');
        process.exit(1);
    }

    const urlString = process.argv[2];
    const outputPath = process.argv[3];

    // 调用抓取网页内容的函数
    fetchWebContent(urlString, outputPath);
}

// 程序入口点
main();