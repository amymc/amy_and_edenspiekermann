/**
 * 
 */
define([
  'jquery'
],
function ImageViewerModel($) {
  function Mdl() {
  }

  Mdl.prototype.get = function get(tag) {
    return $.ajax({
      url: 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + tag + '&tagmode=all&format=json&jsoncallback=?',
      dataType: 'jsonp',
      jsonp: "callback",
      data: {
          format: "json"
      }
    });
  }

  return Mdl;
});
