import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MakePurchaseOrder() {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [orderData, setOrderData] = useState({
    companyDetails: '',
    supplier: '',
    deliveryAddressDetails: '',
    requiredByDate: '',
  });

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [agreedPrice, setAgreedPrice] = useState(0);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    // Fetch products and suppliers from backend API
    axios.get('http://localhost:5000/api/product/').then((response) => {
      setProducts(response.data);
    });

    axios.get('http://localhost:5000/api/user/users/supplier/').then((response) => {
      setSuppliers(response.data);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleProductSelect = () => {
    if (selectedProduct) {
      const newItem = {
        product: selectedProduct,
        quantity,
        agreedPrice,
      };
      setProductDetails([...productDetails, newItem]);
      setSelectedProduct('');
      setQuantity(0);
      setAgreedPrice(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the requiredByDate field
    const currentDate = new Date();
    const requiredByDate = new Date(orderData.requiredByDate);
    if (requiredByDate <= currentDate) {
      alert('Required by date must be in the future.');
      return;
    }

    // Validate quantity and agreedPrice
    if (quantity < 0 || agreedPrice < 0) {
      alert('Quantity and agreed price cannot be negative.');
      return;
    }

    // Calculate the total price of the products
    const totalPrice = productDetails.reduce((total, item) => {
      return total + item.quantity * item.agreedPrice;
    }, 0);

    // Set the status based on the total price
    const status = totalPrice < 100000 ? 'approved' : 'placed';

    // Combine order data with the product details and status
    const combinedData = {
      ...orderData,
      items: productDetails,
      status, // Set the status here
    };

    // Send the 'combinedData' to your backend API to create a purchase order
    axios.post('http://localhost:5000/purchaseOrder/create/', combinedData).then((response) => {
      // Handle the response (e.g., show a success message)
      console.log('Purchase order created:', response.data);

      // Display a success message or reset the form
      alert('Purchase order created successfully');

      // Reset the form
      setOrderData({
        companyDetails: '',
        supplier: '',
        deliveryAddressDetails: '',
        requiredByDate: '',
      });
      setProductDetails([]);

      // Navigate to the "/all-order" page after successful submission
      navigate('/all-order');
    });
  };

  return (
    <div className="container mt-5">
      <h2>Create Purchase Order</h2>
      <div className="border p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Company Details:</label>
            <input
              type="text"
              className="form-control"
              name="companyDetails"
              value={orderData.companyDetails}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="supplier" className="form-label">
              Supplier
            </label>
            <select
              id="supplier"
              className="form-select"
              name="supplier"
              value={orderData.supplier}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.username}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Delivery Address Details:</label>
            <input
              type="text"
              className="form-control"
              name="deliveryAddressDetails"
              value={orderData.deliveryAddressDetails}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Required By Date:</label>
            <input
              type="date"
              className="form-control"
              name="requiredByDate"
              value={orderData.requiredByDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Products:</label>
            <select
              name="selectedProduct"
              className="form-select"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              required
            >
              <option value="">Select Products</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
            <div className="mb-2">
              <label className="form-label">Quantity:</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Agreed Price:</label>
              <input
                type="number"
                className="form-control"
                name="agreedPrice"
                value={agreedPrice}
                onChange={(e) => setAgreedPrice(Number(e.target.value))}
                required
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleProductSelect}>
              Add Product
            </button>
          </div>
          {productDetails.map((item, index) => (
            <div key={index} className="mb-3">
              <p>Product: {item.product}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Agreed Price: {item.agreedPrice}</p>
            </div>
          ))}
          <div className="mb-3">
            <button type="submit" className="btn btn-success">
              Submit Purchase Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MakePurchaseOrder;
