$(document).ready(function () {
	$('.notcounter').hide();

	let counter = 0;
	let c = 0;
	const i = setInterval(function () {
		$('.loading-page .counter h1').html(`${c}%`);
		$('.loading-page .counter hr').css('width', `${c}%`);

		counter += 1;
		c += 1;
		if (counter === 101) {
			$('#counter1').fadeOut(function () {
				$('#counter2').fadeIn(function () {
					$('voltar').fadeIn();
				});
			});
			clearInterval(i);
		}
	}, 50);
});

document.addEventListener('touchstart', function () {}, false); // add this junk to make iOS observe the :active state for touch
