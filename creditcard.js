/*
 * parsley.js - credicard validator with brand validation | Suraj Sanchit | http://parsleyjs.org/ | http://www.graciousstudios.nl/
 * Refactored from parsley v1.0
 *
 * Example CVV: data-parsley-cvv
 * Example Creditcard: data-parsley-creditcard
 * Example Creditcard with specific brands: data-parsley-creditcard='visa,mastercard'
*/

//---------------------------------------
// Creditcard validation
//---------------------------------------
(function () {
    'use strict';

    function validateCreditCardBrand(number, valid_types){
        var _j, _len1,
            requirement = requirement.split(','),
            card_types = {
              'amex': {
                pattern: /^3[47]/,
                valid_length: [15]
              },
              'china_union_pay': {
                pattern: /^(62|88)/,
                valid_length: [16, 17, 18, 19]
              },
              'dankort': {
                pattern: /^5019/,
                valid_length: [16]
              },
              'diners_club_carte_blanche': {
                pattern: /^30[0-5]/,
                valid_length: [14]
              },
              'diners_club_international': {
                pattern: /^(30[0-5]|309|36|38|39)/,
                valid_length: [14]
              },
              'diners_club_us_and_canada': {
                pattern: /^(54|55)/,
                valid_length: [16]
              },
              'discover': {
                pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
                valid_length: [16]
              },
              'jcb': {
                pattern: /^35(2[89]|[3-8][0-9])/,
                valid_length: [16]
              },
              'laser': {
                pattern: /^(6304|670[69]|6771)/,
                valid_length: [16, 17, 18, 19]
              },
              'maestro': {
                pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
                valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
              },
              'mastercard': {
                pattern: /^5[1-5]/,
                valid_length: [16]
              },
              'visa': {
                pattern: /^4/,
                valid_length: [16]
              },
              'visa_electron': {
                pattern: /^(4026|417500|4508|4844|491(3|7))/,
                valid_length: [16]
              }
            };


        for (_j = 0, _len1 = requirement.length; _j < _len1; _j++) {
          var brand = requirement[_j],
              card = card_types[brand];

          if (typeof card != 'undefined' && card.pattern.test(value) && card.valid_length.indexOf(value.length) > -1) {
            return true;
          }

        }

        return false;
    };
    //
    window.ParsleyValidator.addValidator('creditcard',
        function (value, requirement) {
            var digit, n, _ref2, valid,
                sum = 0;


            value = value.replace(/[ -]/g, '');
            _ref2 = value.split('').reverse();

            for (n = _j = 0, _len1 = _ref2.length; _j < _len1; n = ++_j) {
                digit = _ref2[n];
                digit = +digit;

                if (n % 2) {
                    digit *= 2;

                    if (digit < 10) {
                        sum += digit;
                    } else {
                        sum += digit - 9;
                    }
                } else {
                    sum += digit;
                }
            }
            valid =  sum % 10 === 0;

            // Checks for specific brands
            if(requirement.length){
                return validateCreditCardBrand(value, requirement);
            }

            return valid;
        },32)
        .addMessage('en', 'creditcard', 'This Credit Card number is invalid or this brand is not supported.');


    //---------------------------------------
    // CCV Verification
    //---------------------------------------
    window.ParsleyValidator.addValidator('cvv',
        function (value) {
            return /^[0-9]{3,4}$/.test(value);
        }, 32)
        .addMessage('en', 'cvv', 'This value should be a valid CVV number');
}());
