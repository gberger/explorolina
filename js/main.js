var initializeMap = function() {
  var mapOptions = {
    center: { lat: 35.907970, lng: -79.047899},
    disableDefaultUI: true,
    draggable: false,
    scrollwheel: false,
    panControl: false,
    maxZoom: 15,
    minZoom: 15,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  $('.gmnoprint .gm-style-cc').hide();

  var drawPlayer = function() {
    var player = null;
    return function(coords) {
      var playerOptions = {
        map: map,
        center: coords,
        strokeColor: '#56A0D3',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#56A0D3',
        fillOpacity: 0.8,
        radius: 25
      }
      var oldPlayer = player;
      player = new google.maps.Circle(playerOptions);
      if(oldPlayer && oldPlayer.setMap){
        oldPlayer.setMap(null);  
      }
      return player;
    }
  }();



  $("#start-menu").modal();
  $("#btn-undergrad").on('click', function() {
    $("#start-menu").modal('hide');
    startGame(modes[0]);
  })



  var startGame = function(mode) {
    var coords = mode.startCoords;
    drawPlayer(coords);

    var places = mode.places;
    places.forEach(function(place) {
      new google.maps.Marker({
        position: place,
        map: map,
        title: place.name
      });
    });

    var keysDown = {};

    var coordsChange = function(coords) {
      drawPlayer(coords);
      places.forEach(function(place) {
        if(!place.visited && latLngDistance(coords, place) < 0.00020) {
          [37, 38, 39, 40].forEach(function(i){
            keysDown[i] = false;
          })
          alert(place.text);
          place.visited = true;
        }
      });
    }

    $(document).on('keydown', function(e) {
      keysDown[e.keyCode] = true;
    });
    $(document).on('keyup', function(e) {
      keysDown[e.keyCode] = false;
    });
    $(document).on('keydown keyup', function(e){
      var diff = 0.00005
      if (keysDown['37']) { // left
        coords.lng -= diff;
        coordsChange(coords);
      } else if (keysDown['39']) { // right
        coords.lng += diff;
        coordsChange(coords);
      } 
      if (keysDown['38']) { // up
        coords.lat += diff;
        coordsChange(coords);
      } else if (keysDown['40']) { // down
        coords.lat -= diff;
        coordsChange(coords);
      } 
    });

  };
};

$(document).on('ready', initializeMap);
