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

   (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
   })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

 ga('create', 'UA-48708413-2', 'auto', {'allowLinker': true});
 ga('require', 'linker');
 ga('linker:autoLink', ['taller.net.br'] );


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
