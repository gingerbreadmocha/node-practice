require('./db');

const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const Todo = mongoose.model('Todo');

app.set('view engine', 'ejs');
app.use( logger( 'dev' ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.get('/', (req, res) => {
    res.render('index', {
        title : 'Pooh and Elmo are buds'
    });
})

app.post('/create',(req,res ) => {
    new Todo({
        content : req.body.content,
        updated_at : Date.now()
    }).save((err, todo , count) => {
        res.redirect( '/' );
    });
})

app.get('/lists',(req, res) => {
    Todo.find((err, todos, count) =>{
        res.render('lists',{
            title: `Elmo's To-do List`,
            todos : todos
        });
    });
})

app.get('/destroy/:id' ,(req,res) => {
    Todo.findById(req.params.id, (err, todo) => {
        todo.remove((err, todo) => {
            res.redirect('/');
        });    
    });
});

app.get('/edit/:id', (req, res) => {
    Todo.findById(req.params.id, (err, todo) =>{
        res.render('edit',{
            title : `Elmo's Edit`,
            todo : todo
        });
    });
});

app.post('/update/:id', (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        todo.content = req.body.content;
        todo.updated_at = Date.now();
        todo.save((err, todo, count) => {
            res.redirect('/lists');
        });
    });
});

app.listen(3000, _ => {
    console.log('Example app listening on port 3000!')
})