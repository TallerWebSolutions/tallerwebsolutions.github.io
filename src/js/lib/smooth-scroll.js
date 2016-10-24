/**
 * Initialize smooth-scroll plugin.
 */

var jQuery = require('jquery')
  , config = { easing: 'swing', preventDefault: true };

require('jquery-smooth-scroll');

if (jQuery.fn.smoothScroll) jQuery('a.smooth-scroll[href^="#"]').smoothScroll(config);
