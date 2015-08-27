/**
 * Initialize Google Analytics.
 */

var jQuery = require('jquery')
  , gaCode = 'UA-32561539-1'
  , $window = jQuery(window)
  , location = window.location
  , sentPages = [], page;


/*
 * Google Analytics snippet:
 */

(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
e=o.createElement(i);r=o.getElementsByTagName(i)[0];
e.src='https://www.google-analytics.com/analytics.js';
r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));

ga('create', gaCode, 'auto');

// Execute first page view.
pageView();


/*
 * Register event listeners.
 */

$window.on('hashchange', pageView);


/*
 * Helpers.
 */

/**
 * Sends a pageview event to Google Analytics, including hash and considering
 * section titles.
 */
function pageView() {
  var page = location.pathname + location.search + location.hash;

  if (sentPages.indexOf(page = location.pathname + location.search + location.hash) == -1) {
    sentPages.push(page);
    console.log(page);
    ga('send', 'pageview', {
      page: page,
      title: location.hash ? jQuery(location.hash).find('h2').text() : document.title
    });
  }
}
