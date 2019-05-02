var express = require('express'),
    router  = express.Router(),
    Form    = require('../models/mongoMod/form');

router.post('/', (req, res) => {
    Form.create(req.body.form, (err, form) => {
        if (err) {
            console.log(err);
            // flash response !
        } else {
            console.log('form submitted!');
            res.redirect('back');
            // email request !
        }
    })
});

module.exports = router;