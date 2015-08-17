/**
 * Initialize scroll-spying.
 */

var jQuery = require('jquery')
  , sections = mapSections()
  , currentSection = null
  , $window = jQuery(window)
  , location = window.location
  , section;


/*
 * Register listeners.
 */

$window.on('scroll', updateHash);


/**
 * Updates location hash based on currently viewing section.
 */
function updateHash() {
  var scrollY = this.scrollY
    , center = window.innerHeight / 2 + window.scrollY
    , hash;

  section = sections.filter(function (section) {
    var offset = section.$element.offset();
    return offset.top - scrollY < center && offset.top + section.element.offsetHeight > center;
  })[0] || null;

  // Update hash, when necessary.
  if (currentSection !== section) {
    currentSection = section;
    window.history.pushState(null, null, '#' + (currentSection && currentSection.hash || ''));
    $window.trigger('hashchange');
  }
}

/**
 * Retrieve sections.
 */
function mapSections() {
  return jQuery('body > section').toArray().map(function (section) {
    var $element = jQuery(section);
    return {
      element: section,
      $element: $element,
      hash: $element.attr('id')
    };
  });
}
