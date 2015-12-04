# Parsley.js - Credit Card Validator
A credit card validator for [Parsley.js](http://parsleyjs.org/) including validation for specific brands

# Brands Validation
This plugins offers validation for the following credit card brands:
* Amex
* China Union Pay
* Dankort
* Diners Club CarteBlanche
* Diners Club International
* Diners Club US & Canada
* Discover
* JCB
* Laser
* Maestro
* Mastercard
* Visa
* Visa Electron

# Usage

#### Credit Card Number
If you just want to check if the credit card number is valid, simply add the **data-parsley-creditcard** attribute to your input:

`<input required="required" data-parsley-creditcard="" type="tel">`

#### Credit Card Number for specific brands
If you want to check if the credit card number is valid and also check if is for a specific brand, simply add the **data-parsley-creditcard** attribute to your input with the value as the allowed brands, separeted with commas:

`<input required="required" data-parsley-creditcard="visa,mastercard" type="tel">`

#### Card CVC 
To validate the card cvc code, add the **data-parsley-cvv** attribute to your input:

`<input required="required" data-parsley-cvv="" type="tel">`

#### Card Expiry Date 
To validate the card expiry date, add the **data-parsley-expirydate** attribute to your input:

`<input required="required" data-parsley-expirydate="" type="tel">`
