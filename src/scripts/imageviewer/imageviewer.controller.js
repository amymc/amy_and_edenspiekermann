define([
  'jquery',
  'hbs',
  './imageviewer.model',
  'hbs!templates/image-item'
],
function ImageViewerController($, HandleBars, ImageViewerModel, imageItem) {

  function Ctrl($container) {
    this.$container = $container;
    this.$backBtn = this.$container.find('#js-image-viewer-btn');
    this.$title = this.$container.find('#js-image-viewer-title');
    this.model = new ImageViewerModel();
    this.getData();
  }

  Ctrl.prototype.addListeners = function addListeners() {
    this.$container.find('.js-author').on('click', this.filter.bind(this, 'author'));
    this.$container.find('.js-tag').on('click', this.filter.bind(this, 'tag'));
    this.$backBtn.on('click', this.renderItems.bind(this, this.data, 'back'));
    $(document).on('scroll', this.lazyLoadImages.bind(this));
    $(window).on('resizecomplete', function resizeComplete() {
      this.lazyLoadImages();
    }.bind(this));
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

  Ctrl.prototype.getData = function getData() {
    this.model.get('edenspiekermann')
      .done(function cb(data) {
         this.sortItems(data.items);
      }.bind(this));
  };

  Ctrl.prototype.lazyLoadImages = function lazyLoadImages(data) {
    var images = this.$container.find('img');
    var documentPosition = $(document).scrollTop() + $(window).height();
    $(images).each(function(index, image) {
      // add 100 - hack to account for the src placeholder gifs 
      // before images are loaded the gifs take up more height than the final images
      // so browser thinks images aren't in view 
      if ($(image).offset().top < documentPosition + 100) {
        var dataSrc = $(image).attr("data-src");
        $(image).attr('src', dataSrc);
        $(image).parent().addClass('image-item__link--loaded');
       }
    });
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
  * Update UI for filtered results
  */
  Ctrl.prototype.updateUI = function updateUI(type, itemTitle) {
    $('html,body').animate({ scrollTop: 0 }, '500');
    this.$title.html('Filtered on ' + type + ': '+ itemTitle);
    this.$backBtn.removeClass('image-viewer__btn--hidden');
  };


  return Ctrl;
});