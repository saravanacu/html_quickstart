import $ from 'jquery'
import 'velocity-animate'
import 'jquery.easing'
import 'velocity-ui-pack'
import 'slick-carousel'
import 'bootstrap'
import 'jquery-scrollify'
import 'fullpage.js'
import 'aos'
// CSS imports
import '../node_modules/slick-carousel/slick/slick.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/aos/dist/aos.css'

import '../scss/app.scss'

$(document).ready(function() {
  $(".slider-wrap").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    infinite: false
  });
  // Smooth scrolling using jQuery easing

  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });
  AOS.refresh()
  AOS.init({
    easing: 'ease-in-out-sine'
  });

  // Activate scrollspy to add active class to navbar items on scroll


}())
