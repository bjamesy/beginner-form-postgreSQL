const express        = require('express'),
      app            = express(),
      mongoose       = require('mongoose'),
      { Client }     = require('pg'),
      // fancy JS way of writing - const Client = require('pg).Client; 
      Form           = require('./models/mongoMod/form'),
      User           = require('./models/mongoMod/user');
      require('dotenv').config();

// const mongoRoutes = require('./routes/mongoCalls');
// const psqlRoutes  = require('./routes/postgreSQLcalls');

// this serves html on the ejs engine
app.use(express.static(__dirname + "/public"));
app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded({extended: true}));

// const connect = "postgres://jamesballanger:Chancie#12@localhost/hicks_db";    
// mongoose.connect("mongodb://localhost/hicks_db", { useNewUrlParser: true });

// ROOT route 
app.get('/', (req, res) => {
    res.render('./form.html');
});

app.post('/', (req, res) => {
    console.log('post body', req.body);

    const client = new Client();
    client.connect()
        .then(() => {
            console.log('connection complete!');
            // write queries 
            const sql = 'INSERT INTO form (receiver, address, postal, phone, client, acumin, name, delivery, time, signature, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)'
            const params = ['james', '1023 bathurst st toronto', 'l9l 2e5', '1234', 'hicksmorley', 'sadfs', 'asdfas', 'asdfas', 'asdfa', 'yes', 'jhagskdfa@gmail.com'];
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

// POST ROUTEs 
// app.use(mongoRoutes);
// app.use(psqlRoutes);

// LISTENER 
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} ...`);
});