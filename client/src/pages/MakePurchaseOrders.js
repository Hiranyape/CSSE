import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MakePurchaseOrder() {
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
    // Fetch products and suppliers from your backend API
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
    const status = totalPrice < 20000 ? 'approved' : 'palced';

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
    });
  };

  return (
    <div>
      <h2>Create Purchase Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Details:</label>
          <input
            type="text"
            name="companyDetails"
            value={orderData.companyDetails}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="supplier">Supplier</label>
          <select
            id="supplier"
            name="supplier"
            value={orderData.supplier}
            onChange={handleInputChange}
            className="form-control"
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
        <div>
          <label>Delivery Address Details:</label>
          <input
            type="text"
            name="deliveryAddressDetails"
            value={orderData.deliveryAddressDetails}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Required By Date:</label>
          <input
            type="date"
            name="requiredByDate"
            value={orderData.requiredByDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Products:</label>
          <select
            name="products"
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
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
            <label>Agreed Price:</label>
            <input
              type="number"
              value={agreedPrice}
              onChange={(e) => setAgreedPrice(Number(e.target.value))}
              required
            />
            <button type="button" onClick={handleProductSelect}>
              Add Product
            </button>
          </div>
        </div>
        {productDetails.map((item, index) => (
          <div key={index}>
            <p>Product: {item.product}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Agreed Price: {item.agreedPrice}</p>
          </div>
        ))}
        <div>
          <button type="submit">Submit Purchase Order</button>
        </div>
      </form>
    </div>
  );
}

export default MakePurchaseOrder;
