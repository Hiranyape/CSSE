import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminOrders from "./components/AdminOrders";
import CusOrder from "./components/CusOrder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Orders from "./components/Orders";
import MakePurchaseOrder from "./pages/MakePurchaseOrders";
import PlacedOrders from "./pages/PlacedOrders";
import ApprovedOrders from "./pages/ApprovedOrders";
import DisplayAllOrders from "./pages/DisplayAllOrders";
import OrderDetails from "./pages/OrderDetails";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/adminOrders" element={<AdminOrders />} />
          <Route path="/cusorder" element={<CusOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/make-purchase-order" element={<MakePurchaseOrder />} />
          <Route path="/plaed-order" element={<PlacedOrders />} />
          <Route path="/approved-order" element={<ApprovedOrders />} />
          <Route path="/all-order" element={<DisplayAllOrders />} />
          <Route path="/order-details/:orderId" element={<OrderDetails />} />
        </Routes>
        <ToastContainer position="top-right" />
      </div>
    </Router>
  );
}

export default App;
