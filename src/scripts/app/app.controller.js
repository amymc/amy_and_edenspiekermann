/**
 * 
 */
define([
  'jquery',
  'hbs',
  './app.model',
  'hbs!templates/image-item'
],
function AppController($, HandleBars, AppModel, imageItem) {

  function Ctrl($container) {
    console.log('this', this, AppModel, $container);
    this.$container = $container;
    this.model = new AppModel();
    this.getData();
  }

  Ctrl.prototype.addListeners = function addListeners() {
    console.log('add addListeners');
    //click on user, filter by user
    this.$container.find('.js-author').on('click', this.filter);
    // lazy load??
    //sort by date taken?
    //read more widget?
    
  };

  Ctrl.prototype.filter = function filter() {
    console.log('filter', this, $(this).attr("data-authorid"));

    //click on user, filter by user
    
  };

  Ctrl.prototype.getData = function getata() {
    this.model.get()
      .done(function cb(data) {
         this.data = data;
         this.renderData();
      }.bind(this));
  };

  Ctrl.prototype.renderData = function renderData() {
    console.log('renderData', this.data.items);
    this.$container.html(imageItem({data: this.data.items}));
    this.addListeners(); 
  };

  return Ctrl;
});