// 代码生成时间: 2025-09-17 03:31:42
// image_size_adjuster.js

// 导入必要的模块
const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

/**
 * 调整图片尺寸
 * @param {string} folderPath 图片所在文件夹的路径
 * @param {number} width 新的图片宽度
 * @param {number} height 新的图片高度
 * @param {string} outputFolder 输出调整后图片的文件夹路径
 */
async function resizeImages(folderPath, width, height, outputFolder) {
  // 检查输出文件夹是否存在，如果不存在则创建
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }

  // 读取文件夹内所有文件
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);

    // 检查文件是否是图片
    if (path.extname(file).toLowerCase() === '.jpg' || path.extname(file).toLowerCase() === '.jpeg' || path.extname(file).toLowerCase() === '.png') {
      try {
        // 读取图片文件
        const image = await Jimp.read(filePath);

        // 调整图片尺寸
        image.resize(width, height).write(path.join(outputFolder, file));

        console.log(`图片 ${file} 尺寸已调整为 ${width}x${height}`);
      } catch (error) {
        console.error(`调整图片 ${file} 时发生错误：${error.message}`);
      }
    }
  }
}

// 使用示例
const inputFolderPath = './input'; // 输入文件夹路径
const outputFolderPath = './output'; // 输出文件夹路径
const targetWidth = 800; // 目标宽度
const targetHeight = 600; // 目标高度

resizeImages(inputFolderPath, targetWidth, targetHeight, outputFolderPath)
  .then(() => console.log('所有图片尺寸调整完成'))
  .catch(error => console.error('处理图片时发生错误：', error.message));