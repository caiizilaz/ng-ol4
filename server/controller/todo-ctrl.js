const Todo = require('../models/todo');

let TodoCtrl = {
  addItem(req, res, next) {
    let newItem = new Todo({
      item: req.body.item
    })
    newItem.save((err, todo) => {
      if (err) {
        res.json({ success: false, msg: 'Failed to add item' });
      } else {
        this.getAll((err, todo) => {
          res.json({ success: true, msg: 'Added item success', todo: todo });
        });
      }
    });
  },
  deleteItem(req, res, next) {
    Todo.remove({ _id: req.params.id }, (err, todo) => {
      if (err) {
        res.json({ success: false, msg: 'Failed to delete item' });
      } else {
        this.getAll((err, todo) => {
          res.json({ success: true, msg: 'Deleted item success', todo: todo });
        });
      }
    });
  },
  getAll(callback) {
    Todo.find({}, callback);
  },
  updateItem(req, res, next) {
    Todo.findOneAndUpdate({ _id: req.body._id }, { success: req.body.success }, (err, todo) => {
      if (err) {
        throw err;
      } else {
        this.getAll((err, todo) => {
          res.json({ todo: todo });
        });
      }
    });
  }
}

module.exports = TodoCtrl;