// 代码生成时间: 2025-09-19 16:16:28
const os = require('os');
const process = require('process');

/**
 * 获取当前系统内存使用情况
 * @returns {Promise<Object>} 内存使用情况对象
 */
async function getMemoryUsage() {
  // 检查操作系统是否支持内存信息
  if (!os.totalmem || !os.freemem) {
    throw new Error('The operating system does not support memory information retrieval.');
  }
  
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  
  return {
    totalMemory,
    freeMemory,
    usedMemory
  };
}

/**
 * 主程序入口，打印内存使用情况
 */
async function main() {
  try {
    const memoryUsage = await getMemoryUsage();
    console.log('Memory Usage:', memoryUsage);
  } catch (error) {
    console.error('Error retrieving memory usage:', error.message);
  }
}

// 运行主程序
main();
