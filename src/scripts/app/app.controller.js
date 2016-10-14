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
    this.$container.find('.js-author').on('click', this.filter.bind(this, 'author'));
    this.$container.find('.js-tag').on('click', this.filter.bind(this, 'tag'));
    //notes to self:
    // lazy load??
    //sort by date taken?
    // routing??
    // format tags??
    //split into modules
  };

  Ctrl.prototype.filter = function filter(type, e) {
    e.preventDefault();
    var filterItem = $(e.currentTarget).attr("data-filter-item");

    var filteredData = this.data.filter(function (item) {
      if (type === 'author') {
        return item.author_id === filterItem;
      }
      return item.tags.indexOf(filterItem) > -1;
    });

    this.renderData(filteredData);
  };

  Ctrl.prototype.getData = function getata() {
    this.model.get()
      .done(function cb(data) {
         this.sortData(data.items);
      }.bind(this));
  };

  /**
  * Sort by date taken
  */
  Ctrl.prototype.sortData = function sortData(data) {
    data.sort(function(a, b) {
      //most recent first
      return new Date(b.date_taken).getTime() - new Date(a.date_taken).getTime();
    });
    this.separateTags(data);
  };

  /**
  * Separate tags into an array
  */
  Ctrl.prototype.separateTags = function separateTags(data) {
    for (var i=0; i < data.length; i++) {
      var tagsArray = data[i].tags.split(' ');
      data[i].tags = tagsArray;
    }
    this.data = data;
    this.renderData(data);
  };

  Ctrl.prototype.renderData = function renderData(data) {
    console.log('renderData', this.data);
    this.$container.html(imageItem({data: data}));
    this.addListeners(); 
  };

  return Ctrl;
});