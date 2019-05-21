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
            console.log('GET result: ', {
                form: result.rows
            });
            res.render('order', {
                form: result.rows
            });
        })
        .catch((err) => {
            console.log('GET err', err);
            res.redirect('back');
        });
});
// POST
router.post('/', (req, res) => {
    console.log('post body', req.body);
    const client = new Client();
    client.connect()
        .then(() => {
            const sql = 'INSERT INTO form (receiver, address, postal, phone, client, acumin, name, delivery, time, signature, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)'
            const params = [req.body.receiver, req.body.address, req.body.postal, req.body.phone, req.body.client, req.body.acumin, req.body.name, req.body.delivery, req.body.time, req.body.signature, req.body.email];
            return client.query(sql, params);
        })
        .then((result) => {
            console.log('POST result', result);
            res.redirect('/forms');
        })
        .catch((err) => {
            console.log('POST error', err);
            res.redirect('/forms');
        });
});    
// EDIT 
router.get('/forms/edit/:id', (req, res) => {
    const client = new Client();
    client.connect()
        .then(() => {
            const sql = 'SELECT * FROM form WHERE form.id = $1;'
            const params = [req.params.id];
            return client.query(sql, params);
        })
        .then((result) => {
            console.log('EDIT result: ', result);
            // to handle the possibility that one were to modify the id in the url
            if(result.rowCount === 0) {
                console.log('Id has no corresponding Row: ', result.rowCount);
                res.redirect('/forms');
                // we return here to end the request - so as not to run code below
                return;
            };

            res.render('edit', {
                form: result.rows[0]
            });
        })
        .catch((err) => {
            console.log('EDIT error: ', err);
            res.redirect('back');
        });
});
// UPDATE 
router.put('/forms/:id', (req, res) => {
    
    const client = new Client();
    client.connect()
        .then(() => {
            const sql = 'UPDATE form SET receiver = $1, address = $2, postal = $3, phone = $4, client = $5, acumin = $6, name = $7, delivery = $8, time = $9, signature = $10, email = $11 WHERE form.id = $12';
            const params = [req.body.receiver, req.body.address, req.body.postal, req.body.phone, req.body.client, req.body.acumin, req.body.name, req.body.delivery, req.body.time, req.body.signature, req.body.email, req.params.id];
            client.query(sql, params);
        })
        .then((result) => {
            console.log('UPDATE result:', result);
            res.redirect('/forms');
        })
        .catch((err) => {
            console.log(('UPDATE error: ', err));
            res.redirect('back');
        });
});
// DELETE
router.delete('/forms/:id', (req, res) => {
    const client = new Client();
    client.connect()
        .then(() => {
            const sql = 'DELETE FROM form WHERE form.id = $1;'
            const params = [req.params.id];
            return client.query(sql, params);
        })
        .then((result) => {
            console.log('DELETE result', result);
            res.redirect('/forms');
        })
        .catch((err) => {
            console.log('DELETE error', err);
            res.redirect('back');
        }); 
});

module.exports = router;