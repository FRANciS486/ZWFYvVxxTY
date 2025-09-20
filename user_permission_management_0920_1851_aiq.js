// 代码生成时间: 2025-09-20 18:51:57
const fs = require('fs');
const path = require('path');

// 用户权限管理系统
class UserPermissionManager {
  // 构造函数，初始化权限数据文件路径
  constructor(filePath) {
    this.filePath = filePath;
  }

  // 加载权限数据
  async loadPermissions() {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf8');
      this.permissions = JSON.parse(data);
    } catch (error) {
      console.error('Failed to load permissions:', error);
      throw error;
    }
  }

  // 保存权限数据
  async savePermissions() {   
    try {
      const data = JSON.stringify(this.permissions, null, 2);
      await fs.promises.writeFile(this.filePath, data, 'utf8');
    } catch (error) {
      console.error('Failed to save permissions:', error);
      throw error;
    }
  }

  // 添加用户权限
  async addUserPermission(userId, permission) {
    if (!this.permissions.hasOwnProperty(userId)) {
      this.permissions[userId] = [];
    }
    this.permissions[userId].push(permission);
    await this.savePermissions();
  }

  // 删除用户权限
  async removeUserPermission(userId, permission) {
    if (this.permissions.hasOwnProperty(userId)) {
      const index = this.permissions[userId].indexOf(permission);
      if (index > -1) {
        this.permissions[userId].splice(index, 1);
        await this.savePermissions();
      }
    }
  }

  // 获取用户权限
  async getUserPermissions(userId) {
    if (this.permissions.hasOwnProperty(userId)) {
      return this.permissions[userId];
    } else {
      return [];
    }
  }
}

// 示例用法
const permissionManager = new UserPermissionManager(path.join(__dirname, 'permissions.json'));
(async () => {
  try {
    await permissionManager.loadPermissions();
    await permissionManager.addUserPermission('user1', 'read');
    await permissionManager.addUserPermission('user1', 'write');
    console.log(await permissionManager.getUserPermissions('user1'));
    // ['read', 'write']
    await permissionManager.removeUserPermission('user1', 'write');
    console.log(await permissionManager.getUserPermissions('user1'));
    // ['read']
  } catch (error) {
    console.error('Error:', error);
  }
})();