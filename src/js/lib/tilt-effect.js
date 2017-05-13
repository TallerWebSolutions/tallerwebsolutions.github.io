var jQuery = require('jquery')
var tiltjs = require('tilt.js')(jQuery)

var $container = tiltjs('#section-members ul li div').tilt({
  glare: true,
  maxGlare: .4,
  scale: 1.1,
  max: 10,
})
