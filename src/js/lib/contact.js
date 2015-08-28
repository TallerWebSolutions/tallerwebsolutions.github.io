/**
 * Initialize contact interactions.
 */

var jQuery = require('jquery')
  , remodal = require('remodal')
  , autosize = require('autosize')
  , parsley = require('parsleyjs')

  , $section = jQuery('#contact')
  , $header = $section.find('header h2')
  , $form = $section.find('form')
  , $inputs = $form.find(':input')
  , $textInputs = $inputs.filter('input[type=text]')
  , $selectInputs = $inputs.filter('select')
  , $textareas = $inputs.filter('textarea')
  , contactFormAction = $form.attr('action')
  , $contactFormSuccess = $section.find('#contact-form-success');


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
$form.parsley().on('submit', onContactSubmit);


/*
 * Methods.
 */

/**
 * Submit form via AJAX.
 */
function onContactSubmit(e) {
  e.preventDefault();

  jQuery.ajax({
    url: contactFormAction,
    data: $form.serialize(),
    type: "POST",
    // google always return an error
    error: showErrorMessage
  });

  return false;
}

/**
 * Replace form with submition message.
 */
function showErrorMessage() {
  $header.animate({
    opacity: 0
  }, 250);

  $form.fadeOut(250, function() {
    $contactFormSuccess.fadeIn(250);
  });
}

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
