const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/user-model')

//Mã hóa thông tin user
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
//giải mã
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
})

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret	
    },(accessToken, refreshToken, profile, done)=>{
        User.findOne({googleId: profile.id}).then((currentUser)=>{
            if(currentUser){
                done(null,currentUser)
            } else {
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    avatar: profile._json.image.url
                }).save().then((newUser)=>{
                    done(null,newUser)
                })
            }
        })
        
    })
)