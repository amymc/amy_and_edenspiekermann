/**
 */
define([
  'hbs/handlebars',
  'moment'
],
function (Handlebars, moment) {
  function formatTime (context) {
    return moment(context).format('D/MM/YYYY HH:mm');
  }

  Handlebars.registerHelper( 'formatTime', formatTime );
  return formatTime;

});

