const express        = require('express'),
      app            = express(),
      mongoose       = require('mongoose'),
      methodOverride = require('method-override'),
      { Client }     = require('pg'),
      // fancy JS way of writing - const Client = require('pg).Client; 
      Form           = require('./models/mongoMod/form'),
      User           = require('./models/mongoMod/user');
      
require('dotenv').config();

// const mongoRoutes = require('./routes/mongoCalls');
const psqlRoutes  = require('./routes/postgreSQLcalls');

// this serves html on the ejs engine
app.use(express.static(__dirname + "/public"));
app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

// mongoose.connect("mongodb://localhost/hicks_db", { useNewUrlParser: true });

// ROOT route 
app.get('/', (req, res) => {
    res.render('./form.html');
});

// app.use(mongoRoutes);
app.use(psqlRoutes);

// LISTENER 
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} ...`);
});