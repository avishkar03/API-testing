const express = require('express');
const app = express();
app.use(express.json());


let tasks = [
  { id: 1, title: 'Buy groceries' },
  { id: 2, title: 'Complete project' },
  { id: 3, title: 'Go to the gym' },
];


app.get('/tasks', (req, res) => {
  res.json(tasks);
});


app.post('/tasks', (req, res) => {
  const { title } = req.body;
  
  console.log("recieved="+req.body)
  const newTask = { id: tasks.length + 1, title };
  tasks.push(newTask);
  res.status(201).json(newTask);
});


app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title } = req.body;

  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.title = title;
  res.json(task);
});


app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
