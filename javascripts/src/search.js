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

  $('.search__select').chosen({
    allow_single_deselect: true,
    disable_search_threshold: 10,
    width: '100%'
  });

  $('.accordion-nav__item.search').remove();

  if (getQuery(urlParams) != false) {
    reapplySettings(urlParams);
    getSearchResults(urlParams);
  }
  else {
    setResultsMessage('You haven\'t searched for anything yet.')
  };

  /**
   * Populates search fields with parameters in URL.
   * @param {Object} urlParams - A URLSearchParams object.
   */
  function reapplySettings(urlParams) {
    $inputField.val(getQuery(urlParams));
    var filters = getFilters(urlParams);
    for (var filter in filters) {
      $('select[name=' + filter + ']').val(filters[filter]);
    }
  }

  /**
   * Clears all values out of search form.
   */
  function resetSearch() {
    $inputField.val('');
    $('.search__container > select').val('');
  }

  $resetButton.on('click', resetSearch);

  /**
   * Clears the search results area.
   */
  function clearSearchResults() {
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
  }

  /**
   * Gets the user-submitted query string from the URL.
   * @param {Object} urlParams - A URLSearchParams object.
   * @return {String} The user-submitted query string.
   */
  function getQuery(urlParams) {
    var query = urlParams.get('query');
    return query;
  }

  /**
   * Gets the user-selected filters from the URL.
   * @param {Object} urlParams - A URLSearchParams object.
   * @return {Object} An object full of filter category keys with their values.
   */
  function getFilters(urlParams) {
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
   * Converts a filter object into an array.
   * @param {Object} filters - Filters returned from the getFilters() function.
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
    var query = getQuery(urlParams);
    var filters = filtersToArray(getFilters(urlParams));
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
