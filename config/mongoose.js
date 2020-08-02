const mongoose = require('mongoose');

// mongoose.connect('');
mongoose.connect('mongodb+srv://Prady2006:12345@cluster0-44hjv.mongodb.net/codeial?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;