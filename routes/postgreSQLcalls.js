var express = require('express'),
    router  = express.Router();

router.post('/', (req, res) => {
    console.log('post body', req.body);

    const client = new Client();
    client.connect()
        .then(() => {
            console.log('connection complete!');
            // write queries 
            const sql = 'INSERT INTO form (receiver, address, postal, phone, client, acumin, name, delivery, time, signature, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
            const params = ['james', '1023 bathurst st', 'l9l 2e5', '9052423818', 'hicksmorley', 'sadfs', 'asdfas', 'asdfas', 'asdfa', 'yes', 'jhagskdfa@gmail.com'];
            return client.query(sql, params)
        })
        .then((result) => {
            console.log('result?', result);
            res.redirect('back');
        });    
});    

module.exports = router;