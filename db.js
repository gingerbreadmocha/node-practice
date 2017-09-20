let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Todo = new Schema({
    user_id : String,
    content : String,
    updated_at : Date
});

mongoose.model('Todo', Todo);
mongoose.connect( 'mongodb://localhost/express-todo');