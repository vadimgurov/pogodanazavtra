$(function() {
  // set date
  var t = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  $('#date').text(t.toLocaleDateString());

  // set location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      getWeather(position.coords.latitude + ',' + position.coords.longitude, function(weather) {
        $('#location').text(weather.city);
        $('#day').html(weather.temp + '&deg;')
      });
    });
  }
});

function getWeather(location, callback) {
  $.simpleWeather({
    location: location,
    unit: 'c',
    success: callback,
    error: function(error) {
      console.log(error);
    }
  });
}
