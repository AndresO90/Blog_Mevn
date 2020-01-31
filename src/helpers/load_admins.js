//const defaultAdmin = require('../config/keys').defaultAdmin;
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');


// Create a DataBase Middleware to check if there are admins in DB , if its empty add one admin
const checkAdmin = async () => {
    const admin = await Admin.find({}); 
    const defaultAdmin = 
    { name : 'Andrés',
     userName: 'admin',
      email:"andresAdmin@gmail.com",
       password: "123",
        job_profile: "CEO"
       }
         if(admin.length === 0) {        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(defaultAdmin.password, salt, async(err,hash) => {
                if(err) throw err;
                defaultAdmin.password = hash;      
                await Admin.insertMany(defaultAdmin, function(error, docs) {
                    if(error){console.log(error)}
                    console.log("Admin inserted : ", defaultAdmin);
                })
            });
        })
      

 
    } else {
        console.log("There are admin in DB!!");
    };
};

module.exports = checkAdmin;