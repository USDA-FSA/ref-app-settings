var $ = require("jquery");


$('body').on('click', '[data-behavior~="unsaved-changes"]', function(event) {

  var $self = $(this);
  var $component = $self.closest('.fsa-modal');

  function hackyModalClose() {

    var _modal = $component;

    // hide the modal by toggling aria attribute
    _modal.attr('aria-hidden', 'true');

    // Fix double scrollbar issue
    var _body = $('body');
    _body.removeClass('fsa-modal-scroll-fix')

    // set focus back to the originating element
    var _origin = $('[data-modal-origin]');

    _origin.removeAttr('data-modal-origin');
    _origin.attr('aria-expanded', 'false');
    _origin.focus();

  }

  if ($component.is('[data-changed]')) {
    alert('Save your changes dammit!')
  }
  else {
    hackyModalClose()
  }

})
