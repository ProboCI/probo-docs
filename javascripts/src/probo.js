(function (window, $, PROBO) {

  // use List.js on examples page
  if (List instanceof Function) {
    var options = {
        valueNames: [ 'name', 'example', 'highlight', 's', 'no' ]
    };
    var examples = new List('examples', options);
  }

  $(document).ready(function(e) {
    // Mobile menu
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

    // Algolia search
    var appId = 'SVDV4TVTRX',
        searchKey = '9dff47d4e1874ea1dd1bbb323220ec88',
        indexName = 'probo-docs',
        client = algoliasearch(appId, searchKey),
        index = client.initIndex(indexName),
        $inputField = $('.search__input'),
        $submitButton = $('.search__submit'),
        $resetButton = $('.search__reset'),
        $resultsArea = $('.search__results'),
        $result = $('.search__result'),
        $searchFilter = $('.search__filter');

    var proboSearch = new PROBO.ProboSearch(appId, searchKey, indexName, client, index, $inputField, $submitButton, $resetButton, $resultsArea, $result, $searchFilter);

    // Chosen settings
    $('select.search__select')
      .chosen({
        allow_single_deselect: true,
        disable_search_threshold: 10,
        inherit_select_classes: true,
        width: '100%'
      })
      .change(function (e) {
        proboSearch.updateQuery();
      });

    // Remove sidebar nav mini search form.
    $('.accordion-nav__item.search').remove();

    proboSearch.initialize();

    $submitButton.on('click', function(e) {
      e.preventDefault();
      proboSearch.updateQuery();
    });

    $resetButton.on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      proboSearch.resetSearch();
    });
  });

})(window || {}, jQuery, PROBO);
