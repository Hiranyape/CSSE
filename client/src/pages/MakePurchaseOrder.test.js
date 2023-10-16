import React from 'react'; // Add this line
import { render, fireEvent, waitFor } from '@testing-library/react';
import MakePurchaseOrder from './MakePurchaseOrder';
import { useNavigate } from 'react-router-dom';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

test('renders MakePurchaseOrder component without errors', () => {
  render(<MakePurchaseOrder />);
});

test('orders with total price below 20000 are approved', async () => {
    const { getByLabelText, getByText } = render(<MakePurchaseOrder />);
  
    // Fill in the form
    fireEvent.change(getByLabelText('Company Details:'), {
      target: { name: 'companyDetails', value: 'Test Company' },
    });
    fireEvent.change(getByLabelText('Supplier'), {
      target: { name: 'supplier', value: '123' },
    });
    fireEvent.change(getByLabelText('Delivery Address Details:'), {
      target: { name: 'deliveryAddressDetails', value: 'Test Address' },
    });
    fireEvent.change(getByLabelText('Required By Date:'), {
      target: { name: 'requiredByDate', value: '2023-12-31' },
    });
  
    // Select a product and add it
    fireEvent.change(getByLabelText('Products:'), {
      target: { name: 'products', value: '456' },
    });
    fireEvent.change(getByLabelText('Quantity:'), {
      target: { name: 'quantity', value: '5' },
    });
    fireEvent.change(getByLabelText('Agreed Price:'), {
      target: { name: 'agreedPrice', value: '1000' },
    });
    fireEvent.click(getByText('Add Product'));
  
    // Submit the form
    fireEvent.click(getByText('Submit Purchase Order'));
  
    // Mock the Axios post response
    axios.post.mockResolvedValue({ data: {} });
  
    // Wait for Axios post to resolve
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/purchaseOrder/create/',
        expect.objectContaining({
          status: 'approved',
        })
      );
    });
  });