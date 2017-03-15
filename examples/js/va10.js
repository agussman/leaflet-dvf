
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

	//map = L.map('map').setView([45.0, -110.0], 3);
	map = L.map('map').setView([39.13, -77.96], 10);

	legendControl = new L.Control.Legend();

	legendControl.addTo(map);

	var baseLayer = new L.StamenTileLayer('toner', {
		detectRetina: true
	});
	
	baseLayer.addTo(map);

	// Define a fill color function for Romney (light red to red) and a fill color function for Obama (light blue to blue)
	var fillColorFunctionRomney = new L.HSLLuminosityFunction(new L.Point(0, 0.95), new L.Point(10, 0.4), {outputHue: 0, outputSaturation: '100%'});
	var fillColorFunctionObama = new L.HSLLuminosityFunction(new L.Point(0, 0.95), new L.Point(10, 0.4), {outputHue: 240, outputSaturation: '100%'});

	var fillColorFunctionBluetoRedHSL = new L.HSLHueFunction(new L.Point(0, 240), new L.Point(1, 0));
	var fillColorFunctionBluetoRedBlend = new L.RGBColorBlendFunction(0, 100, [255, 0, 0], [0, 0, 255]);
	var fullColorFunctionBWR = new L.PiecewiseFunction([
		//new L.HSLLuminosityFunction(new L.Point(0, 1), new L.Point(50, 0.5), {outputHue: 60}),
		//new L.HSLHueFunction(new L.Point(50, 60), new L.Point(100, 0))
		new L.RGBColorBlendFunction(15, 50, [255, 0, 0], [255, 255, 255]),
		new L.RGBColorBlendFunction(50, 85, [255, 255, 255], [0, 0, 255])
	]);

	var opacityFunction = new L.PiecewiseFunction([new L.LinearFunction(new L.Point(0, 0), new L.Point(1, 0.7)), new L.LinearFunction(new L.Point(1, 0.7), new L.Point(1, 0.7))]);

	var stats = va10_stats.stats;

	var options = {
		recordsField: 'stats',
		codeField: null,
		locationMode: L.LocationModes.LOOKUP,
		locationLookup: va10geoJSON,
		locationIndexField: 'name',
		//locationTextField: 'geojson.properties.name',
		locationTextField: 'name',
		displayOptions: {
			'Percent_D': {
				displayName: 'Data Value',
				fillColor: fullColorFunctionBWR,
				//fillOpacity: opacityFunction
			}
		},
		includeLayer: function (record) {
			console.log(record);
			return true;
		},
		layerOptions: {
			fillOpacity: 0.5,
			opacity: 1,
			weight: 1,
			stroke: true,
			color: '#000000'
		},
		tooltipOptions: {
			iconSize: new L.Point(80,60),
			iconAnchor: new L.Point(-5,60)
		}
	};

	console.log("This is for real");

	var electionLayer = new L.ChoroplethDataLayer(va10_stats, options);
	map.addLayer(electionLayer);

	console.log("Happened.")

	//var myLayer = L.geoJSON(statesData).addTo(map);


	// works with https://unpkg.com/leaflet@1.0.3/dist/leaflet.js in va10.html
	//var myLayer = L.geoJSON(va10geoJSON).addTo(map);

});
