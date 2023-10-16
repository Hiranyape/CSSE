const PurchaseOrder = require('../models/PurchaseOrder');

class PurchaseOrderRepository {
  async create(orderData) {
    const purchaseOrder = new PurchaseOrder(orderData);
    await purchaseOrder.save();
    return purchaseOrder;
  }

  async getAll() {
    const orders = await PurchaseOrder.find({}).populate({
      path: 'items.product',
      model: 'Product', 
    });
    return orders;
  }

  async getAllApproved() {
    const approvedOrders = await PurchaseOrder.find({ status: 'approved' });
    return approvedOrders;
  }

  async getByUserId(userId) {
    const orders = await PurchaseOrder.find({ supplier: userId });
    return orders;
  }

  async getById(purchaseOrderId) {
    const order = await PurchaseOrder.findById(purchaseOrderId);
    return order;
  }

  async update(purchaseOrderId, updatedOrderData) {
    const updatedOrder = await PurchaseOrder.findByIdAndUpdate(
      purchaseOrderId,
      updatedOrderData,
      { new: true }
    );
    return updatedOrder;
  }

  async delete(purchaseOrderId) {
    await PurchaseOrder.findByIdAndDelete(purchaseOrderId);
  }

  async approve(purchaseOrderId) {
    const updatedOrder = await PurchaseOrder.findByIdAndUpdate(
      purchaseOrderId,
      { status: 'approved' },
      { new: true }
    );
    return updatedOrder;
  }

  

 
}

module.exports = new PurchaseOrderRepository();
