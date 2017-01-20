var jQuery = require('jquery');
var $window = jQuery(window);

jQuery(function () {
  var $container = jQuery('.img-slide');
  var $servicesStack = jQuery('.services-stack');

  $container.on('inview', function(event, isInView) {
    if (isInView) {
      jQuery(this).addClass('img-slide-visible');
    }
  });

  $servicesStack.on('inview', function(event, isInView) {
    if (isInView) {
      jQuery(this).addClass('rotate');
    }
  });
});

require('jquery-inview');
