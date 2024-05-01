const app = require('express');
const { authenticate } = require('../middlewares/authenticate');
const { addAddressController, getAddressController, getOrderController, getSpecificOrder } = require('../controllers/orderController');
const router = app.Router();

router.post('/addAddress', authenticate, addAddressController );
router.get('/getAddress', authenticate, getAddressController);
router.get('/getOrders', authenticate, getOrderController);
router.get('/getSpecificOrder/:id', authenticate, getSpecificOrder);

module.exports = router;


