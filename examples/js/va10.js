
$(document).ready(function() {
	var map;
	var legendControl;

	var resize = function () {
		var $map = $('#map');

		$map.height($(window).height() - $('div.navbar').outerHeight());

		if (map) {
			map.invalidateSize();
		}
	};

	$(window).on('resize', function () {
		resize();
	});

	resize();

	map = L.map('map').setView([45.0, -110.0], 3);

	legendControl = new L.Control.Legend();

	legendControl.addTo(map);

	var baseLayer = new L.StamenTileLayer('toner', {
		detectRetina: true
	});
	
	baseLayer.addTo(map);

	// Define a fill color function for Romney (light red to red) and a fill color function for Obama (light blue to blue)
	var fillColorFunctionRomney = new L.HSLLuminosityFunction(new L.Point(0, 0.95), new L.Point(55, 0.4), {outputHue: 0, outputSaturation: '100%'});
	var fillColorFunctionObama = new L.HSLLuminosityFunction(new L.Point(0, 0.95), new L.Point(55, 0.4), {outputHue: 240, outputSaturation: '100%'});

	var opacityFunction = new L.PiecewiseFunction([new L.LinearFunction(new L.Point(0, 0), new L.Point(1, 0.7)), new L.LinearFunction(new L.Point(1, 0.7), new L.Point(55, 0.7))]);

});
