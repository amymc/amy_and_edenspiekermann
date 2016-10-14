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
    //notes to self:
    // lazy load??
    //sort by date taken?
    // routing??
    // display tags??
    //filter by tags
    //split into modules
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
         this.sortData(this.data);
         //this.renderData(this.data);
      }.bind(this));
  };

  /**
  * Sort by date taken
  */
  Ctrl.prototype.sortData = function sortData(data) {
    //iterate over array,
    // compare each date takem with previous
    console.log('before sort', this.data);
    //var sortedData = this.data.slice(0).sort(function(a, b) {
    this.data.sort(function(a, b) {
     // console.log('a', a.date_taken, 'b',new Date(b.date_taken).getTime() - new Date(a.date_taken).getTime() );
      //most recent first
      return new Date(b.date_taken).getTime() - new Date(a.date_taken).getTime();
    });
    //console.log('sortData', sortedData );
    this.renderData(this.data);
  };

  Ctrl.prototype.renderData = function renderData(data) {
    console.log('renderData', this.data);
    this.$container.html(imageItem({data: data}));
    this.addListeners(); 
  };

  return Ctrl;
});