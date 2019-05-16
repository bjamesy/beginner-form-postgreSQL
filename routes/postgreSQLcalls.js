var express        = require('express'),
    router         = express.Router(),
    { Client }     = require('pg');

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
            res.redirect('back');
            // flash success 
        })
        .catch((err) => {
            console.log(err);
            res.redirect('back');
            // flash error
        });
});    

module.exports = router;