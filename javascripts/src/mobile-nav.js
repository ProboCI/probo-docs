(function($) {
  $(document).ready(function() {
    var $menuContainer = $('#mainMenuContainer');
    var $menuToggle = $('#mobileMenuToggle', $menuContainer);
    var $menu = $('#mainMenu', $menuContainer);
    var $menuItemsWithChildren = $('.has-children', $menuContainer);

    $menuToggle.on('click', function(e) {
      var hidden = ($menu.attr('aria-hidden') == 'true') ? 'false' : 'true';
      e.preventDefault();
      $menuContainer.toggleClass('is-revealed');
      $menu.attr('aria-hidden', hidden);
    });

    $menuItemsWithChildren.each(function(i) {
      var $toggler = $('<span class="js-toggle-children accordion-nav__toggle-children"><i class="icon plus-to-minus"></i></span>');

      $(this).find('> a').after($toggler);

    });

    var $togglers = $('.js-toggle-children');
    $togglers.each(function(i) {
      var $thisToggler = $($togglers[i]);
      $(this).on('click', function(e) {
        // stop doing what a link usually does
        e.preventDefault();

        var hidden = ($thisToggler.siblings('ul').attr('aria-hidden') == 'true') ? 'false' : 'true';

        $thisToggler.parent('li').toggleClass('is-open');
        $thisToggler.siblings('ul').attr('aria-hidden', hidden);
      });
    });
  });
})(jQuery);
