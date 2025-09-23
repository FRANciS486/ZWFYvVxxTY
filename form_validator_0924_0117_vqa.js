// 代码生成时间: 2025-09-24 01:17:47
const Joi = require('joi');

// 定义一个函数来验证表单数据
function validateFormData(data) {
  // 定义验证模式
  const schema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(18).max(99).required(),
    phone: Joi.string().pattern(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, 'three groups of numbers separated by hyphens'),
  });

  // 使用Joi模式验证数据
  return schema.validate(data);
}

// 用于测试表单验证功能的示例
const formData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  age: 30,
  phone: '123-456-7890',
};

validateFormData(formData)
  .then(result => {
    console.log('Validation success:', result.value);
  })
  .catch(err => {
    console.error('Validation error:', err.details);
  });
