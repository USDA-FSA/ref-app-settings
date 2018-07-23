var $ = require("jquery");

$('body').on('click', '[data-behavior~="growl-dismiss-delay"]', function(event) {

  var $self = $(this);
  var $target = $('#' + $self.attr('aria-controls'));

  setTimeout(function() {
    // this be lazy
    $target.find('.fsa-growl__close').click();
  }, 4500);

})
