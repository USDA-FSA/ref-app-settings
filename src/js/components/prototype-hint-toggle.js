var $ = require("jquery");

function ToggleHint() {

  $('html').toggleClass('HINT-SHOW');
  // $('.ds-home').css({"display":"block"});

  // var hintStatus = Cookies.get('hints');

  // if (hintStatus) {
  //   Cookies.remove('hints');
  // } else {
  //   Cookies.set('hints', true, { expires: 365 });
  // }

}

function HintStatus() {

  var hintStatus = Cookies.get('hints');
  var $hintCheckbox = $('#show-hints');

  if (hintStatus) {
    // console.log('There IS a "hints" cookie');
    $('html').addClass('HINT-SHOW');
    $hintCheckbox.prop('checked', true);
  }
  else {
    // console.log('There is NO "hints" cookie');
  }

}

$('body').keydown(function(event) {

  if(event.which == 112) { // F1

    var $hintCheckbox = $('#show-hints');

    if($hintCheckbox.is(':checked')) {
      $hintCheckbox.prop('checked', false);
    }
    else {
      $hintCheckbox.prop('checked', true);
    }

    ToggleHint();

    return false;
  }

});

$('body').on('change', '[data-behavior~="toggle-prototype-hints"]', function(event) {
  ToggleHint()
})

// HintStatus();
