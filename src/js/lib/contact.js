/**
 * Initialize contact interactions.
 */

var jQuery = require('jquery')
  , remodal = require('remodal')
  , autosize = require('autosize')
  , parsley = require('../vendor/parsleyjs')

  , $document = jQuery(document)
  , $section = jQuery('#contact')
  , $header = $section.find('header h2')
  , $form = $section.find('form')
  , $inputs = $form.find(':input')
  , $textInputs = $inputs.filter('input[type=text]')
  , $selectInputs = $inputs.filter('select')
  , $textareas = $inputs.filter('textarea')
  , contactFormAction = $form.attr('action')
  , $contactFormSuccess = $section.find('#contact-form-success');

// Initiate form validator.
$form.parsley();


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
$form.on('submit', onContactSubmit);
$document.on('opened', '.remodal', onEnterContactModal);

/*
 * Methods.
 */

/**
 * Submit form via AJAX.
 */
function onContactSubmit(e) {
  e.preventDefault();

  var inputs = $form.find(':input').serializeArray();
  RdIntegration.post(inputs, function (res, message) {
    showErrorMessage();
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

/**
 * Executed everytime we enter the contact form modal.
 */
function onEnterContactModal(e) {
  if ($section.is(this)) {
    $inputs.filter(':visible').eq(0).focus();
  }
}
