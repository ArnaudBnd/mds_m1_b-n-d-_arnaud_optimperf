require("./config/db");

const express = require("express");
const bodyParser = require("body-parser");
const taskController = require("./controllers/TaskController");
const app = express();
const port = process.env.PORT || 3301;

app
  .use(bodyParser.urlencoded({ extended: true }));
app
  .use(bodyParser.json());
app
  .route("/tasks")
  .get(taskController.listTasks)
  .post(taskController.createTask);
app
  .route("/tasks/:id")
  .get(taskController.readTask)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);
app
  .listen(port, () => {
    console.log(`Server running: http://localhost:${port}`);
});