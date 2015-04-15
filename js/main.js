var initializeMap = function() {
  var center = { lat: 35.907970, lng: -79.047899};

  var mapOptions = {
    center: center,
    disableDefaultUI: true,
    draggable: false,
    scrollwheel: false,
    panControl: false,
    maxZoom: 15,
    minZoom: 15,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{
      featureType: "poi",
      elementType: "labels",
      stylers: [ { visibility: "off" } ]
    }]
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  $(window).resize(function() {
    map.setCenter(center);
  });

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
    var placeIndex = -1;
    var place = places[placeIndex];
    var marker = null;

    var drawPlace = function(place) {
      if(marker && marker.setMap) {
        marker.setMap(null);
      }
      if(place) {
        marker = new google.maps.Marker({
          position: place,
          title: place.name,
          map: map
        });   
      } else {
        marker = null;
      }
    };

    var nextPlace = function() {
      placeIndex++;
      place = places[placeIndex];
      drawPlace(place);
    };

    var activatePlace = function(place) {
      place.visited = true;
      showMiscModal(place.name, place.text);
      nextPlace();
    }

    nextPlace();

    var directions = {
      up: false,
      down: false,
      right: false,
      left: false
    };

    var keyToDirections = {
      87: 'up',
      65: 'left',
      83: 'down',
      68: 'right',
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    }

    var coordsChange = function(coords) {
      drawPlayer(coords);
      if(place && latLngDistance(coords, place) < 0.00020) {
        directions = {
          up: false,
          down: false,
          right: false,
          left: false
        };
        activatePlace(place);
      }
    };

    $(document).on('keydown', function(e) {
      if(keyToDirections[e.keyCode]) {
        directions[keyToDirections[e.keyCode]] = true;
      }
    });
    $(document).on('keyup', function(e) {
      if(keyToDirections[e.keyCode]) {
        directions[keyToDirections[e.keyCode]] = false;
      }
    });
    $(document).on('keydown keyup', function(e){
      var diff = 0.00005
      if (directions.left) { // left
        coords.lng -= diff;
        coordsChange(coords);
      } else if (directions.right) { // right
        coords.lng += diff;
        coordsChange(coords);
      } 
      if (directions.up) { // up
        coords.lat += diff;
        coordsChange(coords);
      } else if (directions.down) { // down
        coords.lat -= diff;
        coordsChange(coords);
      } 
    });

  };
};

$(document).on('ready', initializeMap);
