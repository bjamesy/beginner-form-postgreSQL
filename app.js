var express        = require('express'),
    app            = express(),
    mongoose       = require('mongoose'),
    Form           = require('./models/mongoMod/form'),
    User           = require('./models/mongoMod/user');

var mongoRoutes = require('./routes/mongoCalls');
    // psqlRoutes  = require('./routes/postgreSQLcalls');

// this serves html on the ejs engine
app.use(express.static(__dirname + "/public"));
app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/hicks_db", { useNewUrlParser: true });

// ROOT route 
app.get('/', (req, res) => {
    res.render('./form.html');
});

// POST ROUTEs 
app.use(mongoRoutes);
// app.use(psqlRoutes);

// LISTENER 
app.listen(process.env.PORT || 3000, () => {
    console.log('YOUR SERVER HAS STARTED......!');
});