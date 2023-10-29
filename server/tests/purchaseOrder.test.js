const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon'); 
const purchaseOrderRepository = require('../repositories/purchaseOrderRepository');
const purchaseOrderController = require('../controllers/purchaseOrderController');
const Product = require('../models/ProductModel'); 

describe('Purchase Order Controller', () => {
  describe('createPurchaseOrder', () => {
    it('should create a new purchase order with status "approved" when total price is < 100000', async () => {
      // Arrange: Prepare the test data
      const testData = {
        companyDetails: 'Company XYZ',
        supplier: '653dbd2770b5b07f4011a411',
        deliveryAddressDetails: 'Address',
        requiredByDate: '2023-10-31',
        items: [
          {
            product: '653db8d548455493ddfc5fc3',
            quantity: 5,
            agreedPrice: 100,
          },
          {
            product: '653db8ea48455493ddfc5fc5',
            quantity: 10,
            agreedPrice: 60,
          },
        ],
      };

      // Stub the create method of purchaseOrderRepository to simulate database interaction
      const stubCreate = sinon.stub(purchaseOrderRepository, 'create');
      
      // Stub the findById method of the Product model to simulate product retrieval
      const stubFindById = sinon.stub(Product, 'findById');
      stubFindById.onFirstCall().resolves({ _id: 'product1' });
      stubFindById.onSecondCall().resolves({ _id: 'product2' });

      // Calculate the expected total price based on the test data
      const expectedTotalPrice = 5 * 100 + 10 * 60;

      // Set the expected status based on the total price
      const expectedStatus = expectedTotalPrice < 100000 ? 'approved' : 'placed';

      // Create a fake order object to return from the stub
      const fakeCreatedOrder = {
        _id: 'fakeOrderId123', 
        companyDetails: testData.companyDetails,
        supplier: testData.supplier,
        deliveryAddressDetails: testData.deliveryAddressDetails,
        requiredByDate: testData.requiredByDate,
        items: testData.items,
        supplierstatus: 'Pending', 
        message: 'This is a fake order for testing purposes',
        status: expectedStatus, // Set the status based on the expectedTotalPrice
      };
      
      // Configure the stubs
      stubCreate.withArgs(testData).resolves(fakeCreatedOrder);

      // Act: Call the function to test
      const createdOrder = await purchaseOrderController.createPurchaseOrder(testData);

      // Assert: Check the expected outcome
      expect(createdOrder).to.be.an('object');
      expect(createdOrder).to.deep.equal(fakeCreatedOrder);
      expect(createdOrder.status).to.equal('approved'); // Assertion to check if status is "approved"

      // Restore the stubs after the test
      stubCreate.restore();
      stubFindById.restore();
    });

    it('should create a new purchase order with status "placed" when total price is > 100000', async () => {
        // Arrange: Prepare the test data
        const testData = {
          companyDetails: 'Company XYZ',
          supplier: '653dbd2770b5b07f4011a411',
          deliveryAddressDetails: 'Address',
          requiredByDate: '2023-10-31',
          items: [
            {
              product: '653db8d548455493ddfc5fc3',
              quantity: 5,
              agreedPrice: 10000,
            },
            {
              product: '653db8ea48455493ddfc5fc5',
              quantity: 10,
              agreedPrice: 6000,
            },
          ],
        };
  
        // Stub the create method of purchaseOrderRepository to simulate database interaction
        const stubCreate = sinon.stub(purchaseOrderRepository, 'create');
        
        // Stub the findById method of the Product model to simulate product retrieval
        const stubFindById = sinon.stub(Product, 'findById');
        stubFindById.onFirstCall().resolves({ _id: 'product1' });
        stubFindById.onSecondCall().resolves({ _id: 'product2' });
  
        // Calculate the expected total price based on the test data
        const expectedTotalPrice = 5 * 10000 + 10 * 6000;
  
        // Set the expected status based on the total price
        const expectedStatus = expectedTotalPrice < 100000 ? 'approved' : 'placed';
  
        // Create a fake order object to return from the stub
        const fakeCreatedOrder = {
          _id: 'fakeOrderId123', 
          companyDetails: testData.companyDetails,
          supplier: testData.supplier,
          deliveryAddressDetails: testData.deliveryAddressDetails,
          requiredByDate: testData.requiredByDate,
          items: testData.items,
          supplierstatus: 'Pending', 
          message: 'This is a fake order for testing purposes',
          status: expectedStatus, // Set the status based on the expectedTotalPrice
        };
        
        // Configure the stubs
        stubCreate.withArgs(testData).resolves(fakeCreatedOrder);
  
        // Act: Call the function to test
        const createdOrder = await purchaseOrderController.createPurchaseOrder(testData);
  
        // Assert: Check the expected outcome
        expect(createdOrder).to.be.an('object');
        expect(createdOrder).to.deep.equal(fakeCreatedOrder);
        expect(createdOrder.status).to.equal('placed'); // Assertion to check if status is "placed"
  
        // Restore the stubs after the test
        stubCreate.restore();
        stubFindById.restore();
      });

      it('should create a new purchase order with status "placed" when total price is = 100000', async () => {
        // Arrange: Prepare the test data
        const testData = {
          companyDetails: 'Company XYZ',
          supplier: '653dbd2770b5b07f4011a411',
          deliveryAddressDetails: 'Address',
          requiredByDate: '2023-10-31',
          items: [
            {
              product: '653db8d548455493ddfc5fc3',
              quantity: 1,
              agreedPrice: 100000,
            },
          ],
        };
  
        // Stub the create method of purchaseOrderRepository to simulate database interaction
        const stubCreate = sinon.stub(purchaseOrderRepository, 'create');
        
        // Stub the findById method of the Product model to simulate product retrieval
        const stubFindById = sinon.stub(Product, 'findById');
        stubFindById.onFirstCall().resolves({ _id: 'product1' });
  
        // Calculate the expected total price based on the test data
        const expectedTotalPrice = 1 * 100000;
  
        // Set the expected status based on the total price
        const expectedStatus = expectedTotalPrice < 100000 ? 'approved' : 'placed';
  
        // Create a fake order object to return from the stub
        const fakeCreatedOrder = {
          _id: 'fakeOrderId123', 
          companyDetails: testData.companyDetails,
          supplier: testData.supplier,
          deliveryAddressDetails: testData.deliveryAddressDetails,
          requiredByDate: testData.requiredByDate,
          items: testData.items,
          supplierstatus: 'Pending', 
          message: 'This is a fake order for testing purposes',
          status: expectedStatus, // Set the status based on the expectedTotalPrice
        };
        
        // Configure the stubs
        stubCreate.withArgs(testData).resolves(fakeCreatedOrder);
  
        // Act: Call the function to test
        const createdOrder = await purchaseOrderController.createPurchaseOrder(testData);
  
        // Assert: Check the expected outcome
        expect(createdOrder).to.be.an('object');
        expect(createdOrder).to.deep.equal(fakeCreatedOrder);
        expect(createdOrder.status).to.equal('placed'); // Assertion to check if status is "placed"
  
        // Restore the stubs after the test
        stubCreate.restore();
        stubFindById.restore();
      });
  });
});
