var ScrollReveal = require('scrollreveal');
var sr =  ScrollReveal({ duration: 2000 });
var jQuery = require('jquery');

sr.reveal('.services-stack', {
  duration: 0,
  scale: 1,
  opactity: 1,
  viewFactor: 0.9,
  distance: '0px',
  beforeReveal: function (el) {
    jQuery(el).addClass('rotate');
  }
}, 50)


sr.reveal('.img-slide main', {
  rotate: { x: 5, y: 0, z: 0 },
})

sr.reveal('.img-slide aside', {
  rotate: { x: 0, y: 5, z: 0 },
})
