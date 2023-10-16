import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminOrders() {
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

  const validation = (status, description) => {
    console.log("bb");
    let error = false;

    if (status === "") {
      toast.error("Validation Error! Status is required!", {
        icon: "error",
      });
      error = true;
    }

    if (description === "") {
      toast.error("Validation Error! Description is required!", {
        icon: "error",
      });
      error = true;
    }

    return !error;
  };

  const onDelete = (id) => {
    const url = "http://localhost:5000/order/";
    axios.delete(url + id).then((res) => {
      toast.success("Delete Successful!", {
        icon: "success",
      });
      onReload();
    });
  };

  const SubmitForm = async (newRow, oldRow) => {
    if (validation(newRow.status, newRow.description)) {
      const url = "http://localhost:5000/order/" + oldRow._id;
      const data = JSON.stringify({
        itemName: oldRow.itemName,
        quantity: oldRow.quantity,
        supplier: oldRow.supplier,
        site: oldRow.site,
        status: newRow.status,
        description: newRow.description,
      });
      console.log(data);
      await axios
        .put(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data);
          onReload();
          toast.success("Update Successful!", {
            icon: "success",
          });
        });
    }
  };

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
            <th>Status</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.itemName}</td>
              <td>{order.quantity}</td>
              <td>{order.supplier}</td>
              <td>{order.site}</td>
              <td>{order.status}</td>
              <td>{order.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default AdminOrders;
