const router = require("express").Router();
const { response } = require("express");

router.get('/', async (req, res) => {
    try {
        res.render('homepage');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;