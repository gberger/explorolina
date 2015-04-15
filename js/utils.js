var latLngDistance = function(a, b) {
  return Math.sqrt( Math.pow(a.lat - b.lat, 2) + Math.pow(a.lng - b.lng, 2) );
}

var miscModal = $("#misc-modal");

var showMiscModal = function() {
  miscModal.modal();
}

var hideMiscModal = function() {
  miscModal.modal('hide');
}