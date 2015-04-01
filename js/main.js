  var places = [
    {name: "Dean Dome", lat: 35.899446, lng: -79.043976},
    {name: "Hinton James Hall", lat: 35.902304, lng: -79.043451},
    {name: "Kenan Stadium", lat: 35.906954, lng: -79.047914},
    {name: "The Pit", lat: 35.91013, lng: -79.048571},
    {name: "Undergraduate Library", lat: 35.909952, lng: -79.049169},
    {name: "Silent Sam",lat: 35.913864, lng: -79.052234},
    {name: "Sutton's Drugstore", lat: 35.914057, lng: -79.053863},
    {name: "Old Well", lat: 35.912061, lng: -79.051242}
  ];

  var startCoord = {lat: 35.900883, lng: -79.044008};

  function initialize() {
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

    var coords = startCoord;      

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
        if(player && player.setMap){
          player.setMap(null);  
        }
        player = new google.maps.Circle(playerOptions);
        return player;
      }
    }();

    drawPlayer(coords);

    places.forEach(function(place) {
      new google.maps.Marker({
        position: place,
        map: map,
        title: place.name
      });
    });

    document.onkeydown = function(e){
        var diff = 0.00005
        e = e || window.event;
        if (e.keyCode == '38') {
          coords.lat += diff;
          drawPlayer(coords);
        }
        else if (e.keyCode == '40') {
          coords.lat -= diff;
          drawPlayer(coords);
        }
        else if (e.keyCode == '37') {
          coords.lng -= diff;
          drawPlayer(coords);
        }
        else if (e.keyCode == '39') {
          coords.lng += diff;
          drawPlayer(coords);
        }
    }

  }
  google.maps.event.addDomListener(window, 'load', initialize);

