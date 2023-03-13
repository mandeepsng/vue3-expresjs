const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:5173'
};
  app.use(cors(corsOptions));

let tasks = [
  { id: 1, title: 'Task 1' },
  { id: 2, title: 'Task 2' },
];

app.get('/api/tasks', (req, res) => {
  res.send(tasks);
});

app.post('/api/tasks', (req, res) => {
  const task = {
    id: tasks.length + 1,
    title: req.body.title,
  };
  tasks.push(task);
  res.send(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
