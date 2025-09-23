// 代码生成时间: 2025-09-24 04:55:15
const fs = require('fs');
const path = require('path');

// 配置文件管理器
class ConfigManager {
  // 构造函数，初始化配置文件路径和配置对象
  constructor(configPath) {
    this.configPath = configPath;
    this.config = {};
  }

  // 加载配置文件
  loadConfig() {
    try {
      const configData = fs.readFileSync(this.configPath, 'utf8');
      this.config = JSON.parse(configData);
    } catch (error) {
      console.error('Failed to load configuration:', error.message);
      throw error;
    }
  }

  // 保存配置文件
  saveConfig() {
    try {
      const configData = JSON.stringify(this.config, null, 2);
      fs.writeFileSync(this.configPath, configData);
    } catch (error) {
      console.error('Failed to save configuration:', error.message);
      throw error;
    }
  }

  // 获取配置值
  get(key) {
    return this.config[key];
  }

  // 设置配置值
  set(key, value) {
    this.config[key] = value;
  }

  // 删除配置项
  delete(key) {
    delete this.config[key];
  }
}

// 使用示例
const configPath = path.join(__dirname, 'config.json');
const configManager = new ConfigManager(configPath);

// 加载配置文件
configManager.loadConfig();

// 获取配置值
const dbHost = configManager.get('dbHost');
console.log('Database Host:', dbHost);

// 设置新的配置值
configManager.set('dbPort', 3306);

// 删除配置项
configManager.delete('unusedKey');

// 保存配置文件
configManager.saveConfig();