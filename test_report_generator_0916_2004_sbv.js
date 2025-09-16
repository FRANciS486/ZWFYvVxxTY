// 代码生成时间: 2025-09-16 20:04:18
const fs = require('fs');
const path = require('path');

/**
 * 测试报告生成器
 * @class TestReportGenerator
 */
class TestReportGenerator {

  constructor(outputDir) {
    // 确保输出目录存在
    this.outputDir = outputDir;
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * 生成测试报告
   * @param {object} testResults - 测试结果对象
   * @param {string} testName - 测试名称
   * @returns {Promise} - 报告文件路径
   */
  async generateReport(testResults, testName) {
    try {
      const reportFilePath = path.join(this.outputDir, `${testName}_report.md`);
      const reportContent = this.createReportContent(testResults);
      fs.writeFileSync(reportFilePath, reportContent);
      return reportFilePath;
    } catch (error) {
      console.error('Error generating test report:', error);
      throw error;
    }
  }

  /**
   * 创建报告内容
   * @param {object} testResults - 测试结果对象
   * @returns {string} - 报告内容
   */
  createReportContent(testResults) {
    let content = `# ${testResults.testName} Test Report

| Test Case | Result |
| --- | --- |
`;
    testResults.tests.forEach(test => {
      content += `| ${test.name} | ${test.result} |
`;
    });
    return content;
  }
}

// 示例用法
const testResults = {
  testName: 'Sample Test',
  tests: [
    { name: 'Test 1', result: 'Passed' },
    { name: 'Test 2', result: 'Failed' },
  ]
};

(async () => {
  const generator = new TestReportGenerator('./reports');
  try {
    const reportPath = await generator.generateReport(testResults, testResults.testName);
    console.log(`Test report generated at: ${reportPath}`);
  } catch (error) {
    console.error('Failed to generate test report:', error);
  }
})();