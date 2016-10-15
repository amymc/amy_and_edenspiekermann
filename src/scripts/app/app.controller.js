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
    this.backBtn = this.$container.find('#js-image-viewer-btn');
    this.model = new AppModel();
    this.getData();
  }

  Ctrl.prototype.addListeners = function addListeners() {
    console.log('add addListeners');
    //click on user, filter by user
    this.$container.find('.js-author').on('click', this.filter.bind(this, 'author'));
    this.$container.find('.js-tag').on('click', this.filter.bind(this, 'tag'));
    this.backBtn.on('click', this.renderItems.bind(this, this.data, 'back'));

    $(document).on( 'scroll', this.lazyLoadImages.bind(this));
    //notes to self:
    // lazy load on resize, debounce??
    // format tags??, fix layout
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

    this.renderItems(filteredData);
    console.log('back btn', this.backBtn);
    this.backBtn.removeClass('image-viewer__btn--hidden');
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
    this.renderItems(data);
  };

  Ctrl.prototype.renderItems = function renderItems(data, action) {
    console.log('renderItems', this.data);
    this.$container.find('#js-image-viewer-inner').html(imageItem({data: data}));
    this.lazyLoadImages();
    this.addListeners();
    if (action === 'back') {
      this.backBtn.addClass('image-viewer__btn--hidden');
    }
  };

  Ctrl.prototype.lazyLoadImages = function lazyLoadImages(data) {
    var images = this.$container.find('img');
    var documentPosition = $(document).scrollTop() + $( window ).height();
    $(images).each(function(index, image) {
      if ($(image).offset().top < documentPosition) {
        var dataSrc = $(image).attr("data-src");
        $(image).attr('src', dataSrc);
        $(image).parent().addClass('image-item__link--loaded');
      }
    });
  };

  return Ctrl;
});