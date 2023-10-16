import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { Routes, Route, Navigate, BrowserRouter, Router } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { useAuthContext } from './hooks/useAuthContext';
import SupplierNavbar from './components/SupplierNavbar';
import SupplierDashboard from './pages/SupplierDashboard';
import BoxWrapper from './components/BoxWrapper';
import AdminOrders from "./components/AdminOrders";
import CusOrder from "./components/CusOrder";
import Orders from "./components/Orders";
import MakePurchaseOrder from "./pages/MakePurchaseOrder";
import PlacedOrders from "./pages/PlacedOrders";
import ApprovedOrders from "./pages/ApprovedOrders";
import DisplayAllOrders from "./pages/DisplayAllOrders";
import OrderDetails from "./pages/OrderDetails";
import Login from "./pages/LoginPage"
import SupplierOrders from './pages/SupplierOrders';
import Invoice from './pages/InvoiceOrders';
import StaffNavbar from './components/StaffNavbar';
import SiteForm from "./components/SiteForm.js";
import CusConstruction from "./components/CusConstruction";
import Construction from "./components/Construction";

function App() {
  const { user } = useAuthContext()

  const isSupplier = user && user.role === 'supplier';
  const isStaff = user && user.role === 'staff';

  console.log(isSupplier)

  return (
    <div className="App">
     <BrowserRouter>
     {isSupplier ? <SupplierNavbar/> : <div></div>}
     {isStaff ? <StaffNavbar/> : <div></div>}

      <Routes>
        <Route
          path="/"
          element={
            !user ?
          <Login/>
          :
          <BoxWrapper>
          <SupplierDashboard/>
          </BoxWrapper>}
          exact
        />
        <Route
          path="/supplierDashboard"
          element={
            user ?
          <BoxWrapper>
            <SupplierDashboard/>
          </BoxWrapper>:<Navigate to="/"/> }
          exact
        />
         <Route
          path="/supplierOrders"
          element={
            user ?
          <BoxWrapper>
            <SupplierOrders/>
          </BoxWrapper>:<Navigate to="/"/> }
          exact
        />
        <Route
          path="/invoice"
          element={
          user ?
          <BoxWrapper>
            <Invoice/>
          </BoxWrapper> :<Navigate to="/"/>}
          exact
        />
          <Route path="/adminOrders" element={<AdminOrders />} />
          <Route path="/cusorder" element={<CusOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/make-purchase-order" element={<MakePurchaseOrder />} />
          <Route path="/plaed-order" element={<PlacedOrders />} />
          <Route path="/approved-order" element={<ApprovedOrders />} />
          <Route path="/all-order" element={<DisplayAllOrders />} />
          <Route path="/order-details/:orderId" element={<OrderDetails />} />
		   <Route path="/form" component={ConstructionForm}></Route>
          <Route path="/siteForm" component={SiteForm}></Route>
		  <Route path="/cus_construction" component={CusConstruction}></Route>
          <Route path="/construction" component={Construction}></Route>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
