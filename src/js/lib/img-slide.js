var jQuery = require('jquery');
var $window = jQuery(window);

jQuery(function () {
  var $container = jQuery('.img-slide');

  $container.on('inview', function(event, isInView) {
    if (isInView) {
      jQuery(this).addClass('img-slide-visible');
    }
  });
});

require('jquery-inview');
