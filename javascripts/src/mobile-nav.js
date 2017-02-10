(function($, PROBO) {

  PROBO = PROBO || {};

  function MobileMenu(container, toggler, menu, children, overlay) {
    this.menuIsOpen = false;

    this.container = container;
    this.toggler = toggler;
    this.menu = menu;
    this.children = children;
    this.overlay = overlay;

    this.setup();
  }

  MobileMenu.prototype.setup = function() {
    this.children.each(function(i) {
      var $toggler = $('<span class="js-toggle-children accordion-nav__toggle-children"><i class="fa fa-angle-down" aria-hidden="true"></i></span>');

      $(this).find('> a').after($toggler);
    });

    var $togglers = $('.js-toggle-children');
    $togglers.each(function(i) {
      var $thisToggler = $($togglers[i]);
      var $icon = $('i', $thisToggler);
      $(this).on('click', function(e) {
        e.preventDefault();

        var hidden = ($thisToggler.siblings('ul').attr('aria-hidden') == 'true') ? 'false' : 'true';
        var $parentLi = $thisToggler.parent('li');

        $parentLi.toggleClass('is-open');
        $parentLi.toggleClass('is-closed');
        $thisToggler.siblings('ul').attr('aria-hidden', hidden);
        $icon.toggleClass('fa-angle-down fa-angle-up');
      });
    });
  };

  MobileMenu.prototype.openMenu = function() {
    $('body').addClass('menu-is-open');
    this.container.addClass('is-revealed');
    this.overlay.addClass('main-menu__overlay');
    this.menu.attr('aria-hidden', false);

    this.menuIsOpen = true;
  };

  MobileMenu.prototype.closeMenu = function() {
    $('body').removeClass('menu-is-open');
    this.container.removeClass('is-revealed');
    this.overlay.removeClass('main-menu__overlay');
    this.menu.attr('aria-hidden', true);

    this.menuIsOpen = false;
  };

  MobileMenu.prototype.toggleMenu = function() {
    (this.menuIsOpen) ? this.closeMenu() : this.openMenu();
  }

  return PROBO.MobileMenu = MobileMenu;

})(jQuery, PROBO);
