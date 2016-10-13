/**
 */
define([
  'hbs/handlebars',
  //'handlebars',
  'moment'
],
function (Handlebars, moment) {
  console.log('in the helper!', Handlebars);

  function convertToLocalTime (context) {
    console.log('helper', context);
    var localTime = moment(context).format('DD/MM/YYYY HH:mm A');
    return localTime;
  }

  Handlebars.registerHelper( 'convertToLocalTime', convertToLocalTime );
  return convertToLocalTime;

});

