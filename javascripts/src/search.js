(function($, PROBO) {
  'use strict';

  PROBO = PROBO || {};

  function ProboSearch(appId, searchKey, indexName, client, index, inputField, submitButton, resetButton, resultsArea, result, resultCount, searchFilter) {
    this.client = algoliasearch(appId, searchKey);
    this.index = client.initIndex(indexName);
    this.urlParams = new URLSearchParams(window.location.search);

    this.inputField = inputField;
    this.submitButton = submitButton;
    this.resetButton = resetButton;
    this.resultsArea = resultsArea;
    this.result = result;
    this.resultCount = resultCount;
    this.searchFilter = searchFilter;
  }

  ProboSearch.prototype.initialize = function () {
    var proboSearch = this;
    // Chosen settings
    $('.search__select').chosen({
      allow_single_deselect: true,
      disable_search_threshold: 10,
      inherit_select_classes: true,
      width: '100%'
    }).change(function (e) {
      proboSearch.updateQuery();
    });

    // Remove sidebar nav mini search form.
    $('.accordion-nav__item.search').remove();

    // Initialize search state from URL params.
    this.applyUrlValues(this.urlParams)
    this.getSearchResults(this.urlParams);

    $(window).keydown(function(event){
      if(event.keyCode == 13) {
        event.preventDefault();
        proboSearch.updateQuery();
      }
    });
  };

  /**
   * Compares search form values with search params in URL and updates the URL
   * params and runs a new search if any form value has changed.
   */
  ProboSearch.prototype.updateQuery = function() {
    // Structure filters as a string to append to new URL.
    var filters = this.getFiltersFromSearchForm();
    var filterString = '&';
    for (var key in filters) {
      var value = filters[key];
      filterString += key + '=' + value + '&';
    }

    var oldUrl = window.location.pathname + window.location.search;
    var newUrl = '/search/?query=' + this.getQueryFromSearchForm() + filterString;
    if (newUrl != oldUrl) {
      this.clearSearchResults();
      window.history.pushState({}, '', newUrl);
      this.getSearchResults(this.urlParams);
    }
  };

  /**
   * Populates search fields with parameters in URL.
   * @param {Object} urlParams - A URLSearchParams object.
   */
  ProboSearch.prototype.applyUrlValues = function(urlParams) {
    // Update query
    this.inputField.val(this.getQueryFromUrl(urlParams));

    // Update form filters
    var formFilters = this.getFiltersFromSearchForm();
    var urlFilters = this.getFiltersFromUrl(urlParams);
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
            $('select[name=' + formFilter + ']').val(urlFilterVal).trigger('chosen:updated');
          }
        }
      }
    }
  }

  /**
   * Clears all values out of search form.
   */
  ProboSearch.prototype.resetSearch = function() {
    this.inputField.val('');
    $('select').val('').trigger('chosen:updated');
    this.updateQuery();
  }

  /**
   * Clears the search results area.
   */
  ProboSearch.prototype.clearSearchResults = function () {
    this.result.remove();
    this.resultCount.remove();
  };

  /**
   * Sets a message in the results area. Intended for use when a search does
   * not return results.
   * @param {String} message - The message to print.
   */
  ProboSearch.prototype.setResultsMessage = function (message) {
    this.resultsArea.append('<p class="search__results-count">' + message + '</p>');
  };

  /**
   * Gets the user-submitted query string from the URL.
   * @param {Object} urlParams - A URLSearchParams object.
   * @return {String} The user-submitted query string.
   */
  ProboSearch.prototype.getQueryFromUrl = function (urlParams) {
    var query = urlParams.get('query');
    return query;
  };

  /**
   * Gets the query string from the search form.
   * @return {String} The user-submitted query string.
   */
  ProboSearch.prototype.getQueryFromSearchForm = function () {
    return this.inputField.val();
  };

  /**
   * Gets filter values from the URL.
   * @param {Object} urlParams - A URLSearchParams object.
   * @return {Object} An object full of filter keys with their values.
   */
  ProboSearch.prototype.getFiltersFromUrl = function (urlParams) {
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
  ProboSearch.prototype.getFiltersFromSearchForm = function () {
    var filters = this.searchFilter;
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
   * @return {Array} An array of strings, formatted as 'key:value', where the key
   * is the filter ID and the value is the filter value, e.g. 'category:recipe'.
   */
  ProboSearch.prototype.filtersToArray = function (filters) {
    var filterArray = [];
    for (var key in filters) {
      var value = filters[key];
      filterArray.push(key + ':' + value)
    }
    return filterArray;
  }

  /**
   * Replaces the page title with new text.
   * @param {String} title - The new title text.
   */
  ProboSearch.prototype.setTitle = function (title) {
    $('.page-title').replaceWith('<h1 class="page-title">' + title + '</h1>');
  }

  /**
   * Gets search results from the index and prints them to the results area.
   * @param {Object} urlParams - A URLSearchParams object.
   */
  ProboSearch.prototype.getSearchResults = function (urlParams) {
    var proboSearch = this;
    var query = this.getQueryFromSearchForm(urlParams);
    var filters = this.filtersToArray(this.getFiltersFromSearchForm(urlParams));
    var searchObj = {
      query: query,
      facetFilters: filters
    };
    if (query != '') {
      this.index.search(searchObj,
      function searchDone(err, content) {
        if (err) {
          console.error(err);
          return;
        }
        var resultsLabel = content.hits.length == 1 ? ' result' : ' results';
        var resultsMessage = 'Showing ' + content.hits.length + resultsLabel + ' for "' + query + '"';
        proboSearch.setTitle(resultsMessage);

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
        proboSearch.resultsArea.append(results.join(''));
      });
    }
    else {
      this.setTitle('Search');
      this.setResultsMessage('You haven\'t searched for anything yet.');
    }
  };

  return PROBO.ProboSearch = ProboSearch;

})(jQuery, PROBO);
