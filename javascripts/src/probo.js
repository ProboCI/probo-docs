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

    //****************//
    // Algolia Search //
    //****************//
    var appId = 'SVDV4TVTRX';
    var searchKey = '9dff47d4e1874ea1dd1bbb323220ec88';
    var indexName = 'probo-docs';

    var client = algoliasearch(appId, searchKey);
    var index = client.initIndex(indexName);

    var $inputField = $('.search__input');
    var $submitButton = $('.search__submit');
    var $resultsArea = $('.search__results');

    var baseUrl = document.location.origin;
    var savedQuery = localStorage.getItem('searchQuery');

    $('#sidebarSubmit').on('click', function storeQuery(e) {
      localStorage.setItem('searchQuery', $('#sidebarInput').val());
    });

    if (savedQuery != null) {
      $inputField.val(savedQuery);
      getSearchResults(savedQuery);
      localStorage.removeItem('searchQuery');
    };

    $submitButton.on('click', getSearchResults($inputField.val()));

    $inputField.on('keypress', function(e) {
      var pressedKey = (event.keyCode ? event.keyCode : event.which);
      if (pressedKey == 13 ) {
        $submitButton.click();
      }
    });

    function clearSearchResults() {
      $('.search__result').remove();
      $('.search__results-count').remove();
    };

    function getSearchResults(query) {
      clearSearchResults();
      var resultsCount = 'No results found.';
      // Ensure we have a real query since empty queries match all in the index
      if (query != '') {
        index.search(query, function searchDone(err, content) {
          if (err) {
            console.error(err);
            return;
          };
          if (content.hits.length > 0) {
            resultsCount = content.hits.length + ' results';
          };
          $resultsArea.append('<div class="search__results-count">' + resultsCount + '</div>');
          for (var h in content.hits) {
            var hit = content.hits[h];
            var searchResult = '<div class="search__result">' +
              '<h2 class="h3 search__result-title"><a href="' + hit.url + '">' + hit.title + '</a></h2>' +
              '<div class="search__result-link">'+ baseUrl + hit.url + '</div>' +
              '<div class="search__result-text">' + hit.text + '</div>' +
              '</div>';
            $resultsArea.append(searchResult);
          };
        });
      }
      else {
        $resultsArea.append('<div class="search__results-count">' + resultsCount + '</div>');
      };
    };

  });

})(window || {}, jQuery, PROBO);
