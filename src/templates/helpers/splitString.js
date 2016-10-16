/**
 */
define([
  'hbs/handlebars'
],
function (Handlebars) {
  function splitString (string) {
    return (string.split(/[()]/))[1];
  }

  Handlebars.registerHelper('splitString', splitString);
  return splitString;

});

