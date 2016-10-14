/**
 */
define([
  'hbs/handlebars'
],
function (Handlebars) {
  function splitString (string, type) {
    var newStrings = string.split(/[() ]/);
    var newStringsHtml = [];
    if (type === 'author') {
      return newStrings[1]
    }
    for (var i = 0; i < newStrings.length; i++) {
       newStringsHtml.push('<span>' + newStrings[i] + '</span>');
    }
    return newStringsHtml.join(' ');
  }

  Handlebars.registerHelper('splitString', splitString);
  return splitString;

});

