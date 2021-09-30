var express = require('express');
var dotenv = require('dotenv');
var ejs = require('ejs');
var path = require('path');
const morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo');
var app = express();

//Database connection
mongoose.connect('Enter your db link here',{
    useNewUrlParser: true
}, (err)=>{
    if(err) throw err;
    else {console.log('Database connection successfull')}
});

var db = mongoose.connection;
db.on('err',console.error.bind(console,'connection error'));
db.once('open',function(){
});


//Configuring PORT
dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

//log msg
app.use(morgan('tiny'));

//dont know yyy
app.use(session({
    secret: 'Learninggg',
    resave:true,
    saveUninitialized:false,
    store:MongoStore.create({
        mongoUrl: 'Enter your db link here'
    })
}));

//Setting view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//Loading assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(__dirname + '/views'));

//Routes setting
app.use('/', require('./routes/router'))
var index = require('./routes/index');
app.use('/',index);


//Catching 404 and forwarding to handler

app.use(function(req,res,next){
    var err=new Error('File not found');
    err.status=404;
    next(err);
}); 

//Error handler
app.use(function(err,req,res,next){
    res.send(err.message);
});

//Connecting with Db
app.listen(PORT,function(){
    console.log(`Server is running on http://localhost:${PORT}`);
});
