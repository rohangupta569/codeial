const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

//use the static files
app.use(express.static('./assets'));
//use express ejs layout {used before routes because we have to tell the views in the routes that we have used layout}
app.use(expressLayouts);

// use express router
app.use('/',require('./routes'));

//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');



app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is up and running on port : ${port}`);
});