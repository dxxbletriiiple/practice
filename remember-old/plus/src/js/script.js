$(document).ready(function () {
  $(".slide__wrapper").slick({
    infinite: true,
    speed: 1000,
    prevArrow: '<button type="button" class="slick-prev"><img src="../img/icons/left.svg"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="../img/icons/right.svg"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
          arrows: false,
        },
      },
    ],
  });

  $("ul.catalogue__tabs").on("click", "li:not(.catalogue__tab_active)", function () {
    $(this)
      .addClass("catalogue__tab_active")
      .siblings()
      .removeClass("catalogue__tab_active")
      .closest("div.container")
      .find("div.catalogue__content")
      .removeClass("catalogue__content_active")
      .eq($(this).index())
      .addClass("catalogue__content_active");
  });

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalogue_item__content").eq(i).toggleClass("catalogue_item__content_active");
        $(".catalogue_item__list").eq(i).toggleClass("catalogue_item__list_active");
      });
    });
  }
  toggleSlide(".catalogue_item__link");
  toggleSlide(".catalogue_item__back");

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });
  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #order, #thanx").fadeOut("slow");
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalogue_item_subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("slow");
    });
  });

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: "Пожалуйста введите своё имя",
        email: "Пожалуйста введите свою почту",
        phone: "Пожалуйста введите номер телефона",
      },
    });
  }
  validateForms("#consultation-form");
  validateForms("#consultation form");
  validateForms("#order form");

  $("input[name=phone").mask("+7 (999) 999-99-99");

  $("form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");

      $("#consultation, #order").fadeOut();
      $("overlay, #thanx").fadeIn();
      $("form").trigger("reset");
    });
    return false;
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1200) {
      $(".up").fadeIn();
    } else {
      $(".up").fadeOut();
    }
  });
});
