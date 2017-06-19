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
    var appId = 'SVDV4TVTRX',
        searchKey = '9dff47d4e1874ea1dd1bbb323220ec88',
        indexName = 'probo-docs';

    var client = algoliasearch(appId, searchKey),
        index = client.initIndex(indexName);

    var $inputField = $('.search__input'),
        $submitButton = $('.search__submit'),
        $resultsArea = $('.search__results');

    var urlParams = new URLSearchParams(window.location.search);

    if (document.location.pathname.substring(0, 7) === '/search') {
      $('.accordion-nav__item.search').remove();

      if (getQuery(urlParams) != false) {
        clearSearchResults();
        getSearchResults(urlParams);
      };
    };

    function clearSearchResults() {
      $('.search__result').remove();
      $('.search__results-count').remove();
    };

    function getQuery(urlParams) {
      var query = urlParams.get('query');
      return query;
    }

    function getFilters(urlParams) {
      // Loop through URL parameters Iterator to get filter values.
      // gulp-uglify does not support for...of loops.
      var params = urlParams.entries();
      var nextParam = params.next().value;
      var filters = [];

      do {
        if (nextParam[0] != 'query') {
          filters.push(nextParam[0] + ':' + nextParam[1]);
        }
        nextParam = params.next().value;
      }
      while (nextParam != undefined);
      return filters;
    };

    function getSearchResults(urlParams) {
      var query = getQuery(urlParams);
      var filters = getFilters(urlParams);
      var searchObj = {
        query: query,
        facetFilters: filters
      };

      // Ensure we have a real query since empty queries match all in the index
      if (query != '') {
        index.search(searchObj,
        function searchDone(err, content) {
          if (err) {
            console.error(err);
            return;
          }

          var resultsLabel = content.hits.length > 1 ? ' results' : ' result';
          var resultsMessage = 'Showing ' + content.hits.length + resultsLabel + ' for "' + query + '"';
          $('.page-title').replaceWith('<h1 class="page-title">' + resultsMessage + '</h1>');

          var results = [];
          for (var h in content.hits) {
            var hit = content.hits[h];
            var searchResult = '<div class="search__result">' +
              '<h2 class="h3 search__result-title"><a href="' + hit.url + '">' + hit.title + '</a></h2>' +
              '<div class="search__result-link">'+ document.location.origin + hit.url + '</div>' +
              '<div class="search__result-text">' + hit.text + '</div>' +
              '</div>';
            results.push(searchResult);
          }
          $resultsArea.append(results.join(''));
        });
      }
      else {
        $resultsArea.append('<div class="search__results-count">' + resultsCount + '</div>');
      }
    };

  });

})(window || {}, jQuery, PROBO);
