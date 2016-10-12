(function (window, $) {

  $(document).ready(function () {
    // use tinynav
    if ($.fn.tinyNav instanceof Function) {
      $("#sidebar-first .sidebar-nav").tinyNav();
    }

    if ($.fn.sidr instanceof Function) {
      $('#simple-menu').css('display', '').sidr({side: 'right'});

      $(window).on("resize", function (event) {
        if ($('body').hasClass('sidr-open') && $(window).width() >= 768) {
          $.sidr('close');
        }
      });
    }
    
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
