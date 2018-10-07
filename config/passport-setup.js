/*=====
this file is used to make the login functions, in this case is using google strategy to login into the application using passport, the keys are imported as a json format from a different folder for extra security.
=====*/

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-models');

passport.serializeUser((user, done) => {

    done(null, user.id);

});

passport.deserializeUser((id, done) => {

    User.findById(id).then((user) => {

        done(null, user);

    });

});

passport.use(
    new GoogleStrategy({

    callbackURL:'/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret

}, (accessToken, refreshToken, profile, done) => {

    User.findOne({googleId: profile.id}).then((currentUser) => {

        if(currentUser) {

            done(null, currentUser);

        } else {

            new User({

                username: profile.displayName,
                googleId: profile.id,
                thumbnail: profile._json.image.url
        
            }).save()
              .then((newUser) => {
        
                done(null, newUser);
        
              });

        }

    });
    

})

);