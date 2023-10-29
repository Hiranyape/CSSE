import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axiosMock from 'axios';
import ApprovedOrders from './ApprovedOrders';

// Mock Axios requests
jest.mock('axios');

// Sample data for testing
const sampleOrders = [
  {
    _id: 'order1',
    supplier: 'supplier1',
    deliveryAddressDetails: 'Address A',
    requiredByDate: new Date(),
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

test('renders ApprovedOrders properly', async () => {
  render(<ApprovedOrders />);

  // Wait for the component to fetch and render data
  await waitFor(() => screen.getByText('Approved Orders'));

  // Assert that the data is displayed correctly
  expect(screen.getByText('Supplier A')).toBeInTheDocument();
  expect(screen.getByText('Address A')).toBeInTheDocument();
  expect(screen.getByText('Product A')).toBeInTheDocument();
  expect(screen.getByText('Product B')).toBeInTheDocument();
});
