$(function() {

	$(function () {

		$("#menu").mmenu({
			extensions: ["position-bottom", "fullscreen", "theme-black", "listview-50", "fx-panels-slide-up", "fx-listitems-drop", "border-offset"],
			navbar: {
				title: ""
			},
			navbars: [{
				height: 2,
				content: [
					'<a href="#" class="fa fa-phone"></a>',
					'<div class="logo"><img src="img/ms-logo.svg" /></div>',
					'<a href="#" class="fa fa-envelope"></a>'
				]
			}, {
				content: ["prev", "title"]
			}]
		}, {});
		$(".mh-head.mm-sticky").mhead({
			scroll: {
				hide: 200
			}
		});
		$(".mh-head:not(.mm-sticky)").mhead({
			scroll: false
		});



		$('body').on('click',
			'a[href^="#/"]',
			function () {
				alert("Thank you for clicking, but that's a demo link.");
				return false;
			}
		);
	});

});
