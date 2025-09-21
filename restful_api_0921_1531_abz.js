// 代码生成时间: 2025-09-21 15:31:54
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the RESTful API service!');
});

// Route to handle GET requests for resources
app.get('/resources', (req, res) => {
  // Simulate fetching resources from a database
  const resources = ['Resource1', 'Resource2', 'Resource3'];
  res.status(200).json(resources);
});

// Route to handle POST requests for creating new resources
app.post('/resources', (req, res) => {
  // Validate and sanitize input data
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Resource name is required' });
  }

  // Simulate creating a new resource
  const newResource = { name, id: Date.now() };
  res.status(201).json(newResource);
});

// Route to handle GET requests for a specific resource
app.get('/resources/:id', (req, res) => {
  const { id } = req.params;
  // Simulate fetching a specific resource from a database
  const resource = { id, name: `Resource${id}` };
  res.status(200).json(resource);
});

// Route to handle PUT requests for updating a specific resource
app.put('/resources/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Resource name is required' });
  }
  // Simulate updating a specific resource
  const updatedResource = { id, name };
  res.status(200).json(updatedResource);
});

// Route to handle DELETE requests for deleting a specific resource
app.delete('/resources/:id', (req, res) => {
  const { id } = req.params;
  // Simulate deleting a specific resource
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});