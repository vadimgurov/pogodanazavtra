$(function() {
  // set date
  var t = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  $('#date').text(t.toLocaleDateString());

  // set location
  $('#location').text('St.-Petersburg');
});
