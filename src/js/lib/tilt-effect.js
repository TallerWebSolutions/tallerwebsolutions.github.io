var jQuery = require('jquery');
var tilt = require('vanilla-tilt');

var $window = jQuery(window);

jQuery(function () {
  var $container = jQuery('#section-members ul li');

  $container.on('inview', function(event, isInView) {
    if (isInView) {
      tilt.init(this, {
        scale: 1.1,
        max: 20
      })
    }
  });
});

require('jquery-inview');
