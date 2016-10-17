define([
  'hbs/handlebars',
  'moment'
],
function (Handlebars, moment) {
  function formatDate (context) {
    return moment(context).format('D/MM/YYYY HH:mm');
  }

  Handlebars.registerHelper('formatDate', formatDate);
  return formatDate;
});

