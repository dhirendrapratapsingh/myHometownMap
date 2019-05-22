const STYLES=[
	        {
						elementType: 'geometry',
					stylers: [{color: '#ebe3cd'}]
				},
          {
						elementType: 'labels.text.fill',
					stylers: [{color: '#523735'}]
				},
          {
						elementType: 'labels.text.stroke',
					stylers: [{color: '#f5f1e6'}]
				},
          {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{color: '#c9b2a6'}]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [{color: '#dcd2be'}]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{color: '#ae9e90'}]
          },
          {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#93817c'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{color: '#a5b076'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#447530'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#f5f1e6'}]
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{color: '#fdfcf8'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#f8c967'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#e9bc62'}]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [{color: '#e98d58'}]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [{color: '#db8555'}]
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{color: '#806b63'}]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [{color: '#8f7d77'}]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#ebe3cd'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{color: '#b9d3c2'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#92998d'}]
          }
        ];
// Object array for markers with 2 params: name, and position (lat, lng)
var PLACES = [
	{name:"Jubilee Park", position: {lat:22.809866, lng:86.196020}},
	{name:"Tata Steel Zoological Park", position: {lat:22.814595, lng:86.195930}},
	{name:"Dimna Dam", position: {lat:22.858287, lng:86.251194}},
	{name:"Bhuvaneshwari Temple", position: {lat:22.778462, lng:86.259621}},
	{name:"Little Italy", position: {lat:22.798890, lng:86.180318}},
	{name:"The Oak-Wood Irish Bar and Lounge", position: {lat:22.794056, lng: 86.176527}},
	{name:"Bhatia Park", position: {lat:22.804067, lng: 86.155940}},
	{name:"Sai Baba Temple", position: {lat:22.820938, lng:86.182660}},
	{name:"The Adda", position: {lat:22.798565, lng:86.179322}},
	{name:"hudco park", position: {lat:22.761993, lng:86.255539}},
	{name:"Dosa king", position: {lat:22.798145,lng:86.179739}},
	{name:"The Wave International", position: {lat:22.876556, lng:86.193082}},
	{name:"Brubeck", position: {lat: 22.797704, lng:86.184288}},
	{name:"Shoppers square", position: {lat: 22.805681, lng: 86.203123}},
	{name:"The Blue Diamond Restaurant", position: {lat:22.794219, lng:86.177890}},
	{name:"Hangout Restaurant & Lounge", position: {lat:22.795376, lng:86.180411}},
	{name:"Yashwee International", position: {lat:22.804707, lng:86.207731}},
	{name:"Marine Drive", position: {lat:22.813740, lng:86.149684}},
	{name:"Surya Mandir", position: {lat:22.803070, lng:86.238921}}
];
var map;
var marker;
var Loaded = false;
var markers = [];
var changeTohighlighted,changeToDefault;

// Initiallize map of visitable places in jamshedpur
function initMap()
{
	map = new google.maps.Map(document.getElementById('map'),
	{
		center: {lat: 22.804567, lng: 86.202875},
		zoom: 13,
		styles: STYLES
	});
	var currentMarker = null; //keeps a pointer on current marker
	var infoWindow = new google.maps.InfoWindow();
	var largeInfowindow = new google.maps.InfoWindow();
	var bounds = new google.maps.LatLngBounds();
	var defaultIcon = makeMarkerIcon('FF3E96'); //creates a default icon for markers on the map

	var highlightedIcon = makeMarkerIcon('00F5FF'); // creates a special icon displayed when the mouse hovers thr morker

	// Creation of markers
	for (var i = 0; i < PLACES.length; i ++)
	{
		marker = new google.maps.Marker
		({
			position: PLACES[i].position,
			title: PLACES[i].name,
			map: map,
			animation: google.maps.Animation.DROP,
			icon: defaultIcon,
			id: i
		});

		markers.push(marker);

		addinglistener(marker);

		jsrviewmodelobject.placeslist()[i].marker = marker;

		markers[i].setMap(map);

		bounds.extend(markers[i].position);

		marker.addListener('mouseover',changeTohighlighted);
		marker.addListener('mouseout',changeToDefault);

	} //END of loop
	Loaded = true;
	map.fitBounds(bounds);

	function changeToDefault ()
	{
	        this.setIcon(defaultIcon);
	 }

	function changeTohighlighted ()
	{
			        this.setIcon(highlightedIcon);
	}

	//function to run  showInfoWindow()
	function addinglistener(marker)
	{
		marker.addListener('click', function()
		{
			showInfoWindow(this, largeInfowindow);
		});
	function showInfoWindow(marker, infowindow)
	{
		// Check to make sure the infowindow is not already opened on this marker.
    if (currentMarker)
		{
			currentMarker.setAnimation(null);
		}
		currentMarker = marker;
		marker.setAnimation(google.maps.Animation.BOUNCE);
		map.setCenter(marker.getPosition());
		setTimeout(function()
		{
				marker.setAnimation(null);
		}, 1500);

		if (infowindow.marker != marker)
		{
			// Clear the infowindow content to give the streetview time to load.
			infowindow.setContent('');
			infowindow.marker = marker;
			// Make sure the marker property is cleared if the infowindow is closed.
			infowindow.addListener('closeclick', function()
			{
				infowindow.marker = null;
			});
			infowindow.setContent('<div>' + marker.title + '</div>');
		}
			// Open the infowindow on the correct marker.
			var url = 'https://api.foursquare.com/v2/venues/search?v=20161016&client_id=25GZBIJ5JLK3GIWE3X01YUWVLDB32EGGDVX3IYGOFRNSFRS3&client_secret=VGE0QY5XFAS5JZUDNUZ3SISKBCHFQFUBADKZ44XVL05OOJY1&ll=' + marker.getPosition().lat()+','+ marker.getPosition().lng()+'&query='+ marker.title;

					$.getJSON(url, function(retrived_data)
					{
							if(typeof retrived_data.response.venues[0] !== 'undefined' && retrived_data.response.venues[0] !==null )
							{
									infowindow.setContent("");
									var htmlcontent = '';
									var firstVenue = retrived_data.response.venues[0];
									console.log(retrived_data.response.venues[0]);
									var cat = (firstVenue.categories.length === 0)?'unknown category':firstVenue.categories[0].name;
									var add =(typeof firstVenue.location.address !== 'undefined')?(firstVenue.location.address):'jamshedpur';

									htmlcontent = '<h3>' + firstVenue.name + '</h3><br><b>Category:</b> '+ cat +'<br><b>Address:</b> ' + add;

									infowindow.setContent(htmlcontent);

							}
							else
							{
								infowindow.setContent('<div><h3>' + marker.title + '</h3></div><br><h4>No such venue found on four square!</h4>');
							}

					}).fail(function ()
					{
							infowindow.setContent("the content couldnt be loaded");
					});

			infowindow.open(map, marker);
		} //end of showInfoWindow
	} //end of addinglistener

		function makeMarkerIcon(markerColor)
		{
			var markerImage = new google.maps.MarkerImage(
				'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
				'|40|_|%E2%80%A2',
				new google.maps.Size(21, 34),
				new google.maps.Point(0, 0),
				new google.maps.Point(10, 34),
				new google.maps.Size(21,34));
			return markerImage;
		}
} //end of initMap
GoogleMapAPIError = function ()
{
    alert('Google maps failed to load. Check API key Try & your internet connection then reload');
};
