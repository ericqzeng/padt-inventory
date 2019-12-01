var mongoose = require('../mongoconnect')();

var ordersSchema = new mongoose.Schema({
    itemID: { type: mongoose.Schema.Types.ObjectId, required: true, trim: true },
    itemName: { type: String, required: true, trim: true },
    requestor: { type: String, required: true },
    qty: { type: Number, required: true },
    reason: { type: String, required: true },
    fulfilled: { type: String, required: true, trim: true, enum: ['PENDING', 'APPROVED', 'DENIED'] },
})


module.exports = mongoose.model('orders', ordersSchema)
