/**
 */
define([
  'hbs/handlebars'
],
function (Handlebars) {
  function splitString (string) {
    var newString = (string.split(/[()]/))[1];
    return newString;
  }

  Handlebars.registerHelper('splitString', splitString);
  return splitString;

});

