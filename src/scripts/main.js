requirejs.config({
  "baseUrl": "./src/",
  "paths": {
    "hbs": '.././bower_components/require-handlebars-plugin/hbs',
    "jquery": '.././bower_components/jquery/dist/jquery.min',
    "moment": '.././bower_components/momentjs/min/moment.min'
  }
});

requirejs([
  'scripts/imageviewer/imageviewer.controller'
],
function Main(ImageViewerController) {
  var imageViewer = new ImageViewerController($('#js-image-viewer'));
});
