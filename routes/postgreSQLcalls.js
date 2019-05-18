var express        = require('express'),
    router         = express.Router(),
    { Client }     = require('pg');

// SHOW
router.get('/forms', (req, res) => {
    const client = new Client();
    client.connect()
        .then(() => {
            // write query stuff
            return client.query('SELECT * FROM form;');
        })
        .then((result) => {
            console.log('result', result);
            res.render('order', {result})
        })
        .catch((err) => {
            console.log('err', err);
            res.redirect('back');
            // flash message 
        });
});
// POST
router.post('/', (req, res) => {
    console.log('post body', req.body);

    const client = new Client();
    client.connect()
        .then(() => {
            console.log('connection complete!');
            // write queries 
            const sql = 'INSERT INTO form (receiver, address, postal, phone, client, acumin, name, delivery, time, signature, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)'
            const params = [req.body.receiver, req.body.address, req.body.postal, req.body.phone, req.body.client, req.body.acumin, req.body.name, req.body.delivery, req.body.time, req.body.signature, req.body.email];
            return client.query(sql, params);
        })
        .then((result) => {
            console.log('result?', result);
            res.redirect('/forms');
            // flash success 
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/forms');
            // flash error
        });
});    
// DELETE
router.post('/forms/:id', (req, res) => {
    console.log('deleting id', req.params.id);
    const client = new Client();
    client.connect()
        .then(() => {
            const sql = 'DELETE FROM form WHERE form.id = $1;'
            const params = [req.params.id];
            return client.query(sql, params);
        })
        .then((result) => {
            console.log('delete result', result);
            res.redirect('/forms');
            // flash success
        })
        .catch((err) => {
            console.log('error', err);
            res.redirect('back');
            // flash error
        }); 
});

module.exports = router;