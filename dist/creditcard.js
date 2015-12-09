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
    window.getCreditCardBrand = function(number){
      var _j, _len1,
      card_types = [
        {
          name: 'amex',
          pattern: /^3[47]/,
          valid_length: [15]
        },{
          name: 'china_union_pay',
          pattern: /^(62|88)/,
          valid_length: [16, 17, 18, 19]
        },{
          name: 'dankort',
          pattern: /^5019/,
          valid_length: [16]
        },{
          name: 'diners_club_carte_blanche',
          pattern: /^30[0-5]/,
          valid_length: [14]
        },{
          name: 'diners_club_international',
          pattern: /^(30[0-5]|309|36|38|39)/,
          valid_length: [14]
        },{
          name: 'diners_club_us_and_canada',
          pattern: /^(54|55)/,
          valid_length: [16]
        },{
          name: 'discover',
          pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
          valid_length: [16]
        },{
          name: 'jcb',
          pattern: /^35(2[89]|[3-8][0-9])/,
          valid_length: [16]
        },{
          name: 'laser',
          pattern: /^(6304|670[69]|6771)/,
          valid_length: [16, 17, 18, 19]
        },{
          name: 'maestro',
          pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
          valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
        },{
          name: 'mastercard',
          pattern: /^5[1-5]/,
          valid_length: [16]
        },{
          name: 'visa',
          pattern: /^4/,
          valid_length: [16]
        },{
          name: 'visa_electron',
          pattern: /^(4026|417500|4508|4844|491(3|7))/,
          valid_length: [16]
        }
      ];

      for (_j = 0, _len1 = card_types.length; _j < _len1; _j++) {
        var card = card_types[_j];
        if (card.pattern.test(number) && card.valid_length.indexOf(number.length) > -1) {
          return card.name;
        }
      }

      return null;
    };

    //
    window.ParsleyValidator.addValidator('creditcard',
        function (value, requirement) {
            var digit, n, _ref2, valid, _j, _len1,
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
            valid =  (sum % 10 === 0);

            // Checks for specific brands
            if(requirement.length){
              var valid_cards = requirement.split(','),
                  card = getCreditCardBrand(value);

              valid = (requirement.indexOf(card) > -1);
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

    //---------------------------------------
    // Expiry Date Verification
    //---------------------------------------
    window.ParsleyValidator.addValidator('expirydate',
        function (value) {
            var currentTime, expiry, prefix, ref;

            if(value.indexOf('/') === -1){
              return false;
            }

            var date = value.split('/'),
                month = date[0].trim(),
                year  = date[1].trim();

            if (!/^\d+$/.test(month)) {
              return false;
            }
            if (!/^\d+$/.test(year)) {
              return false;
            }
            if (!(parseInt(month, 10) <= 12)) {
              return false;
            }
            if (year.length === 2) {
              prefix = (new Date).getFullYear();
              prefix = prefix.toString().slice(0, 2);
              year = prefix + year;
            }
            expiry = new Date(year, month);
            currentTime = new Date;
            expiry.setMonth(expiry.getMonth() - 1);
            expiry.setMonth(expiry.getMonth() + 1, 1);
            return expiry > currentTime;
        }, 32)
        .addMessage('en', 'cvv', 'This value should be a valid date');
}());