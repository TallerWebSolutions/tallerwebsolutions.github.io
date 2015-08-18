/**
 * Initialize contact interactions.
 */

var jQuery = require('jquery')
  , remodal = require('remodal')
  , $section = jQuery('#contact')
  , $form = $section.find('form')
  , $inputs = $form.find(':input')
  , $textInputs = $inputs.filter('input[type=text]')
  , $selectInputs = $inputs.filter('select');


/*
 * Process elements.
 */

$selectInputs.each(mountSelectMarkup);


/*
 * Register listeners.
 */

$inputs.on('focusin focusout', onFocusChange);


/*
 * Methods.
 */

/**
 * Mount a custom markup for selects, to improve styling.
 */
function mountSelectMarkup() {
  var $select = jQuery(this)
    , $options = $select.find('option')
    , $fakeSelect =   
}

/**
 * Update states after focus change.
 */
function onFocusChange(e) {
  var $textInputs = jQuery(this)
    , $label = $textInputs.closest('label');

  // Toggle state.
  $label.toggleClass('focused', e.type == 'focusin');

  // Add permanent state, if fulfiled.
  $label.toggleClass('fulfilled', $textInputs.val() !== '');
}
