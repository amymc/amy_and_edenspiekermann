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
    this.$container.on('click', '.js-author', this.filter.bind(this, 'author'));
    // lazy load??
    //sort by date taken?
    //read more widget?
    
  };

  Ctrl.prototype.filter = function filter(param) {
    console.log('filter', param);
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