const router = require('express').Router();
const passport = require('passport');

router.get('/login', function(req, res) {
    res.render('login', {user: req.user});
})

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

module.exports = router;
