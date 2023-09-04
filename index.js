const express = require('express');
const expressLayout = require('express-ejs-layouts');
const app = express();
const port = 8000;

//including mongodb configuration
const db = require('./config/mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
app.use(express.urlencoded({extended: true}));

app.set('view engine','ejs');
app.set('views','./views');
app.use(expressLayout);

// middleware for static file accessing in assets directory
app.use(express.static('./assets'))

app.use(session({
    name:'PlacementCell',
    secret: "testpurpose App",
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: mongoStore.create({
        mongoUrl: 'mongodb://0.0.0.0/placementApp',
        ttl: 14 * 24 * 60 * 60
    })
}))
app.use(passport.initialize());
app.use(passport.session());

// router
app.use('/',require('./route/index'));
app.listen(port, function(error){
    if(error){
        console.log("Error in running Server");
    }
    console.log(`server is running on ${port}`);
})
