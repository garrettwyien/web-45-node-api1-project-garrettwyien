// BUILD YOUR SERVER HERE
const express = require('express');
const ModelHelper = require('./users/model')
const server = express();
server.use(express.json());


server.get('/', ( req, res ) => {
    res.status(200).json({message: 'hello world'})
});
server.get('/api/users', async ( req, res ) => {
    ModelHelper.find()
    .then(users => {
            res.status(200).json(users)
        })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: err.message})
    })
});
server.get('/api/users/:id', async ( req, res ) => {
    ModelHelper.findById(req.params.id)
    .then(user => {
        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: 'user not found'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: err.message})
    })
});
server.post('/api/users', async ( req, res ) => {
    const newUser = req.body;
    ModelHelper.insert(newUser)
    .then(user => {
            res.status(201).json(user)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: err.message})
    })
});
server.put('/api/users/:id', async ( req, res ) => {
    const { id } = req.params;
    const changes = req.body;
    try{ 
        const result = await ModelHelper.update(id, changes)
        res.status(200).json(result)
    } catch(err) {
        console.log(err)
        res.status(500).json({message: err.message})
    }
});
server.delete('/api/users/:id', async ( req, res ) => {
    ModelHelper.remove(req.params.id)
    .then(user => {
        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: `user ${req.params.id} was not found`})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: err.message})
    })
});

module.exports = server // EXPORT YOUR SERVER instead of {}

