/**
 * Initialize Google Analytics.
 */

var jQuery = require('jquery')
  , $window = jQuery(window)
  , location = window.location
  , sentPages = [], page;


/*
 * Google Analytics snippet:
 */

 var _gaq = _gaq || [];
 _gaq.push(['_setAccount', 'UA-48708413-2']);
 _gaq.push(['_setDomainName', 'taller.net.br']);

 _gaq.push(['_trackPageview']);

 (function() {
 var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
 ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www')
 + '.google-analytics.com/ga.js';
 var s = document.getElementsByTagName('script')[0];
 s.parentNode.insertBefore(ga, s);
   })();


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
