import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CusOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    onReload();
  }, []);

  const onReload = () => {
    const url = "http://localhost:5000/order/";
    axios.get(url).then((response) => {
      console.log(response.data);
      setOrders(response.data);
    });
  };

  const columns = [
    { title: "Item Name", field: "itemName" },
    { title: "Quantity", field: "quantity", type: "numeric" },
    { title: "Supplier", field: "supplier" },
    { title: "Site", field: "site" },
  ];

  return (
    <div className="container mt-4">
      <h2>Orders Table</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Supplier</th>
            <th>Site</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.itemName}</td>
              <td>{order.quantity}</td>
              <td>{order.supplier}</td>
              <td>{order.site}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default CusOrder;
