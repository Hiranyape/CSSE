import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function OrderDetails(props) {
  const { orderId } = useParams()
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
    <div>
      <h2>Order Details</h2>
      <table>
        <thead>
          <tr>
            <th>Company Details</th>
            <th>Supplier</th>
            <th>Delivery Address</th>
            <th>Required By Date</th>
            <th>Status</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{order.companyDetails}</td>
            <td>{getSupplierNameById(order.supplier)}</td>
            <td>{order.deliveryAddressDetails}</td>
            <td>{new Date(order.requiredByDate).toLocaleDateString()}</td>
            <td>{order.status}</td>
            <td>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    Product: {getProductNameById(item.product)}
                    <br />
                    Quantity: {item.quantity}<br />
                    Agreed Price: {item.agreedPrice}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetails;
