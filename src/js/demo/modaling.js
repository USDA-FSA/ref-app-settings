var $ = require("jquery");

$('body').on('click', '[data-behavior~="unsaved-changes"]', function(event) {

  var $self = $(this);
  var $component = $self.closest('.fsa-modal');

  function hackyGrowlShow__centered(g) {
    g.attr('aria-hidden', 'false');
    $('#fsa-whiteout').attr('aria-hidden', 'false');
  }

  function hackyModalClose() {

    // TODO how to reference modal__close() from fsa-modal.js

    // All of the below is a straight jQuery equivalent of fsa-modal.js modal__close()

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
    hackyGrowlShow__centered($('#UNIQUE-ID-employee-unsaved'));
  }
  else {
    hackyModalClose()
  }

})

$('body').on('click', '[data-behavior~="brute-force-close-modals"]', function(event) {

  var $self = $(this);
  var $modals = $('.fsa-modal');

  $modals
    .attr('aria-hidden', 'true')
    .removeAttr('data-changed')
  ;

})

$('body').on('click', '[data-behavior~="add-employee"]', function(event) {

  var $self = $(this);
  var $target = $('#' + $self.data('added-employee'))

  $target
    .css({
      opacity          : '0',
      transition       : 'background 1.66s ease-in-out',
      backgroundColor  : '#fff1d2'
    })
    .removeAttr('hidden')
    .fadeTo('slow', '1', function() {
      $(this).css('background-color', 'transparent')
    })
  ;

})
