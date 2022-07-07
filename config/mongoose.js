const mongoose = require('mongoose');
const env = require('./environment');

//mongoose.connect(`mongodb://localhost/${env.db}`, {useNewUrlParser: true, useUnifiedTopology: true});
const uri = "mongodb+srv://rohangupta569:mongodb@1234@cluster0.4jubb.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error',console.error.bind(console , 'Error connecting to mongo db'));

db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;