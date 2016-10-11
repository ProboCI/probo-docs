(function (window, $) {

  // use tinynav
  $("#sidebar-first .sidebar-nav").tinyNav();

  if ($.fn.sidr instanceof Function) {
    $('#simple-menu').css('display', '').sidr({side: 'right'});
  }

  //fallback for css animation breaking on ios scroll
  var hello = ['Hello', 'Hola', 'Bonjour', 'Bon dia', 'Namaste'];
  var count = 1;
  setInterval(function () {
    $("span.hello").fadeOut(600, function () {
      $(this).html(hello[count]);
      count++;
      if (count == hello.length)
        count = 0;
      $(this).fadeIn(500, function () {
      });
    });
  }, 4000);

  $(window).on("resize", function (event) {
    if ($('body').hasClass('sidr-open') && $(window).width() >= 768) {
      $.sidr('close');
    }
  });

  // Setting up FitVids for responsive iFrames embeds (videos)
  $('.video-container').fitVids();

    //search
  $('.search a').click(function (e) {
    $('.search-section').toggleClass('on');
    $('.site').addClass('overflow-hidden');
  });
  $('.search-section .fa-times').click(function (e) {
    $('.search-section').toggleClass('on');
    $('.site').removeClass('overflow-hidden');
  });
  $('.search-mobile a').click(function (e) {
    $.sidr('close');
    $('.site').addClass('overflow-hidden');
  });

  $(function () {
    $('#search-query').lunrSearch({
      indexUrl: '/assets/index.json',   // Url for the .json file containing search index data
      results: '#search-results',  // selector for containing search results element
      entries: '.entries',         // selector for search entries containing element (contained within results above)
      titleMsg  : '<h1>Search Results<h1>',   // message attached in front of results
      template: '#search-results-template',  // selector for Mustache.js template
      emptyMsg  : '<p>Nothing found.</p>'     // shown message if search returns no results
    });
  });

  $('#search-query').submit(function(e) {
    e.preventDefault();
  });

  $(document).ready(function () {
    $('.sidebar-nav').navgoco({
      caretHtml: '<i class="icon plus-to-minus"></i>',
      accordion: true,
      openClass: 'open',
      save: true,
      cookie: {
        name: 'navgoco',
        expires: false,
        path: '/'
      }
    });
  });


})(window || {}, jQuery);
