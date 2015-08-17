/**
 * Initialize smooth-scroll plugin.
 */

var jQuery = require('jquery')
  , config = { easing: 'swing' };

require('jquery-smooth-scroll');

if (jQuery.fn.smoothScroll) jQuery('a[href^="#"]').smoothScroll(config);
