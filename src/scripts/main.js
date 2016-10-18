requirejs.config({
  "baseUrl": "./src/",
  "paths": {
    "hbs": '.././bower_components/require-handlebars-plugin/hbs',
    "jquery": '.././bower_components/jquery/dist/jquery.min',
    "moment": '.././bower_components/momentjs/min/moment.min'
  }
});

requirejs([
  'scripts/util/windowresize',
  'scripts/imageviewer/imageviewer.controller'
],
function Main(WindowResize, ImageViewerController) {
  var imageViewer = new ImageViewerController($('#js-image-viewer'));
  WindowResize.init();
});
