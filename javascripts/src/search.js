(function($) {
  'use strict';

  var appId = 'SVDV4TVTRX',
      searchKey = '9dff47d4e1874ea1dd1bbb323220ec88',
      indexName = 'probo-docs';

  var client = algoliasearch(appId, searchKey),
      index = client.initIndex(indexName);

  var $inputField = $('.search__input'),
      $submitButton = $('.search__submit'),
      $resetButton = $('.search__reset'),
      $resultsArea = $('.search__results');

  var urlParams = new URLSearchParams(window.location.search);

  // Chosen settings
  $('.search__select').chosen({
    allow_single_deselect: true,
    disable_search_threshold: 10,
    width: '100%'
  });

  // Remove sidebar nav mini search form.
  $('.accordion-nav__item.search').remove();

  // Initialize search state from URL params.
  if (getQueryFromUrl(urlParams) != false) {
    applyUrlValues(urlParams)
    getSearchResults(urlParams);
  }
  else {
    setResultsMessage('You haven\'t searched for anything yet.')
  };

  // User interactions
  $submitButton.on('click', function(e) {
    e.preventDefault();
    updateQuery();
  });

  $inputField.on('blur', function (e) {
    updateQuery();
  });

  $('.chosen-results > li').on('click', function (e) {
    updateQuery();
  });

  $resetButton.on('click', function (e) {
    resetSearch();
  });

  /**
   * Compares search params in URL with search form values and runs a new
   * search if any form value has changed.
   */
  function updateQuery() {
    // Structure filters as a string to append to new URL.
    var filters = getFiltersFromSearchForm();
    var filterString = '&';
    for (var key in filters) {
      var value = filters[key];
      filterString += key + '=' + value + '&';
    }

    var oldUrl = window.location.pathname + window.location.search;
    var newUrl = '/search/?query=' + getQueryFromSearchForm() + filterString;
    if (newUrl != oldUrl) {
      clearSearchResults();
      window.history.pushState({}, '', newUrl);
      getSearchResults(urlParams);
      console.log("Query updated!");
    }
  }

  /**
   * Populates search fields with parameters in URL.
   * @param {Object} urlParams - A URLSearchParams object.
   */
  function applyUrlValues(urlParams) {
    // Update query
    $inputField.val(getQueryFromUrl(urlParams));

    // Update form filters
    var formFilters = getFiltersFromSearchForm();
    var urlFilters = getFiltersFromUrl(urlParams);
    for (var formFilter in formFilters) {
      var formFilterVal = formFilters[formFilter];
      for (var urlFilter in urlFilters) {
        // Compare filter IDs.
        if (urlFilter == formFilter) {
          var urlFilterVal = urlFilters[urlFilter];
          // Compare matching filters' values.
          if (formFilterVal != urlFilterVal) {
            // Find DOM element with id/name equal to filter ID and update its
            // "value" with urlFilterVal.
            $('select[name=' + formFilter + '] ~ .chosen-container > a > span').text(urlFilterVal);
          }
        }
      }
    }
  }

  /**
   * Clears all values out of search form.
   */
  function resetSearch() {
    $inputField.val('');
    $('.search__container > select').val('');
  }

  /**
   * Clears the search results area.
   */
  function clearSearchResults() {
    console.log('Clearing search results.');
    $('.search__result').remove();
    $('.search__results-count').remove();
  };

  /**
   * Sets a message in the results area. Intended for use when a search does
   * not return results.
   * @param {String} message - The message to print.
   */
  function setResultsMessage(message) {
    $resultsArea.append('<p class="search__results-count">' + message + '</p>');
  };

  /**
   * Gets the user-submitted query string from the URL.
   * @param {Object} urlParams - A URLSearchParams object.
   * @return {String} The user-submitted query string.
   */
  function getQueryFromUrl(urlParams) {
    var query = urlParams.get('query');
    return query;
  };

  /**
   * Gets the query string from the search form.
   * @return {String} The user-submitted query string.
   */
  function getQueryFromSearchForm() {
    return $inputField.val();
  };

  /**
   * Gets filter values from the URL.
   * @param {Object} urlParams - A URLSearchParams object.
   * @return {Object} An object full of filter keys with their values.
   */
  function getFiltersFromUrl(urlParams) {
    // Loop through URL parameters Iterator to get filter values.
    // gulp-uglify does not support for...of loops.
    var params = urlParams.entries();
    var nextParam = params.next().value;
    var filters = {};
    do {
      if (nextParam[0] != 'query') {
        filters[nextParam[0]] = nextParam[1];
      }
      nextParam = params.next().value;
    }
    while (nextParam != undefined);
    return filters;
  };

  /**
   * Gets values from select list filters.
   * @return {Object} An object full of filter keys with their values.
   */
  function getFiltersFromSearchForm() {
    var filters = $('.search__filter');
    var filtersObj = {};
    filters.each(function (e) {
      var $categoryId = jQuery('select', this).attr('id');
      var $filterVal = jQuery('.chosen-container > a:not(.chosen-default) > span', this).text();
      filtersObj[$categoryId] = $filterVal;
    });
    return filtersObj;
  };

  /**
   * Converts a filter object into an array.
   * @param {Object} filters - A filters object returned from a getFilters function.
   * @return {Array} An array of strings, formatted as 'key:value'.
   */
  function filtersToArray(filters) {
    var filterArray = [];
    for (var key in filters) {
      var value = filters[key];
      filterArray.push(key + ':' + value)
    }
    return filterArray;
  }

  /**
   * Gets search results from the index and prints them to the results area.
   * @param {Object} urlParams - A URLSearchParams object.
   */
  function getSearchResults(urlParams) {
    console.log('Search initiated!');
    var query = getQueryFromSearchForm(urlParams);
    var filters = filtersToArray(getFiltersFromSearchForm(urlParams));
    var searchObj = {
      query: query,
      facetFilters: filters
    };
    index.search(searchObj,
    function searchDone(err, content) {
      if (err) {
        console.error(err);
        return;
      }
      var resultsLabel = content.hits.length == 1 ? ' result' : ' results';
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
  };

})(jQuery);
