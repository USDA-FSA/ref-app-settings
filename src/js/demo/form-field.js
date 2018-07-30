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

$('body').on('keyup change', '[data-behavior~="track-change"]', function(event) {

  var $self = $(this);
  var $root = $self.closest('.fsa-modal');
  var $saver = $root.find('[data-saver]');

  $root.attr('data-changed', 'yup');
  $saver.removeAttr('disabled');

})

$('body').on('keyup', '[data-behavior~="all-filled"]', function(event) {

  console.log('Checking inputs');

  var $self = $(this);
  var $root = $self.closest('.fsa-modal');
  var $inputs = $root.find('.fsa-field__item');
  var $saver = $root.find('[data-saver]');

  var inputsComplete = true;

  $inputs.each(function() {

    console.log('input item');

    // If the input is not valid
    if (!$(this).val()){
      // Set variable to not valid
      inputsComplete = false;
      console.log('inputsComplete = false');
    }

    // If all variables are valid
    if (inputsComplete == true) {
      $saver.removeAttr('disabled');
      console.log('inputsComplete == true');
    }
    else {
      $saver.attr('disabled', 'disabled');
      console.log('elsed');
    }

  });

})
