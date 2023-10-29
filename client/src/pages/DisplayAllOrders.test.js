import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axiosMock from 'axios'; 
import DisplayAllOrders from './DisplayAllOrders'; 

// Mock Axios requests
jest.mock('axios');

// Sample data for testing
const sampleOrders = [
  {
    _id: 'order1',
    companyDetails: 'Company A',
    supplier: 'supplier1',
    deliveryAddressDetails: 'Address A',
    requiredByDate: new Date(),
    status: 'placed',
    items: [
      { product: 'product1', quantity: 5, agreedPrice: 10 },
      { product: 'product2', quantity: 3, agreedPrice: 8 },
    ],
  },
];

const sampleSuppliers = [
  { _id: 'supplier1', username: 'Supplier A' },
];

const sampleProducts = [
  { _id: 'product1', name: 'Product A' },
  { _id: 'product2', name: 'Product B' },
];

// Mock Axios responses
axiosMock.get.mockResolvedValueOnce({ data: sampleOrders });
axiosMock.get.mockResolvedValueOnce({ data: sampleSuppliers });
axiosMock.get.mockResolvedValueOnce({ data: sampleProducts });

test('renders DisplayAllOrders properly', async () => {
  render(
    <Router>
      <DisplayAllOrders />
    </Router>
  );

  // Wait for the component to fetch and render data
  await waitFor(() => screen.getByText('All Orders'));

  // Assert that the data is displayed correctly
  expect(screen.getByText('Company A')).toBeInTheDocument();
  expect(screen.getByText('Supplier A')).toBeInTheDocument();
  expect(screen.getByText('Address A')).toBeInTheDocument();
  expect(screen.getByText('Product A')).toBeInTheDocument();
  expect(screen.getByText('Product B')).toBeInTheDocument();

  // Test button presence and click
  const deleteButton = screen.getByText('Delete');
  expect(deleteButton).toBeInTheDocument();
  fireEvent.click(deleteButton);

  // Test link presence and click
  const viewDetailsLink = screen.getByText('View Details');
  expect(viewDetailsLink).toBeInTheDocument();
  fireEvent.click(viewDetailsLink);
});
