$(function () {

  $('.slider__inner').slick({
    arrows: false,
    dots: true,
    adaptiveHeight: true,
  });

  $('.styles__inner').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: 300,
    responsive: [{
        breakpoint: 1230,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  });


  $('.allmasters__block-title').click(function (event) {
    if ($('.allmasters__blocks').hasClass('blocks-one')) {
      $('.allmasters__block-title').not($(this)).removeClass('active');
      $('.allmasters__block-text').not($(this).next()).slideUp(300);
    }
    $(this).toggleClass('active').next().slideToggle(300);
  });

  $('.questions__item-title').click(function (event) {
    if ($('.questions__items').hasClass('items-one')) {
      $('.questions__item-title').not($(this)).removeClass('active');
      $('.questions__item-text').not($(this).next()).slideUp(300);
    }
    $(this).toggleClass('active').next().slideToggle(300);
  });


  $('.questions__tabs .tab').on('click', function (event) {
    var id = $(this).attr('data-id');
    $('.questions__tabs').find('.tab-item').removeClass('active-tab').hide();
    $('.questions__tabs .tabs').find('.tab').removeClass('active');
    $(this).addClass('active');
    $('#' + id).addClass('active-tab').fadeIn(1000);
    return false;
  });



  // forms  ===============
  $('input,textarea').focus(function () {
    if ($(this).val() == $(this).attr('data-value')) {
      $(this).addClass('focus');
      $(this).parent().addClass('focus');
      if ($(this).attr('data-type') == 'pass') {
        $(this).attr('type', 'password');
      };
      $(this).val('');
    };
    removeError($(this));
  });
  $('input[data-value], textarea[data-value]').each(function () {
    if (this.value == '' || this.value == $(this).attr('data-value')) {
      if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
        $(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
      } else {
        this.value = $(this).attr('data-value');
      }
    }
    if (this.value != $(this).attr('data-value') && this.value != '') {
      $(this).addClass('focus');
      $(this).parent().addClass('focus');
      if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
        $(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
      }
    }

    $(this).click(function () {
      if (this.value == $(this).attr('data-value')) {
        if ($(this).attr('data-type') == 'pass') {
          $(this).attr('type', 'password');
        };
        this.value = '';
      };
    });
    $(this).blur(function () {
      if (this.value == '') {
        if (!$(this).hasClass('l')) {
          this.value = $(this).attr('data-value');
        }
        $(this).removeClass('focus');
        $(this).parent().removeClass('focus');
        if ($(this).attr('data-type') == 'pass') {
          $(this).attr('type', 'text');
        };
      };
      if ($(this).hasClass('vn')) {
        formValidate($(this));
      }
    });
  });
  $('.form-input__viewpass').click(function (event) {
    if ($(this).hasClass('active')) {
      $(this).parent().find('input').attr('type', 'password');
    } else {
      $(this).parent().find('input').attr('type', 'text');
    }
    $(this).toggleClass('active');
  });

  //MASKS//
  //'+7(999) 999 9999'
  //'+38(999) 999 9999'
  //'+375(99)999-99-99'
  //'a{3,1000}' только буквы минимум 3
  //'9{3,1000}' только цифры минимум 3
  $.each($('input.phone'), function (index, val) {
    $(this).attr('type', 'tel', 'tel-1');
    $(this).focus(function () {
      $(this).inputmask('+38(999) 999 9999', {
        clearIncomplete: true,
        clearMaskOnLostFocus: true,
        "onincomplete": function () {
          maskclear($(this));
        }
      });
      $(this).addClass('focus');
      $(this).parent().addClass('focus');
      $(this).parent().removeClass('err');
      $(this).removeClass('err');
    });
  });
  $('input.phone').focusout(function (event) {
    maskclear($(this));
  });
  $.each($('input.num'), function (index, val) {
    $(this).focus(function () {
      $(this).inputmask('9{1,1000}', {
        clearIncomplete: true,
        placeholder: "",
        clearMaskOnLostFocus: true,
        "onincomplete": function () {
          maskclear($(this));
        }
      });
      $(this).addClass('focus');
      $(this).parent().addClass('focus');
      $(this).parent().removeClass('err');
      $(this).removeClass('err');
    });
  });
  $('input.num').focusout(function (event) {
    maskclear($(this));
  });

  //VALIDATE FORMS
  $('form button[type=submit]').click(function () {
    var er = 0;
    var form = $(this).parents('form');
    var ms = form.data('ms');
    $.each(form.find('.req'), function (index, val) {
      er += formValidate($(this));
    });
    if (er == 0) {
      removeFormError(form);


      //ОПТРАВКА ФОРМЫ
      /*
      function showResponse(html){
        if(!form.hasClass('nomessage')){
          showMessage(messagehtml);
        }
        if(!form.hasClass('noclear')){
          clearForm(form);
        }
      }
      var options={
        success:showResponse
      };
        form.ajaxForm(options);
      

      setTimeout(function(){
        if(!form.hasClass('nomessage')){
          //showMessage(messagehtml);
          showMessageByClass(ms);
        }
        if(!form.hasClass('noclear')){
          clearForm(form);
        }
      },0);

      return false;
      */
      if (ms != null && ms != '') {
        showMessageByClass(ms);
        return false;
      }
    } else {
      return false;
    }
  });

  function formValidate(input) {
    var er = 0;
    var form = input.parents('form');
    if (input.attr('name') == 'email' || input.hasClass('email')) {
      if (input.val() != input.attr('data-value')) {
        var em = input.val().replace(" ", "");
        input.val(em);
      }
      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val())) || input.val() == input.attr('data-value')) {
        er++;
        addError(input);

        return false;
      } else {
        removeError(input);
      }
    } else {
      if (input.val() == '' || input.val() == input.attr('data-value')) {
        er++;
        addError(input);
      } else {
        removeError(input);
      }
    }

    if (input.hasClass('name')) {
      if (!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))) {
        er++;
        addError(input);
      }
    }
    if (input.hasClass('pass-2')) {
      if (form.find('.pass-1').val() != form.find('.pass-2').val()) {
        addError(input);
      } else {
        removeError(input);
      }
    }
    return er;
  }

  function clearForm(form) {
    $.each(form.find('.input'), function (index, val) {
      $(this).removeClass('focus').val($(this).data('value'));
      $(this).parent().removeClass('focus');
      if ($(this).hasClass('phone')) {
        maskclear($(this));
      }
    });
  }

  function addError(input) {
    input.addClass('err');
    input.parent().addClass('err');
    input.parent().find('.form__error').remove();
    if (input.hasClass('email')) {
      var error = '';
      if (input.val() == '' || input.val() == input.attr('data-value')) {
        error = input.data('error');
      } else {
        error = input.data('error');
      }
      if (error != null) {
        input.parent().append('<div class="form__error">' + error + '</div>');
      }
    } else {
      if (input.data('error') != null && input.parent().find('.form__error').length == 0) {
        input.parent().append('<div class="form__error">' + input.data('error') + '</div>');
      }
    }
    if (input.parents('.select-block').length > 0) {
      input.parents('.select-block').parent().addClass('err');
      input.parents('.select-block').find('.select').addClass('err');
    }
  }

  function addErrorByName(form, input__name, error_text) {
    var input = form.find('[name="' + input__name + '"]');
    input.attr('data-error', error_text);
    addError(input);
  }

  function addFormError(form, error_text) {
    form.find('.form__generalerror').show().html(error_text);
  }

  function removeFormError(form) {
    form.find('.form__generalerror').hide().html('');
  }

  function removeError(input) {
    input.removeClass('err');
    input.parent().removeClass('err');
    input.parent().find('.form__error').remove();

    if (input.parents('.select-block').length > 0) {
      input.parents('.select-block').parent().removeClass('err');
      input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
      //input.parents('.select-block').find('.select-options').hide();
    }
  }

  function removeFormErrors(form) {
    form.find('.err').removeClass('err');
    form.find('.form__error').remove();
  }

  function maskclear(n) {
    if (n.val() == "") {
      n.inputmask('remove');
      if (!n.hasClass('l')) {
        n.val(n.attr('data-value'));
      }
      n.removeClass('focus');
      n.parent().removeClass('focus');
    }
  }
  // forms===================


  // btn наверх
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 300) {
      $('.totop_btn').fadeIn(400);
    } else {
      $('.totop_btn').fadeOut(400);
    }
  });
  $('.totop_btn').on("click", function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 300);
  });


  // скрол к якорю  

  $("a.scrollto").click(function () { // тут пишите условия, для всех ссылок или для конкретных
    $("html, body").animate({
      scrollTop: $($(this).attr("href")).offset().top - 76 // .top+margin - ставьте минус, если хотите увеличить отступ
    }, {
      duration: 1000, // тут можно контролировать скорость
      easing: "swing",
    });
    return false;
  });

  // бургер
  $('.header__burger').click(function (event) {
    $('.header__burger, .header__menu-list').toggleClass('active');
    $('body').toggleClass('lock');
  });

});

// анимация svg
new Vivus('capa_11', {
  duration: 200,
  type: 'oneByOne'
});
new Vivus('capa_12', {
  duration: 300,
  type: 'oneByOne'
});
new Vivus('capa_13', {
  duration: 350,
  type: 'oneByOne'
});
new Vivus('capa_14', {
  duration: 400,
  type: 'oneByOne'
});

new Vivus('capa_15', {
  duration: 400,
  type: 'oneByOne'
});
new Vivus('capa_16', {
  duration: 400,
  type: 'oneByOne'
});
new Vivus('capa_17', {
  duration: 300,
  type: 'oneByOne'
});
new Vivus('capa_18', {
  duration: 350,
  type: 'oneByOne'
});
const svgIcon = new Vivus('capa_20', {
  duration: 400,
  type: 'delayed',
  delay: 150,
});

function playCapa_20() {
  svgIcon.stop().reset().play();
};
const svgIcon1 = new Vivus('capa_21', {
  duration: 400,
  type: 'delayed',
  delay: 150,
});

function playCapa_21() {
  svgIcon1.stop().reset().play();
};
const svgIcon2 = new Vivus('capa_22', {
  duration: 400,
  type: 'delayed',
  delay: 150,
});

function playCapa_22() {
  svgIcon2.stop().reset().play();
};
const svgIcon3 = new Vivus('capa_23', {
  duration: 400,
  type: 'delayed',
  delay: 150,
});

function playCapa_23() {
  svgIcon3.stop().reset().play();
};

// анимация страницы

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
  window.addEventListener('scroll', animOnScroll);

  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
        animItem.classList.add('_active');
      } else {
        if (!animItem.classList.contains('_anim-no-hide')) {
          animItem.classList.remove('_active');
        }
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    }
  }

  setTimeout(() => {
    animOnScroll();
  }, 400);
}