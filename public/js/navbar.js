$(document).ready(() => {
  // fix menu when passed
	$('.masthead').visibility({
		once: false,
		onBottomPassed() {
			$('.fixed.menu').transition('fade in');
		},
		onBottomPassedReverse() {
			$('.fixed.menu').transition('fade out');
		},
	});

  // create sidebar and attach to menu open
	$('.ui.sidebar').sidebar('attach events', '.toc.item').sidebar('setting', {
		transition: 'overlay',
		mobileTransition: 'overlay',
	});

	const pgurl = location.pathname;
	function addActive() {
		if ($(this).attr('href') === pgurl || $(this).attr('href') === '') {
			$(this).addClass('active');
		}
	}

	$('#fixedMenu a').each(addActive);
	$('#followingMenu div a').each(addActive);
	$('#sidebarMenu a').each(addActive);
});
