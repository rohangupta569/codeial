const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//use for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


app.use(express.urlencoded());

app.use(cookieParser());


//use the static files
app.use(express.static('./assets'));
//use express ejs layout {used before routes because we have to tell the views in the routes that we have used layout}
app.use(expressLayouts);

//extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');


app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// use express router
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is up and running on port : ${port}`);
});