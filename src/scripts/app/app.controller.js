define([
  'jquery',
  'hbs',
  './app.model',
  'hbs!templates/image-item'
],
function AppController($, HandleBars, AppModel, imageItem) {

  function Ctrl($container) {
    this.$container = $container;
    this.$backBtn = this.$container.find('#js-image-viewer-btn');
    this.$title = this.$container.find('#js-image-viewer-title');
    this.model = new AppModel();
    this.getData();
  }

  Ctrl.prototype.addListeners = function addListeners() {
    this.$container.find('.js-author').on('click', this.filter.bind(this, 'author'));
    this.$container.find('.js-tag').on('click', this.filter.bind(this, 'tag'));
    this.$backBtn.on('click', this.renderItems.bind(this, this.data, 'back'));

    $(document).on( 'scroll', this.lazyLoadImages.bind(this));
    //notes to self:
    // lazy load on resize, debounce??
    //split into modules
    //image sizes
    //rename app
    //combine watch task with npm start
  };

  Ctrl.prototype.filter = function filter(type, e) {
    e.preventDefault();
    var filterItem = $(e.currentTarget).attr("data-filter-item");
    var authorName = $(e.currentTarget).attr("data-author-name");
    var itemTitle = authorName ? authorName : filterItem;

    var filteredData = this.data.filter(function (item) {
      if (type === 'author') {
        return item.author_id === filterItem;
      }
      return item.tags.indexOf(filterItem) > -1;
    });

    this.renderItems(filteredData);
    this.updateUI(type, itemTitle);
  };

  Ctrl.prototype.getData = function getata() {
    this.model.get()
      .done(function cb(data) {
        console.log('data', data);
         this.sortItems(data.items);
      }.bind(this));
  };

  /**
  * Sort by date taken
  */
  Ctrl.prototype.sortItems = function sortItems(data) {
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
    this.$container.find('#js-image-items-wrapper').html(imageItem({data: data}));
    this.lazyLoadImages();
    this.addListeners();
    if (action === 'back') {
      this.$backBtn.addClass('image-viewer__btn--hidden');
      this.$title.html('&lsaquo;Insert witty title here&rsaquo;');
    }
  };

  Ctrl.prototype.lazyLoadImages = function lazyLoadImages(data) {
    var images = this.$container.find('img');
    var documentPosition = $(document).scrollTop() + $(window).height();
    $(images).each(function(index, image) {
      console.log('$(document).scrollTop()', $(document).scrollTop(), '$(window).height()', $(window).height());
              console.log('$(image).offset().top', $(image).offset().top);

        // add random px to documentPositon or else change placeholders size
      if ($(image).offset().top < documentPosition) {
        var dataSrc = $(image).attr("data-src");
        $(image).attr('src', dataSrc);
        $(image).parent().addClass('image-item__link--loaded');
      }
    });
  };

  /**
  * Update UI for filtered results
  */
  Ctrl.prototype.updateUI = function updateUI(type, itemTitle) {
    $('html,body').animate({ scrollTop: 0 }, '500');
    this.$title.html('Filtered on ' + type + ': '+ itemTitle);
    this.$backBtn.removeClass('image-viewer__btn--hidden');
  };


  return Ctrl;
});