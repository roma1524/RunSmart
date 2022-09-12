$(document).ready(function () {
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

  let btnAbout = document.querySelectorAll('.catalog-item__link'),
    linkToBack = document.querySelectorAll('.link__to__back');

  btnAbout.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target.parentNode.classList.contains('catalog-item__content_active')) {
        e.target.parentNode.classList.toggle('catalog-item__content_active');
        e.target.parentNode.parentNode.querySelector('.catalog-item__list')
          .classList.add('catalog-item__list_active');
      }
    })
  });

  linkToBack.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target.parentNode.classList.contains('catalog-item__list_active')) {
        e.target.parentNode.classList.toggle('catalog-item__list_active');
        e.target.parentNode.parentNode.querySelector('.catalog-item__content')
          .classList.add('catalog-item__content_active');
      }
    })
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active')
      .eq($(this).index()).addClass('catalog__content_active');
  });
});

