var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {type: String, rquired: true, max: 100},
    price: {type: String, required: true}
});

// Export the model
module.exports = mongoose.model('Product', ProductSchema);