//'use strict';
// toMoney | format any number to a currency
//
// locale (default: 'en')
// currency (default: 'USD')
// decimals (default: 0)
//
function notSupported(locale) {
  var number = 0;
  try {
    number.toLocaleString(locale);
  } catch (e) {
    return e.name === 'RangeError';
  }

  return false;
}

function bling(val, opts) {
  opts = opts || {};
  var ret = val;

  var options = { minimumFractionDigits: 0 };
  var locale = opts.hasOwnProperty('locale') ? opts.locale : 'en';

  if (opts.hasOwnProperty('decimals') && !isNaN(opts.decimals)) {
    options.minimumFractionDigits = opts.decimals;
  }

  options.style = 'currency';
  if (opts.hasOwnProperty('currency')
      && ( opts.currency.length > 2 && opts.currency.length < 4 )
      && !notSupported(opts.currency)) {
    options.currency = opts.currency.toUpperCase();
  } else {
    options.currency = 'USD';
  }

  return ret.toLocaleString(locale, options);
}

exports.default = bling;


/**
 * Format a number into currency
 *
 * Usage: accounting.formatMoney(number, symbol, precision, thousandsSep, decimalSep, format)
 * defaults: (0, "$", 2, ",", ".", "%s%v")
 *
 * Localise by overriding the symbol, precision, thousand / decimal separators and format
 * Second param can be an object matching `settings.currency` which is the easiest way.
 *
 * To do: tidy up the parameters
 */
var formatMoney = lib.formatMoney = function(number, symbol, precision, thousand, decimal, format) {
  // Resursively format arrays:
  if (isArray(number)) {
    return map(number, function(val){
        return formatMoney(val, symbol, precision, thousand, decimal, format);
        });
  }

// Clean up number:
number = unformat(number);

// Build options object from second param (if object) or all params, extending defaults:
var opts = defaults(
  (isObject(symbol) ? symbol : {
    symbol : symbol,
    precision : precision,
    thousand : thousand,
    decimal : decimal,
    format : format
  }),
  lib.settings.currency
),

// Check format (returns object with pos, neg and zero):
formats = checkCurrencyFormat(opts.format),

  // Choose which format to use for this value:
  useFormat = number > 0 ? formats.pos : number < 0 ? formats.neg : formats.zero;

  // Return with currency symbol added:
  return useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(number), checkPrecision(opts.precision), opts.thousand, opts.decimal));
  };

