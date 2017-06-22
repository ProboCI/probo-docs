(function (window, $, PROBO) {

  // use List.js on recipes page
  if (List instanceof Function) {
    var options = {
        valueNames: [ 'name', 'recipe', 'highlight', 's', 'no' ]
    };
    var recipes = new List('recipes', options);
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
        $resultCount = $('.search__results-count'),
        $searchFilter = $('.search__filter');

    var proboSearch = new PROBO.ProboSearch(appId, searchKey, indexName, client, index, $inputField, $submitButton, $resetButton, $resultsArea, $result, $resultCount, $searchFilter);

    proboSearch.initialize();

    $submitButton.on('click', function(e) {
      e.preventDefault();
      proboSearch.updateQuery();
    });

    $inputField.on('blur', function (e) {
      proboSearch.updateQuery();
    });

    $resetButton.on('click', function (e) {
      e.preventDefault();
      proboSearch.resetSearch();
    });
  });

})(window || {}, jQuery, PROBO);
