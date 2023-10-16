const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  companyDetails: {
    type: String,
    required: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier', // Reference to the Supplier model
    required: true,
  },
  deliveryAddressDetails: {
    type: String,
    required: true,
  },
  requiredByDate: {
    type: Date,
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      agreedPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  supplierstatus: {
    type: String,
    enum: ["Wait", "Approve", "Partial Approve", "Decline", "Return","Pending"],
    default: 'Pending', // Set the default status to "placed" if not specified
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ['approved', 'placed', 'declined'],
    default: 'placed', // Set the default status to "placed" if not specified
  }
});

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);

module.exports = PurchaseOrder;
