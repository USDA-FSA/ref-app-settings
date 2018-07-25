var $ = require("jquery");

$('body').on('blur', '[data-behavior~="validate-empty-field"]', function(event) {

  var $self = $(this);
  var $component = $self.closest('.fsa-field');

  if ($self.val() == '') {
    $component.addClass('fsa-field--error');
  }
  else {
    $component.removeClass('fsa-field--error');
  }

})
