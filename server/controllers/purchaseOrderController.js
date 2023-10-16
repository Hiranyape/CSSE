const PurchaseOrder = require('../models/PurchaseOrder');
const Product = require('../models/ProductModel');
const purchaseOrderRepository = require('../repositories/purchaseOrderRepository');

// Create a new purchase order
async function createPurchaseOrder(orderData) {
  try {
    const purchaseOrder = await purchaseOrderRepository.create(orderData);
    return purchaseOrder;
  } catch (error) {
    throw error;
  }
}

// Get all purchase orders
async function getAllPurchaseOrders() {
  try {
    const orders = await purchaseOrderRepository.getAll();
    return orders;
  } catch (error) {
    throw error;
  }
}

// Get all approved purchase orders
async function getAllApprovedPurchaseOrders() {
  try {
    const approvedOrders = await purchaseOrderRepository.getAllApproved();
    return approvedOrders;
  } catch (error) {
    throw error;
  }
}

// Get all purchase orders for a user
async function getUserPurchaseOrders(userId) {
  try {
    const orders = await purchaseOrderRepository.getByUserId(userId);
    return orders;
  } catch (error) {
    throw error;
  }
}

// Get a specific purchase order by its ID
async function getPurchaseOrderById(purchaseOrderId) {
  try {
    const order = await purchaseOrderRepository.getById(purchaseOrderId);
    return order;
  } catch (error) {
    throw error;
  }
}

// Edit a purchase order
async function editPurchaseOrder(purchaseOrderId, updatedOrderData) {
  try {
    const updatedOrder = await purchaseOrderRepository.update(purchaseOrderId, updatedOrderData);
    return updatedOrder;
  } catch (error) {
    throw error;
  }
}

// Delete a purchase order
async function deletePurchaseOrder(purchaseOrderId) {
  try {
    await purchaseOrderRepository.delete(purchaseOrderId);
  } catch (error) {
    throw error;
  }
}

// Approve a purchase order (change the status)
async function approvePurchaseOrder(purchaseOrderId) {
  try {
    const updatedOrder = await purchaseOrderRepository.approve(purchaseOrderId);
    return updatedOrder;
  } catch (error) {
    throw error;
  }
}

async function calculateTotalPrice(purchaseOrderId) {
  try {
    // Get the purchase order by ID
    const purchaseOrder = await PurchaseOrder.findById(purchaseOrderId);

    if (!purchaseOrder) {
      throw new Error('Purchase order not found');
    }

    let totalPrice = 0;

    // Iterate through the items in the purchase order and calculate the total price
    for (const item of purchaseOrder.items) {
      const product = await Product.findById(item.product);

      if (!product) {
        throw new Error('Product not found');
      }

      totalPrice += item.quantity * product.price;
    }

    return totalPrice;
  } catch (error) {
    throw error;
  }
}

async function getAllWithProducts() {
  const orders = await PurchaseOrder.find({}).populate('items.product');
  return orders;
}



module.exports = {
  createPurchaseOrder,
  getUserPurchaseOrders,
  getPurchaseOrderById,
  editPurchaseOrder,
  deletePurchaseOrder,
  approvePurchaseOrder,
  calculateTotalPrice,
  getAllPurchaseOrders,
  getAllApprovedPurchaseOrders,
  getAllWithProducts
};
