const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    todoname: {
        type: "String",
        required: true,
    },
     author: {
        type: "String",
        required: true,
    },
    description: {
        type: "String",
    },
});

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;