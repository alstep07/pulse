//tiny slider

const slider = tns({
	speed: 600,
	container: ".carousel__inner",
	items: 1,
	slideBy: "page",
	autoplay: false,
	controls: false,
	nav: true,
	autoHeight: false,
	responsive: {
		992: {
			nav: false,
		},
	},
});

document.querySelector(".prev").addEventListener("click", function () {
	slider.goTo("prev");
});

document.querySelector(".next").addEventListener("click", function () {
	slider.goTo("next");
});

//tabs toggle

$("ul.catalog__tabs").on("click", "li:not(.catalog__tab_active)", function () {
	$(this)
		.addClass("catalog__tab_active")
		.siblings()
		.removeClass("catalog__tab_active")
		.closest("div.container")
		.find("div.catalog__content")
		.removeClass("catalog__content_active")
		.eq($(this).index())
		.addClass("catalog__content_active");
});

function toggleSlide(item) {
	$(item).each(function (i) {
		$(this).on("click", function (e) {
			e.preventDefault();
			$(".catalog-item__content")
				.eq(i)
				.toggleClass("catalog-item__content_active");
			$(".catalog-item__list")
				.eq(i)
				.toggleClass("catalog-item__list_active");
		});
	});
}

toggleSlide(".catalog-item__back");
toggleSlide(".catalog-item__link");

//modal

$("[data-modal=consultation]").on("click", function () {
	$(".overlay, #consultation").fadeIn("slow");
});

$(".modal__close").on("click", function () {
	$(".overlay, #consultation, #thanks, #order").fadeOut("slow");
});

$(".button_mini").each(function (i) {
	$(this).on("click", function () {
		$("#order .modal__descr").text(
			$(".catalog-item__subtitle").eq(i).text()
		);
		$(".overlay, #order").fadeIn("slow");
	});
});

//validate forms

function validateForms(form) {
	$(form).validate({
		rules: {
			name: {
				required: true,
				minlength: 3,
			},
			phone: "required",
			email: {
				required: true,
				email: true,
			},
		},
		messages: {
			name: {
				required: "Введите свое имя",
				minlength: jQuery.validator.format("Минимум {0} буквы"),
			},
			phone: "Введите телефон",
			email: {
				required: "Введите почту",
				email: "неправильный адресс",
			},
		},
	});
}

validateForms("#consultation-form");
validateForms("#consultation form");
validateForms("#order form");

//masked input
$("input[name=phone]").mask("+38 (999) 999-99-99");

$("form").submit(function (e) {
	e.preventDefault();
	$.ajax({
		type: "POST",
		url: "mailer/smart.php",
		data: $(this).serialize(),
	}).done(function () {
		$(this).find("input").val("");
		$("#consultation, #order").fadeOut();
		$(".overlay, #thanks").fadeIn("slow");

		$("form").trigger("reset");
	});
	return false;
});

// Smooth scroll and pageup

$(window).scroll(function () {
	if ($(this).scrollTop() > 1600) {
		$(".pageup").fadeIn();
	} else {
		$(".pageup").fadeOut();
	}
});

$("a[href^='#']").click(function () {
	const _href = $(this).attr("href");
	$("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
	return false;
});

new WOW().init();
