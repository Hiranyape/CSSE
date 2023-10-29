const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon'); 
const purchaseOrderRepository = require('../repositories/purchaseOrderRepository');
const purchaseOrderController = require('../controllers/purchaseOrderController');

describe('Purchase Order Controller', () => {
  describe('createPurchaseOrder', () => {
    it('should create a new purchase order', async () => {
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
      const fakeCreatedOrder = {
        _id: 'fakeOrderId123', 
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
        supplierstatus: 'Pending', 
        message: 'This is a fake order for testing purposes',
        status: 'placed', 
      };
      stubCreate.withArgs(testData).resolves(fakeCreatedOrder);

      // Act: Call the function to test
      const createdOrder = await purchaseOrderController.createPurchaseOrder(testData);

      // Assert: Check the expected outcome
      expect(createdOrder).to.be.an('object');
      expect(createdOrder).to.deep.equal(fakeCreatedOrder);

      // Restore the stub after the test
      stubCreate.restore();
    });
  });
});
