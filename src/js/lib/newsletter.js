/**
 * Initialize newsletter interactions.
 */

var jQuery = require('jquery')

  , $document = jQuery(document)
  , $wrapper = $document.find('#news-main')
  , $form = $document.find('#form-newsletter');

/*
 * Register listeners.
 */

$form.on('submit', onNewsletterSubmit);

/*
 * Methods.
 */

/**
 * Submit form via AJAX.
 */
function onNewsletterSubmit(e) {
  e.preventDefault();

  var inputs = $form.find(':input').serializeArray();
  RdIntegration.post(inputs, function (res, message) {
    $wrapper.addClass('status-' + message);
  });

  return false;
}
