$(function() {
  // set date & location
  getLocation(function(position){
    getWeather(position, function(weather) {
      $("#loading").hide();
      $(".main").show();

      $('#location').text(weather.city);
      $('#morning').html(weather.low + '&deg;');
      $('#day').html(weather.high + '&deg;');
      //$('#night').html(weather.low + '&deg;');

      // set date
      var t = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      $('#date').text(t.toLocaleDateString());
    });
  });
});

function getLocation(callback) {
  if (navigator.geolocation) {
    var callbackCalled = false;
    navigator.geolocation.getCurrentPosition(function(position) {
      callbackCalled = true;
      callback(position.coords.latitude + ',' + position.coords.longitude);
    }, function(e) {
      callbackCalled = true;
      callback('Saint Petersburg, Russia');
    });

    setTimeout(function() {
      if (!callbackCalled) {
        callback('Saint Petersburg, Russia');
      }
    }, 5000);
  }
}

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
