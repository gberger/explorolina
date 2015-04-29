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
        position: coords,
        icon: {
          url: 'img/tarheelicon.png',
          anchor: new google.maps.Point(25, 25)
        }
      }
      var oldPlayer = player;
      player = new google.maps.Marker(playerOptions);
      if(oldPlayer && oldPlayer.setMap){
        oldPlayer.setMap(null);
      }
      return player;
    }
  }();



  $("#start-menu").modal(modalOptions);
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
    var placeMarker = null;
    var inModal = false;

    var drawPlace = function(place) {
      if(placeMarker && placeMarker.setMap) {
        placeMarker.setMap(null);
      }
      if(place) {
        placeMarker = new google.maps.Marker({
          position: place,
          title: place.name,
          map: map
        });
      } else {
        placeMarker = null;
      }
    };

    var nextPlace = function() {
      placeIndex++;
      place = places[placeIndex];
      drawPlace(place);
      inModal = false;
    };

    var activatePlace = function(place) {
      var frame = place.frames[0];
      var i = 0;
      inModal = true;

      function aa (){
        i++;
        if (i < place.frames.length) {
          frame = place.frames[i];

          if(frame.type == "dialogue") {
            showDialogueModal(place.name, frame.body, frame.img, frame.button, aa);
            return false;
          } else if (frame.type == "game") {
            hideDialogueModal();
            showGameModal(place.name, frame.src, nextPlace);

            function wl (e, winOrLose) {
              if(winOrLose == 'win') {
                winGame();
              } else if(winOrLose == 'lose') {
                refreshGame();
                $(window).one('game-event', wl);
              } else {
                debugger
              }
            }

            $(window).one('game-event', wl)
          }
        } else {
          nextPlace();
        }
      }

      showDialogueModal(place.name, frame.body, frame.img, frame.button, aa);
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
      if(place && latLngDistance(coords, place) < 0.00040) {
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
      if(!inModal) {
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
      }
    });


    // GPS
    if (isMobile.any) {
      $.geolocation.watch({
        settings: {
          enableHighAccuracy: true
        },
        success: function(position) {
          coords = {lat: position.coords.latitude, lng: position.coords.longitude};
          coordsChange(coords);
        }
      })
    }

  };
};

$(document).on('ready', initializeMap);
