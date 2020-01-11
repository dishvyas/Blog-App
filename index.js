const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const config = require('./config.js');
const mongoose = require('mongoose');
 
// DB connection
mongoose.Promise = global.Promise;
const url = 'mongodb://user:qwerty1998@ds347917.mlab.com:47917/heroku_504sw3bd';
// const url = process.env.DB_CONNECTION1
mongoose.connect(url, { useNewUrlParser: true })
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

const blogs = require('./models/blogs')
const blog = require('./controllers/blog-controller')
const comment = require('./controllers/comment-controller')

const users = require('./models/users')
const user = require('./controllers/user-controller')

app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
  res.send('Welcome to Blog Services!')
})
app.post('/blogs', blog.create)

app.get('/blogs', blog.findAll)

app.get('/blogs/:blogId', blog.findOne)  

app.put('/blogs/:blogId', blog.update)

app.delete('/blogs/:blogId', blog.delete)

app.post('/user', user.create)

app.get('/users', user.findAll)

app.get('/users/:userId', user.findOne)  

app.put('/users/:userId', user.update)

app.post('/blogs/:blogId/comment', comment.create)

app.post('/blogs/:blogId/like', blog.like)

app.post('/users/:userId/profile', user.pcreate)

app.get('/register',function(req,res) {
  res.sendFile('./templates/register.html', { root: __dirname });
});

app.get('/login',function(req,res) {
  res.sendFile('./templates/login.html', { root: __dirname });
});

app.get('/front', function(req,res){
  res.sendFile('./templates/navbar.html', { root: __dirname });
});

app.get('/index', function(req,res){
  res.sendFile('./templates/index.html', { root: __dirname });
});

app.get('/blog', function(req,res){
  res.sendFile('./templates/blog.html', { root: __dirname });
});

app.get('/createblog', function(req,res){
  res.sendFile('./templates/createblog.html', { root: __dirname });
});

app.get('/usercard', function(req,res){
  res.sendFile('./templates/profilecard.html', { root: __dirname });
});

app.listen(config.serverport, () => {
    console.log("Server is listening on port 3000");
});