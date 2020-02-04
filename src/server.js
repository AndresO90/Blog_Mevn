const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const passport = require('passport');
const checkOffWords = require('./helpers/offWordValidator').checkOffWords;
const defaultAdmin = require('./helpers/load_admins');

// Initialize the app
const app = express();

//Middlewares

// Form Data Middleware
app.use(bodyParser.urlencoded({      
    extended: false
}));

// Json Body Middleware
app.use(bodyParser.json());  
        
// Cors Middleware
app.use(cors()); 
// Multer middleware
app.use(multer({dest: path.join(__dirname,'public/uploads/temp') }).single('image')); // configurar multer con el destino de las imagenes y le decimos single de una sola imagen que puedan subir, cuando llame a image puedo ver info de la imagen
       
// Use the passport Middleware
app.use(passport.initialize());  
app.use(passport.session());   

// Create a custom Middleware function
    const checkUserType = function (req, res, next) {
    const userType = req.originalUrl.split('/')[1];
    // Bring in the Passport Strategy
    require('./config/passportConfig').tokenStr(userType,passport);
    next();
}
app.use(checkUserType);

// Seting up the static directory
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));


// Bring in the Database Config and connect with DB
mongoose.set('useCreateIndex', true);   //*****NEW**** 
const db = require('./config/keys');
mongoose.connect(db.mongoURL, { useNewUrlParser: true ,useUnifiedTopology: true,useFindAndModify: false})
.then(checkOffWords())
.then(defaultAdmin())
.then(()=> { console.log("MongoDB is Connect!!") })
.catch(err => console.log(err,"Unable to connect with Db"));


// Bring in the Users route
const users = require('./routes/users');
app.use(users);
// Bring in the Admins route
const admins = require('./routes/admin');
app.use(admins);
// Bring in the Public's routes
const publicRoutes = require('./routes/publicRouters');

app.use(publicRoutes);

module.exports=app;