# Parsley.js - Credit Card Validator
A credit card validator for Parsley.js including validation for specific brands

# Usage

#### Credit Card Number
If you just want to check if the credit card number is valid, simply add the **data-parsley-creditcard** attribute to your input:

`<input required="required" data-parsley-creditcard="" type="tel">`

#### Credit Card Number for specific brands
If you want to check if the credit card number is valid and also check if is for a specific brand, simply add the **data-parsley-creditcard** attribute to your input with the value as the allowed brands, separeted with commas:

`<input required="required" data-parsley-creditcard="visa,mastercard" type="tel">`

#### Card CVC 
Add the **data-parsley-cvv** attribute to your input:

`<input required="required" data-parsley-cvv="" type="tel">`
