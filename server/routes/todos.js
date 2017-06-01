const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const TodoCtrl = require('../controller/todo-ctrl');

router.post('/create', (req, res, next) => {
  TodoCtrl.addItem(req, res, next);
});

router.get('/read', (req, res, next) => {
  Todo.find({}, (err, todo) => {
    res.json(todo);
  })
});

router.put('/update', (req, res, next) => {
  TodoCtrl.updateItem(req, res, next);
})

router.delete('/delete/:id', (req, res, next) => {
  TodoCtrl.deleteItem(req, res, next);
});

module.exports = router;