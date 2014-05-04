$(function() {
  // set date
  var t = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  $('#date').text(t.toLocaleDateString());

  // set location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      getCity(position.coords.latitude, position.coords.longitude, function(city) {
        $('#location').text(city);
      });
    });
  }

});

function getCity(lat, lng, callback) {
  var geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      console.log(results);
      if (results[1]) {
        //find country name
        for (var i=0; i<results[0].address_components.length; i++) {
          for (var b=0;b<results[0].address_components[i].types.length;b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
            if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
              //this is the object you are looking for
              city= results[0].address_components[i];
              break;
            }
          }
        }
        //city data
        console.log(city.long_name);
        callback(city.long_name);
      } else {
        console.log("No results found");
      }
    } else {
      console.log("Geocoder failed due to: " + status);
    }
  });
}
