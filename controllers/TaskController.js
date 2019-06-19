const Task = require("../models/Task");

/**
  * List all Tasks
  * @param {Object} req, res
  * @return {Json} response
  */
exports.listTasks = (req, res) => {
  Task.find({}, (err, task) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(task);
  });
};

/**
  * Create Task
  * @param {Object} req, res
  * @return {Json} response
  */
exports.createTask = (req, res) => {
  let newTask = new Task(req.body);
  newTask.save((err, task) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(task);
  });
};

/**
  * Read Task
  * @param {Object} req, res
  * @return {Json} response
  */
exports.readTask = (req, res) => {
  Task.findById(req.params.id, (err, task) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(task);
  });
};

/**
  * Update Task
  * @param {Object} req, res
  * @return {Json} response
  */
exports.updateTask = (req, res) => {
  Task.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, task) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(task);
    }
  );
};

/**
  * Delete a Task
  * @param {Object} req, res
  * @return {Json} response
  */
exports.deleteTask = (req, res) => {
  Task.remove({ _id: req.params.id }, (err, task) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Deleted Task" });
  });
};