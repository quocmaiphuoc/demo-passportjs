const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const  FacebookStratery = require('passport-facebook')
const keys = require('./keys')
const User = require('../models/user-model')
const LocalStrategy = require('passport-local').Strategy

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
passport.use(
    new FacebookStratery({
        callbackURL: '/auth/facebook/redirect',
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret	
    },(accessToken, refreshToken, profile, done)=>{
        User.findOne({facebookId: profile.id}).then((currentUser)=>{
            if(currentUser){
                done(null,currentUser)
            } else {
                new User({
                    username: profile.displayName,
                    facebookId: profile.id,
                    avatar: profile._json.image.url
                }).save().then((newUser)=>{
                    done(null,newUser)
                })
            }
        })
        
    })
)

passport.use(new LocalStrategy((username,password,done)=>{
    const user = User.findOne(username)
    if(user && user.password === password){
        return done(null,user)
    } else {
        return done(null, false)
    }
}))