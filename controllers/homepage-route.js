const router = require("express").Router();
const { response } = require("express");

router.get('/', async (req, res) => {
    try {
        res.render('homepage', {  logged_in: req.session.logged_in });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/login',  (req, res) => {
   if (req.session.logged_in) {
    res.redirect('/dashboard');
   }

       res.render('login');
   
   
});

router.get('/signup',  (req, res) => {
    if (req.session.logged_in) {
     res.redirect('/dashboard');
    }
 
        res.render('createaccount');
    
    
 });

module.exports = router;