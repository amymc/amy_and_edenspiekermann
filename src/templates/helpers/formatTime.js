/**
 */
define([
  'hbs/handlebars',
  'moment'
],
function (Handlebars, moment) {
  function formatTime (context) {
    var localTime = moment(context).format('dddd, MMMM Do YYYY, HH:mm');
    return localTime;
  }

  Handlebars.registerHelper( 'formatTime', formatTime );
  return formatTime;

});

