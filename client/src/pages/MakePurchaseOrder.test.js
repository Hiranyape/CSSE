import React from 'react'; // Add this line
import { render, fireEvent, waitFor } from '@testing-library/react';
import MakePurchaseOrder from './MakePurchaseOrder';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

test('renders MakePurchaseOrder component without errors', () => {
  render(<MakePurchaseOrder />);
});