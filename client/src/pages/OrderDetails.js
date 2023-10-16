import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function OrderDetails(props) {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the specific order by orderId
    axios.get(`http://localhost:5000/purchaseOrder/${orderId}`).then((response) => {
      setOrder(response.data);
      setLoading(false);
    });

    // Fetch suppliers and products separately
    axios.get('http://localhost:5000/api/user/users/supplier/').then((response) => {
      setSuppliers(response.data);
    });

    axios.get('http://localhost:5000/api/product/').then((response) => {
      setProducts(response.data);
    });
  }, [orderId]);

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
      <h2>Order Details</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Company Details</h5>
          <p className="card-text">{order.companyDetails}</p>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Supplier</h5>
          <p className="card-text">{getSupplierNameById(order.supplier)}</p>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Delivery Address</h5>
          <p className="card-text">{order.deliveryAddressDetails}</p>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Required By Date</h5>
          <p className="card-text">{new Date(order.requiredByDate).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Status</h5>
          <p className="card-text">{order.status}</p>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Products</h5>
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
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
