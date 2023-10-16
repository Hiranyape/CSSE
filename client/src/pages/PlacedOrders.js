import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PlacedOrders() {
  const [placedOrders, setPlacedOrders] = useState([]);
  const [updatedStatus, setUpdatedStatus] = useState({});
  const [availableStatuses, setAvailableStatuses] = useState(['approved', 'placed', 'declined']);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch placed orders from your backend API
    axios.get('http://localhost:5000/purchaseOrder/all').then((response) => {
      setPlacedOrders(response.data);
    });

    // Fetch suppliers and products separately
    axios.get('http://localhost:5000/api/user/users/supplier/').then((response) => {
      setSuppliers(response.data);
    });

    axios.get('http://localhost:5000/api/product/').then((response) => {
      setProducts(response.data);
      setLoading(false);
    });
  }, []);

  const handleStatusUpdate = (orderId) => {
    const statusToUpdate = updatedStatus[orderId];

    if (!statusToUpdate) {
      alert('Please select a status to update.');
      return;
    }

    // Send a PUT request to update the status of the order
    axios
      .put(`http://localhost:5000/purchaseOrder/${orderId}/edit`, { status: statusToUpdate })
      .then((response) => {
        // Handle the response (e.g., show a success message)
        console.log('Order status updated:', response.data);

        // Update the status locally
        const updatedOrders = placedOrders.map((order) => {
          if (order._id === orderId) {
            // Update the status immediately in the local state
            order.status = statusToUpdate;
          }
          return order;
        });
        setPlacedOrders(updatedOrders);

        // Clear the selected status
        setUpdatedStatus({ ...updatedStatus, [orderId]: '' });
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
        alert('An error occurred while updating the order status.');
      });
  };

  const getSupplierNameById = (supplierId) => {
    const supplier = suppliers.find((s) => s._id === supplierId);
    return supplier ? supplier.username : 'Unknown Supplier';
  };

  const getProductNameById = (productId) => {
    const product = products.find((p) => p._id === productId);
    return product ? product.name : 'Unknown Product';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Placed Orders</h2>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Company Details</th>
            <th>Supplier</th>
            <th>Delivery Address</th>
            <th>Required By Date</th>
            <th>Status</th>
            <th>Update Status</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {placedOrders.map((order) => (
            <tr key={order._id}>
              <td>{order.companyDetails}</td>
              <td>{getSupplierNameById(order.supplier)}</td>
              <td>{order.deliveryAddressDetails}</td>
              <td>{new Date(order.requiredByDate).toLocaleDateString()}</td>
              <td>{order.status}</td>
              <td>
                <div className="d-flex">
                  <select
                    value={updatedStatus[order._id] || ''}
                    onChange={(e) => {
                      setUpdatedStatus({ ...updatedStatus, [order._id]: e.target.value });
                    }}
                    className="form-control"
                  >
                    <option value="">Select Status</option>
                    {availableStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleStatusUpdate(order._id)}
                    className="btn btn-primary ml-2"
                  >
                    Update
                  </button>
                </div>
              </td>
              <td>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Agreed Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td>{getProductNameById(item.product)}</td>
                        <td>{item.quantity}</td>
                        <td>{item.agreedPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlacedOrders;
