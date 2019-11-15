var mongoose = require('../mongoconnect')();

var itemsSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true, enum: ['Prop', 'Costume'] },
    qty: { type: Number, required: true },
    years: [{ type: String, trim: true }],
    links: [{ type: String, trim: true }],
    locations: [{ type: String, trim: true }],
    images: [{ type: String, trim: true }]
})


module.exports = mongoose.model('items', itemsSchema)
