const router = require('express').Router();
const passport = require('passport');

router.route('/login').get(function(req, res) {
    res.render('login', {user: req.user});
}).post(passport.authenticate('local',{failureRedirect:'/login', successRedirect:'/profile/'}))

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
})

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/profile/')
})

router.get('/facebook', passport.authenticate('facebook', {
    scope: ['profile']
}));

router.get('/facebook/redirect',passport.authenticate('facebook'),(req,res)=>{
    res.redirect('/profile/')
})

module.exports = router;
