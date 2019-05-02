var mongoose = require('mongoose');

var formSchema = new mongoose.Schema({
    receiver: String,
    address: String,
    postal: String,
    phone: String,
    client: String,
    acumin: String,
    name: String,
    delivery: String,
    time: String,
    signature: String,
    email: String,
});

var Form = mongoose.model('Form', formSchema);
module.exports = Form;