// Knockout data Model
var place = function(d)
{
	this.name = ko.observable(d.name);
	this.marker = ko.observable(d.marker);
};
// same array of places is uses as data definned in jsrnap.js
// Knockout ViewModel
var JSRViewModel = function() // Knockout ViewModel of jamshedpur
{
	var self = this;
	this.placeslist = ko.observableArray([]); // creates empty observableArray
	PLACES.forEach(function(p)
	{
		self.placeslist.push(new place(p));
	});

	this.displaymarker = function(place)
	{
				var m = place.marker;
				map.setCenter(m.getPosition());
				m.setAnimation(google.maps.Animation.BOUNCE);
				var markerEvent = google.maps.event.trigger(m, 'click');
	};
	this.textinput = ko.observable(""); //this variable contains the current textinput from search box observed by knockout

	self.filterSearch = ko.computed(function() //knockout array having filered elements before or  after search
	{
		var searchedphrase = self.textinput().toLowerCase();
		if (Loaded)
		{
			if (searchedphrase==='') // there is nothing to filter i.e searchphrase is empty
			{
				for(const i in self.placeslist())
				{
					self.placeslist()[i].marker.setVisible(true);
					self.placeslist()[i].marker.setAnimation(null);
				}
				return self.placeslist(); //if nothing is searched returns all the elements
			}
			else
			{
				return ko.utils.arrayFilter(self.placeslist(), function(plc) //returns filtered set of places
				{
					var result=matcher(searchedphrase,plc.name()); // determines whether input text phrase element is present in list or not
					if (result)
					{
						plc.marker.setVisible(true);
					}
					else
					{
							plc.marker.setVisible(false);
					}
					return result;
				});
			}
		} else
		{
			return self.placeslist();
		}
	}); //end of filtersearch
	var matcher=function(phrase,plcacename)
	{
		{
			if (phrase.length > plcacename.toLowerCase().length)
			{
				return false;
			}
			return (plcacename.toLowerCase().substring(0, phrase.length) === phrase);
		};
	}
}; // END OF viewmodel

var jsrviewmodelobject = new JSRViewModel();
ko.applyBindings(jsrviewmodelobject); //applies the bindings betewwen viewmodel & view
