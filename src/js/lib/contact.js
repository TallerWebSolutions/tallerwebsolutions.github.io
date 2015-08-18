/**
 * Initialize contact interactions.
 */

var jQuery = require('jquery')
  , remodal = require('remodal')
  , autosize = require('autosize')
  , $section = jQuery('#contact')
  , $form = $section.find('form')
  , $inputs = $form.find(':input')
  , $textInputs = $inputs.filter('input[type=text]')
  , $selectInputs = $inputs.filter('select')
  , $textareas = $inputs.filter('textarea');


/*
 * Process elements.
 */

$textareas.each(function () {
  autosize(this);
  jQuery(this).outerHeight(40.5);
}).on('focusout', function () {
  if (!jQuery(this).val()) jQuery(this).outerHeight(40.5);
});


/*
 * Register listeners.
 */

$inputs.on('focusin focusout', onFocusChange);


/*
 * Methods.
 */

/**
 * Update states after focus change.
 */
function onFocusChange(e) {
  var $input = jQuery(this)
    , $label = $input.closest('label');

  // Toggle state.
  $label.toggleClass('focused', e.type == 'focusin');

  // Add permanent state, if fulfiled.
  $label.toggleClass('fulfilled', Boolean($input.val()));
}
