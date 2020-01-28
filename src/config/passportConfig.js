const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/Users');
const Admin = require('../models/Admin');

const key = require('./keys').secret;

const opts = {};
    // Extract Token
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('jwt');
    // Set our secret key
opts.secretOrKey = key;

module.exports ={
    tokenStr: (userType, passport) => {
     passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
           if(userType == 'admin') {
            const admin = await Admin.findById(jwt_payload._id)
                if (admin) return done(null, admin);
                return done(null, false);
           };
           if(userType == 'users') {
            const user = await User.findById(jwt_payload._id)
                if (user) return done(null, user);
                return done(null, false);
           };
        })
    )
}
}