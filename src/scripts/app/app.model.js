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

  Mdl.prototype.get = function get(tag) {
    return $.ajax({
      //url 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&' + APIkey + '&photo_id=' + data.photos.photo[i].id + '&format=json&nojsoncallback=1
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
