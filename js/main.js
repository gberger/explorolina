var places = [
  {
    name: "Dean Dome", 
    text: "Dean Dome: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    lat: 35.899446, 
    lng: -79.043976,
    visited: false
  }, {
    name: "Hinton James Hall", 
    text: "Hinton James Hall: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    lat: 35.902304, 
    lng: -79.043451,
    visited: false
  }, {
    name: "Kenan Stadium", 
    text: "Kenan Stadium: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    lat: 35.906954, 
    lng: -79.047914,
    visited: false
  }, {
    name: "The Pit", 
    text: "The Pit: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    lat: 35.91013, 
    lng: -79.048571,
    visited: false
  }, {
    name: "Undergraduate Library", 
    text: "Undergraduate Library: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    lat: 35.909952, 
    lng: -79.049169,
    visited: false
  }, {
    name: "Silent Sam",
    text: "Silent Sa: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    lat: 35.913864, 
    lng: -79.052234,
    visited: false
  }, {
    name: "Sutton's Drugstore", 
    text: "Sutton's Drugstore: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    lat: 35.914057, 
    lng: -79.053863,
    visited: false
  }, {
    name: "Old Well", 
    text: "Old Well: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    lat: 35.912061, 
    lng: -79.051242,
    visited: false
  } 
];

var latLngDistance = function(a, b) {
  return Math.sqrt( Math.pow(a.lat - b.lat, 2) + Math.pow(a.lng - b.lng, 2) );
}

var startCoord = {lat: 35.900883, lng: -79.044008};

var initialize = function() {
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

  var coordsChange = function(coords) {
    drawPlayer(coords);
    places.forEach(function(place) {
      if(!place.visited && latLngDistance(coords, place) < 0.00020) {
        alert(place.text);
        place.visited = true;
      }
    });
  }

  $(document).on('keydown', function(e){
      var diff = 0.00005
      if (e.keyCode == '38') {
        // up
        coords.lat += diff;
        coordsChange(coords);
      }
      else if (e.keyCode == '40') {
        // down
        coords.lat -= diff;
        coordsChange(coords);
      }
      else if (e.keyCode == '37') {
        // left
        coords.lng -= diff;
        coordsChange(coords);
      }
      else if (e.keyCode == '39') {
        // right
        coords.lng += diff;
        coordsChange(coords);
      }
  });

}

$(document).on('ready', initialize);