$(document).ready(function(){
  $('.carousel__inner').slick({
    speed: 1200,
    // adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg" alt="left arrow" srcset=""></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg" alt="left arrow" srcset=""></button>',
    response: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          dots: true
        }
      },
    ]
  });
});