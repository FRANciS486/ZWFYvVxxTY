// 代码生成时间: 2025-10-02 20:50:44
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Define a class to manage software packages
class PackageManager {
  // Constructor to initialize the PackageManager
  constructor() {
    this.packagesDir = path.join(__dirname, 'packages'); // Directory to store packages
  }

  // Install a package
  install(package) {
    return new Promise((resolve, reject) => {
      try {
        // Check if the package directory exists, if not create it
        if (!fs.existsSync(this.packagesDir)) {
          fs.mkdirSync(this.packagesDir);
        }

        // Use child_process to run npm install command
        exec(`npm install ${package}`, (error, stdout, stderr) => {
          if (error) {
            reject(new Error(`Installation failed: ${error.message}`));
          } else if (stderr) {
            reject(new Error(`Installation failed: ${stderr}`));
          } else {
            resolve(`Package ${package} installed successfully`);
          }
        });
      } catch (error) {
        reject(new Error(`Error installing package: ${error.message}`));
      }
    });
  }

  // Uninstall a package
  uninstall(package) {
    return new Promise((resolve, reject) => {
      try {
        // Use child_process to run npm uninstall command
        exec(`npm uninstall ${package}`, (error, stdout, stderr) => {
          if (error) {
            reject(new Error(`Uninstallation failed: ${error.message}`));
          } else if (stderr) {
            reject(new Error(`Uninstallation failed: ${stderr}`));
          } else {
            resolve(`Package ${package} uninstalled successfully`);
          }
        });
      } catch (error) {
        reject(new Error(`Error uninstalling package: ${error.message}`));
      }
    });
  }
}

// Example usage of PackageManager
const packageManager = new PackageManager();

// Install a package
packageManager.install('express').then(
  message => console.log(message),
  error => console.error(error)
);

// Uninstall a package
packageManager.uninstall('express').then(
  message => console.log(message),
  error => console.error(error)
);