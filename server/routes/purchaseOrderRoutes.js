const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchaseOrderController');

// Create a new purchase order
router.post('/create', async (req, res) => {
  try {
    const purchaseOrder = await purchaseOrderController.createPurchaseOrder(req.body);
    res.status(201).json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all purchase orders
router.get('/all', async (req, res) => {
  try {
    const orders = await purchaseOrderController.getAllPurchaseOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all approved purchase orders
router.get('/approved', async (req, res) => {
  try {
    const approvedOrders = await purchaseOrderController.getAllApprovedPurchaseOrders();
    res.json(approvedOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all purchase orders for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await purchaseOrderController.getUserPurchaseOrders(userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific purchase order by its ID
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await purchaseOrderController.getPurchaseOrderById(orderId);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit a purchase order
router.put('/:orderId/edit', async (req, res) => {
  try {
    const { orderId } = req.params;
    const updatedOrder = await purchaseOrderController.editPurchaseOrder(orderId, req.body);
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a purchase order
router.delete('/:orderId/delete', async (req, res) => {
  try {
    const { orderId } = req.params;
    await purchaseOrderController.deletePurchaseOrder(orderId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin route to approve a purchase order
router.put('/:orderId/approve', async (req, res) => {
  try {
    const { orderId } = req.params;
    const approvedOrder = await purchaseOrderController.approvePurchaseOrder(orderId);
    res.json(approvedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Calculate the total price for a specific purchase order
router.get('/:orderId/totalprice', async (req, res) => {
  try {
    const { orderId } = req.params;
    const totalPrice = await purchaseOrderController.calculateTotalPrice(orderId);
    res.json({ totalPrice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all purchase orders with products
router.get('/allorders', async (req, res) => {
  try {
    const ordersWithProducts = await purchaseOrderController.getAllPurchaseOrdersWithProducts();
    res.json(ordersWithProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
