const app = require('express');
const { authenticate } = require('../middlewares/authenticate');
const { addAddressController, getAddressController, getOrderController, getSpecificOrder, deleteSpecificProduct, deliverSpecificProduct } = require('../controllers/orderController');
const router = app.Router();

router.post('/addAddress', authenticate, addAddressController );
router.get('/getAddress', authenticate, getAddressController);
router.get('/getOrders', authenticate, getOrderController);
router.get('/getSpecificOrder/:id', authenticate, getSpecificOrder);
router.delete('/deleteSpecificProduct/:id', authenticate, deleteSpecificProduct);
router.put('/deliverProduct', authenticate, deliverSpecificProduct);

module.exports = router;


