define([
  'jquery'
],
function WindowResize($) {
  function Ctrl() {
    var resizeTimer;
    $(window).on('resize', function debounceResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function setTimeout() {
        $(window).trigger('resizecomplete');
      }, 250);
    });
  }

  return {
    init: Ctrl
  };
});
