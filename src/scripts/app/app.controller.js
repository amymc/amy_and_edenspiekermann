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
    this.$container.find('.js-author').on('click', this.filter.bind(this));
    // lazy load??
    //sort by date taken?
    //read more widget?
    
  };

  Ctrl.prototype.filter = function filter(e) {
    e.preventDefault();
    // console.log('filter', this, $(this).attr("data-authorid"));
     var authorId = $(e.currentTarget).attr("data-authorid");

    console.log('data', this.data, 'id', authorId);
    var filteredData = this.data.filter(function (item) {
      return item.author_id === authorId;
    });


    console.log(filteredData);
    this.renderData(filteredData);
    //click on user, filter by user
    
  };

  Ctrl.prototype.getData = function getata() {
    this.model.get()
      .done(function cb(data) {
         this.data = data.items;
         this.renderData(this.data);
      }.bind(this));
  };

  Ctrl.prototype.renderData = function renderData(data) {
    console.log('renderData', this.data);
    this.$container.html(imageItem({data: data}));
    this.addListeners(); 
  };

  return Ctrl;
});