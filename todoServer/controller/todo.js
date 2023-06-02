const Todo = require("../model/todo");

// const getAdd = async (req, res) => {
function getAdd(req, res) {
    console.log("jfdjgfdhg")
    const createData = {
        todoname: req.body.todoname,
        // author: req.body.author,
        // description: req.body.description,
    }
    console.log(createData);
    Todo.create(createData).then((reuslt) => {
        res.status(200).json({
            massage: " add successfully",
            post: reuslt,
        })
    }).catch((error) => {
        res.status(400).json({
            massage: "is invalid data ",
            post: error
        })
    })
}

// get all data    
function getAlltodo(req, res) {
    console.log("gfhjgf")
    Todo.find().then((result) => {
        res.status(200).json(result)
    }).catch((error) => {
        res.status(400).json({
            massage: "is invalid data ",
            post: error
        })
    })

}

// update todo
function getUpdateTodo(req, res) {
    console.log('dfn'); const id = req.params.id;
    console.log(id);
    const updateData = {
        todoname: req.body.todoname,
    };

    Todo.findByIdAndUpdate(id, updateData)
        .then((result) => {
            res.status(200).json({
                message: "update successfully",
                data: result
            });
        })
        .catch((error) => {
            res.status(400).json({
                message: "invalid data",
                error: error
            });
        });
}
// delete 
function getDeleteTodo(req, res) {
    const id = req.params.id
    Todo.findByIdAndDelete(id).then((result) => {
        res.status(200).json({
            massage: "delete successfully",
            post:result
        })
    }).catch((error) => {
        res.status(400).json({
            massage: "is invalid data",
            post: error
        })
    })

}
function getOnetodo (req, res) {
    const id = req.params.id
    console.log(id)
    Todo.findOne().then((result) => {
        // console.log(result)
        res.status(200).json(result)
    }).catch((error) => {
        res.status(400).json({
            massage: "is invalid data ",
            post: error
        })
    })
}
module.exports = {
    getAdd: getAdd,
    getAlltodo: getAlltodo,
    getUpdateTodo: getUpdateTodo,
    getDeleteTodo: getDeleteTodo,
    getOnetodo:getOnetodo
};