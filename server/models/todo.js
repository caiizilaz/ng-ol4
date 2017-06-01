const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  success: {
    type: Boolean,
    default: false
  }
})
const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;