/**
 * @file Main Taller website script.
 */

var jQuery = $ = require('jquery');

// jQuery plugins.
require('jquery-smooth-scroll');

// Instantiate smooth scroll on all links.
if ($.fn.smoothScroll) $('a[href^="#"]').smoothScroll({
  easing: 'swing'
});
