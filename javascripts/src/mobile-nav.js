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

  function toggleItem($toggler, $parent, $icon) {
    $parent.toggleClass('is-open');
    $parent.toggleClass('is-closed');

    var hidden = ($toggler.siblings('ul').attr('aria-hidden') == 'true') ? 'false' : 'true';
    $toggler.siblings('ul').attr('aria-hidden', hidden);

    $icon.toggleClass('fa-angle-down fa-angle-up');
  }

  MobileMenu.prototype.setup = function() {
    this.children.each(function(i) {
      var $toggler = $('<span class="js-toggle-children accordion-nav__toggle-children"><i class="fa fa-angle-down" aria-hidden="true"></i></span>');

      $(this).find('> a').after($toggler);
    });

    var $togglers = $('.js-toggle-children');
    $togglers.each(function(i) {
      var $thisToggler = $($togglers[i]);
      var $parentLi = $thisToggler.parent('li');
      var $icon = $('i', $thisToggler);

      $(this).on('click', function(e) {
        e.preventDefault();
        toggleItem($thisToggler, $parentLi, $icon);
      });

      var currentSection = window.location.pathname.split( '/' )[1];
      if ($parentLi.children('a').attr('href') === '/' + currentSection + '/') {
        toggleItem($thisToggler, $parentLi, $icon);
      }
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
