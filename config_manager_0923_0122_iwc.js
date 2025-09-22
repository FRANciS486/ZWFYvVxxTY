// 代码生成时间: 2025-09-23 01:22:02
const fs = require('fs');
const path = require('path');

/**
 * 配置文件管理器
 * 提供配置文件的读取、写入和更新功能
 */
class ConfigManager {
  /**
   * 构造函数，初始化配置文件路径
   * @param {string} configPath 配置文件路径
   */
  constructor(configPath) {
    this.configPath = path.resolve(configPath);
  }

  /**
   * 读取配置文件
   * @returns {object} 配置文件内容
   */
  async readConfig() {
    try {
      // 检查文件是否存在
      if (!fs.existsSync(this.configPath)) {
        throw new Error('配置文件不存在');
      }
      // 读取文件内容
      const data = await fs.promises.readFile(this.configPath, 'utf8');
      // 解析JSON内容
      return JSON.parse(data);
    } catch (error) {
      // 错误处理
      console.error('读取配置文件失败:', error.message);
      throw error;
    }
  }

  /**
   * 写入配置文件
   * @param {object} configData 要写入的配置数据
   * @returns {boolean} 写入成功返回 true，否则返回 false
   */
  async writeConfig(configData) {
    try {
      // 将配置数据转换为JSON字符串
      const data = JSON.stringify(configData, null, 2);
      // 写入文件
      await fs.promises.writeFile(this.configPath, data, 'utf8');
      return true;
    } catch (error) {
      // 错误处理
      console.error('写入配置文件失败:', error.message);
      throw error;
    }
  }

  /**
   * 更新配置文件
   * @param {object} updateData 要更新的配置数据
   * @returns {boolean} 更新成功返回 true，否则返回 false
   */
  async updateConfig(updateData) {
    try {
      // 读取当前配置文件
      const config = await this.readConfig();
      // 合并更新数据
      Object.assign(config, updateData);
      // 写入更新后的配置文件
      return await this.writeConfig(config);
    } catch (error) {
      // 错误处理
      console.error('更新配置文件失败:', error.message);
      throw error;
    }
  }
}

/**
 * 示例用法
 */
(async () => {
  const configManager = new ConfigManager('./config.json');
  try {
    const config = await configManager.readConfig();
    console.log('当前配置:', config);

    // 更新配置
    const updateData = {
      'newKey': 'newValue'
    };
    const updateSuccess = await configManager.updateConfig(updateData);
    if (updateSuccess) {
      console.log('配置更新成功');
    } else {
      console.log('配置更新失败');
    }

    // 读取更新后的配置
    const updatedConfig = await configManager.readConfig();
    console.log('更新后的配置:', updatedConfig);
  } catch (error) {
    console.error('发生错误:', error.message);
  }
})();