const app = require('express');
const { userRegister, login, getUser, activation, generateOTP, verifyUser, verifyOTP, createResetSession, resetPassword } = require('../controllers/userController');
const { authenticate, localVairables } = require('../middlewares/authenticate');
const {upload} = require("../multer");

const router = app.Router();

router.post('/register', upload.single("profile"),userRegister);
router.post('/activation/:activation_token' ,activation);
router.post('/login', login);
//verify user it is register on a database or not for (forget password)
router.route("/verifyUser").post(verifyUser, (req, res) => res.end()); 

// authenticate middleware verify user token from headers
router.get('/getUser/:id', authenticate ,getUser);
// route to generate the otp
router.post('/generateOTP', verifyUser, localVairables, generateOTP);
// route to verify the otp
router.post('/verifyOTP', verifyUser, verifyOTP);
//create reset session to reset the password 
router.get("/createResetSession", createResetSession);
// route for reset the password
router.put('/resetPassword', verifyUser, resetPassword);




module.exports = router;

