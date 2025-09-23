// 代码生成时间: 2025-09-23 10:57:43
const https = require('https');
const cheerio = require('cheerio');
const fs = require('fs');
const util = require('util');

// 异步文件写入函数，使用 promises
const writeFileAsync = util.promisify(fs.writeFile);

/**
 * 抓取网页内容的函数
 * @param {string} url - 要抓取的网页 URL
 * @returns {Promise<string>} - 包含网页内容的 Promise
 */
async function scrapeWebContent(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(`Server responded with status code: ${response.statusCode}`);
        return;
      }

      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve(data);
      });

      response.on('error', (error) => {
        reject(`Error fetching the page: ${error.message}`);
      });
    });
  });
}

/**
 * 使用 Cheerio 解析 HTML 并提取内容
 * @param {string} html - 网页的 HTML 内容
 * @param {string} selector - 要提取内容的选择器
 * @returns {string} - 提取的内容
 */
function parseHtmlContent(html, selector) {
  const $ = cheerio.load(html);
  return $(selector).text().trim();
}

/**
 * 主函数，负责调用抓取和解析函数，并保存结果
 * @param {string} url - 网页的 URL
 * @param {string} selector - 要提取内容的选择器
 * @param {string} outputPath - 结果保存的文件路径
 * @returns {Promise<void>} - 完成保存操作的 Promise
 */
async function main(url, selector, outputPath) {
  try {
    // 抓取网页内容
    const htmlContent = await scrapeWebContent(url);

    // 解析 HTML 并提取内容
    const content = parseHtmlContent(htmlContent, selector);

    // 将提取的内容写入文件
    await writeFileAsync(outputPath, content);

    console.log(`Content successfully saved to ${outputPath}`);
  } catch (error) {
    console.error(`Failed to scrape content: ${error.message}`);
  }
}

// 调用主函数
main('https://example.com', 'body', './output.txt');