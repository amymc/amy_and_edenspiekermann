/**
 */
define([
  'hbs/handlebars'
],
function (Handlebars) {
  function splitString (string, type) {
    var newStrings = string.split(/[() ]/);
    if (type === 'author') {
      return newStrings[1]
    }
    return newStrings.join(' ');
  }

  Handlebars.registerHelper('splitString', splitString);
  return splitString;

});

