const express = require('express')
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')
const profileRoutes = require('./routes/profile-routers')

const app = express();

app.use(express.static('public'));
//set up view ejs
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cokkieKey],
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth',authRoutes);
app.use('/profile/',profileRoutes);
app.get('/',(req,res)=>{
    res.render('home',{user: req.user})
})

//connect database
mongoose.connect(keys.mongodb.mongoURI,()=>{
    console.log('connect database');
});

app.listen(3000,()=>{
    console.log(`Server is running on the port 3000`);
})