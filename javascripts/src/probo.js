(function (window, $, PROBO) {

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
      mobileMenu.toggleMenu();
    });

    $overlay.on('click', function(e) {
      e.preventDefault();
      mobileMenu.toggleMenu();
    });

  });

})(window || {}, jQuery, PROBO);
