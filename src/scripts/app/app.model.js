/**
 * 
 */
define([
  'jquery'
],
function AppModel($) {
  console.log('model!');
  function Mdl() {
  }

  Mdl.prototype.get = function get() {
    console.log('mdl get!');

    return $.ajax({
      url: "https://api.flickr.com/services/feeds/photos_public.gne?tags=edenspiekermann&tagmode=all&format=json&jsoncallback=?",
      dataType: 'jsonp',
      jsonp: "callback",
      data: {
          format: "json"
      }
    });
  }

  return Mdl;
});
