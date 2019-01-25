(function($, PROBO) {
  'use strict';

  PROBO = PROBO || {};

  function ProboSearch(appId, searchKey, indexName, client, index, inputField, submitButton, resetButton, resultsArea, result, searchFilter) {
    this.client = client;
    this.index = index;
    this.urlParams = new URLSearchParams(window.location.search);

    this.inputField = inputField;
    this.submitButton = submitButton;
    this.resetButton = resetButton;
    this.resultsArea = resultsArea;
    this.result = result;
    this.searchFilter = searchFilter;
    this.searchCacheTimeout = 5;
  }

  ProboSearch.prototype.initialize = function () {
    var proboSearch = this;

    // Initialize search state from URL params.
    this.applyUrlValues(this.urlParams)
    this.updateQuery();

    // Force return key to update search without page reload.
    $(window).keydown(function(event){
      if(event.keyCode == 13) {
        event.preventDefault();
        proboSearch.updateQuery();
      }
    });
  };

  /**
   *
   */
  ProboSearch.prototype.setDefaultMessage = function() {
    this.setTitle('Search');
    this.setResultsMessage('You haven\'t searched for anything yet.');
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

    var newUrl = '/search/?query=' + this.getQueryFromSearchForm() + filterString;
    if (newUrl) {
      this.clearSearchResults();
      window.history.pushState({}, '', newUrl);
      this.getSearchResults(this.urlParams, newUrl);
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
    this.resultsArea.empty();
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
      var $categoryId = $('select', this).attr('id');
      var $filterVal = $('.chosen-container > a:not(.chosen-default) > span', this).text();
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
  ProboSearch.prototype.getSearchResults = function (urlParams, newUrl) {
    var proboSearch = this;
    var cache = PROBO.storage.load(newUrl)

    if (!cache) {
      var query = this.getQueryFromSearchForm(urlParams);
      var filters = this.filtersToArray(this.getFiltersFromSearchForm(urlParams));
      var searchObj = {
        query: query,
        facetFilters: filters
      };

      if (query === '') {
        return this.setDefaultMessage();
      }

      this.index.search(searchObj, function searchDone(err, content) {
        if (err) return;
        PROBO.storage.save(newUrl, content, proboSearch.searchCacheTimeout);
        return proboSearch.parseSearchResults(content);
      });
    }
    else {
      return proboSearch.parseSearchResults(cache);
    }
  };

  ProboSearch.prototype.parseSearchResults = function(content) {
    if (!content) {
      return this.setDefaultMessage();
    }

    var resultsLabel = content.hits.length == 1 ? ' result' : ' results';
    var resultsMessage = 'Showing ' + content.hits.length + resultsLabel + ' for "' + content.query + '"';
    this.setTitle(resultsMessage);

    var results = [];
    for (var h in content.hits) {
      var hit = content.hits[h];
      var searchResult = '<div class="search__result">' +
        '<h2 class="h3 search__result-title"><a href="' + hit.url + '">' + hit.title + '</a></h2>' +
        '<div class="search__result-link">'+ document.location.origin + hit.url + '</div>' +
        '<div class="search__result-text">' + hit.excerpt_text + '</div>' +
        '</div>';
      results.push(searchResult);
    }

    this.resultsArea.append(results.join(''));
  }

  return PROBO.ProboSearch = ProboSearch;

})(jQuery, PROBO);

PROBO.storage = {
	save: function(key, jsonData, expirationMin) {
		var expirationMS = expirationMin * 60 * 1000;
		var record = {
      value: JSON.stringify(jsonData),
      timestamp: new Date().getTime() + expirationMS
    };
		localStorage.setItem(key, JSON.stringify(record));
		return jsonData;
	},
	load: function(key) {
		var record = JSON.parse(localStorage.getItem(key));
		if (!record){return false;}
		return (new Date().getTime() < record.timestamp && JSON.parse(record.value));
	}
};
