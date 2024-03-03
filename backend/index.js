const express = require('express')
const cors = require('cors')

const { createTodo, updateTodo } = require('./types')
const { todo } = require('./db')
const app = express()

app.use(express.json())
app.use(cors())

app.post('/todo', async (req, res) => {
    const createPayload = req.body
    const parsedPayload = createTodo.safeParse(createPayload)
    
    if(!parsedPayload.success){
        res.status(411).json({
            message: "Invalid inputs"
        })
        return
    }
    
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false,
    })
    res.json({
        message: "Todo created",
    })
})

app.get('/todos', async (req, res) => {
    const todos = await todo.find({})
    res.json({         // promise
        todos
    })      
})

app.put('/done', async (req, res) => {
    const updatePayload = req.body
    const parsedPayload = updateTodo.safeParse(updatePayload)

    if(!parsedPayload.success){
        res.status(411).json({
            message: "Invalid inputs"
        })
        return
    }
    await todo.update({
        _id: req.body.id,
    },{
        completed: true
    })
    res.json({
        message: "Marked as Completed"
    })
})

app.listen(3000, () => {    
    console.log("Server is running on port 3000")
})