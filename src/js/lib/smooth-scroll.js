/**
 * Initialize smooth-scroll plugin.
 */

var jQuery = require('jquery')
  , config = { easing: 'swing', preventDefault: false };

require('jquery-smooth-scroll');

if (jQuery.fn.smoothScroll) jQuery('a[href^="#"]').smoothScroll(config);
