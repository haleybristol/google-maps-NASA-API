var apiKey = require('../.env').apiKey;
var nasaKey = require('../.env').nasaKey;

$(document).ready(function(){
  $('#locateUser').click(locateUser);
});

function locateUser() {

  if (navigator.geolocation){
    var positionOptions = {
      enableHighAccuracy: true,
      timeout: 10 * 1000
    };
    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
  }
  else {
    alert("Your browser doesn't support the Geolocation API");
  }
}

function geolocationSuccess(position) {
  var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var myOptions = {
    zoom : 16,
    center : userLatLng,
    mapTypeId : google.maps.MapTypeId.ROADMAP
  };
  console.log(myOptions);
  var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);

  new google.maps.Marker({
    map: mapObject,
    position: userLatLng
  });
}

function geolocationError(positionError) {
  alert(positionError);
}

$(document).ready(function(){
  $('#curiosity').submit(function(event){
    event.preventDefault();
    var date = $('#date').val();
    var fcam =  $('#camera').val('fcam');
    var rcam =  $('#camera').val('rcam');
    var mcam =  $('#camera').val('mcam');
    $.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=' + date + '&api_key=C7uaHPQUmVeGK9TU4bTOkuIMDxo8d4zoJWS8utaa').then(function(response){
      console.log(response);
      var mars = response.photos[0].img_src
      $('.picResult').append('<img src=' + mars + '>' );
    });
  });
});
