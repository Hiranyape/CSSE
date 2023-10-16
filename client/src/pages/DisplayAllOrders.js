import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DisplayAllOrders() {
  const [placedOrders, setPlacedOrders] = useState([]);
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
      <h2>All Orders</h2>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Company Details</th>
            <th>Supplier</th>
            <th>Delivery Address</th>
            <th>Required By Date</th>
            <th>Status</th>
            <th>Products</th>
            <th>Action</th>
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
              <td>
                {/* Create a button to view order details */}
                <Link to={`/order-details/${order._id}`} className="btn btn-primary">
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayAllOrders;
