var braintree = require("braintree");
require('dotenv').config();
const paymentGateway = async (options) => {
const  gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
    return gateway;
}
module.exports = paymentGateway;


