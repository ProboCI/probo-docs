(function (window, $, PROBO) {

  // $(document).ready(function () {
  //   use tinynav
  //   if ($.fn.tinyNav instanceof Function) {
  //     $('#sidebar-first .accordion-nav').tinyNav();
  //   }
  //
  //   $('.accordion-nav').navgoco({
  //     caretHtml: '<i class="icon plus-to-minus"></i>',
  //     accordion: true,
  //     openClass: 'open',
  //     save: true,
  //     cookie: {
  //       name: 'navgoco',
  //       expires: false,
  //       path: '/'
  //     }
  //   });
  // });

  // use List.js on recipes page
  if (List instanceof Function) {
    var options = {
        valueNames: [ 'name', 'recipe', 'highlight', 's', 'no' ]
    };
    var recipes = new List('recipes', options);
  }

  $(document).ready(function(e) {
    var $menuContainer = $('#mainMenuContainer');
    var $menuToggle = $('#mobileMenuToggle', $menuContainer);
    var $menu = $('#mainMenu', $menuContainer);
    var $menuItemsWithChildren = $('.has-children');
    var $overlay = $('#overlay', $menuContainer);

    var mobileMenu = new PROBO.MobileMenu($menuContainer, $menuToggle, $menu, $menuItemsWithChildren, $overlay);

    $menuToggle.on('click', function(e) {
      e.preventDefault();
      (mobileMenu.menuIsOpen) ? mobileMenu.closeMenu() : mobileMenu.openMenu();
    });

    $overlay.on('click', function(e) {
      e.preventDefault();
      (mobileMenu.menuIsOpen) ? mobileMenu.closeMenu() : mobileMenu.openMenu();
    });
  });

})(window || {}, jQuery, PROBO);
