requirejs.config({
  "baseUrl": "./src/",
  "paths": {
    "hbs": '.././bower_components/require-handlebars-plugin/hbs',
    "jquery": '.././bower_components/jquery/dist/jquery.min',
    "moment": '.././bower_components/momentjs/min/moment.min'
  }
});

requirejs([
  'scripts/app/app.controller'
],
function Main(AppController) {
  console.log('this', $('.image-viewer'));
  console.log('AppController', AppController);
  var app= new AppController($('.image-viewer'));
});
