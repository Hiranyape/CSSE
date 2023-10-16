import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { ToastContainer, toast } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function Orders() {
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

  const validation = (itemName, quantity, supplier, site) => {
    console.log("bb");
    let error = false;

    if (itemName === "") {
      toast.error("Item Name Required!", {
        icon: <FontAwesomeIcon icon={faTimesCircle} />,
      });
      error = true;
    }

    if (quantity === "") {
      toast.error("Quantity Required!", {
        icon: <FontAwesomeIcon icon={faTimesCircle} />,
      });
      error = true;
    }

    if (supplier === "") {
      toast.error("Supplier Required!", {
        icon: <FontAwesomeIcon icon={faTimesCircle} />,
      });
      error = true;
    }

    if (site === "") {
      toast.error("Site Required!", {
        icon: <FontAwesomeIcon icon={faTimesCircle} />,
      });
      error = true;
    }

    return !error;
  };

  const onDelete = (id) => {
    const url = "http://localhost:5000/order/";
    axios.delete(url + id).then((res) => {
      toast.success("Delete Successful!", {
        icon: <FontAwesomeIcon icon={faCheckCircle} />,
      });
      onReload();
    });
  };

  const SubmitForm = async (newRow, oldRow) => {
    if (
      validation(
        newRow["itemName"],
        newRow["quantity"],
        newRow["supplier"],
        newRow["site"]
      )
    ) {
      const url = "http://localhost:5000/order/" + oldRow["_id"];
      const data = JSON.stringify({
        itemName: newRow["itemName"],
        quantity: newRow["quantity"],
        supplier: newRow["supplier"],
        site: newRow["site"],
        status: oldRow["status"],
        description: oldRow["description"],
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
            icon: <FontAwesomeIcon icon={faCheckCircle} />,
          });
        });
    }
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

export default Orders;
