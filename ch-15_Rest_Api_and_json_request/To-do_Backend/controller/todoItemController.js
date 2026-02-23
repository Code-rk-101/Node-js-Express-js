const todoItems = require("../Models/todoItems");


exports.createTodoItem = async (req,res,next)=>
{
    console.log(req.body);
    const {task,date} = req.body;
    try
    {
        const todoItem = new todoItems({task,date});
        await todoItem.save();
        res.status(201).json(todoItem);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({message: "Error while creating todo item"});
        return;
    }
    
}
exports.getTodoItem = async(req,res,next)=>
{
    const itemList = await todoItems.find();
    res.status(201).json(itemList);
};

exports.deleteTodoItem = async(req,res,next)=>
{
    const id = req.params.id;
    try
    {
        const deletedItem = await todoItems.findByIdAndDelete(id);
        res.status(201).json(deletedItem._id);
    }
    catch(err)
    {
        res.status(500).send({message: "Error during Item Deletion"});
    }
};

exports.completedTodoItem = async(req,res,next)=>
{
    const id = req.params.id;
    try
    {
        const updatedItem = await todoItems.findByIdAndUpdate(id,{completed:true});
        res.status(201).json(updatedItem);
    }
    catch(err)
    {
        res.status(500).send({message: "Error during Item Completion"});
    }
};