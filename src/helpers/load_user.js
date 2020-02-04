const User = require('../models/Users');
const bcrypt = require('bcryptjs');


// Create a DataBase Middleware to check if there are admins in DB , if its empty add one admin
const checkUser = async () => {
    const user = await User.find({}); 
    const defaultUser = 
    { name : 'UsuarioDePrueba',
     userName: 'blogUser',
      email:"blogUser@gmail.com",
       password: "123",
       }
         if(user.length === 0) {        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(defaultUser.password, salt, async(err,hash) => {
                if(err) throw err;
                defaultUser.password = hash;      
                await User.insertMany(defaultUser, function(error, docs) {
                    if(error){console.log(error)}
                    console.log("User inserted : ", defaultUser);
                })
            });
        })
    } else {
        console.log("There are users in DB!!");
    };
};

module.exports = checkUser;