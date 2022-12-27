const express = require('express');
const router = express.Router();
const braintree = require('braintree');

router.post('/', (req, res, next) => {

  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId:   '8j8hcnmss45ny5s5',
    publicKey:    'yqzvw3n7vg7d975q',
    privateKey:   '5aa4fc454d647378d715786d1b2ac0ac'
  });

  console.log(req);
  // Use the payment method nonce here
  const nonceFromTheClient = req.body.paymentMethodNonce;
  var priceAmount = '100.00';
//   var customerFullName = req.body.customerFullName;


  // Create a new transaction for $10
  const newTransaction = gateway.transaction.sale({
    amount: priceAmount.toString(),
    paymentMethodNonce: nonceFromTheClient,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, (error, result) => {
      if (result) {
        // console.log("SUCCESS TRANSACTION RESULT ===========>")
        // console.log(result);
        res.send(result);
      } else {
        res.status(500).send(error);
      }
  });

});

module.exports = router;