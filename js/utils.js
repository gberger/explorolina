var latLngDistance = function(a, b) {
  return Math.sqrt( Math.pow(a.lat - b.lat, 2) + Math.pow(a.lng - b.lng, 2) );
}

var miscModal = $("#misc-modal");

//var showMiscModal = function(title, body) {
  //miscModal.find(".modal-title").text(title);
  //miscModal.find(".modal-body").text(body);
 // miscModal.modal();
//}

var showMiscModal = function(title, body, img, button) {
  miscModal.find(".modal-title").text(title);
  miscModal.find(".modal-body").html(body);
  miscModal.find(".modal-img").html(img); 
  miscModal.find(".button-name").text(button);
  miscModal.modal();
}


var hideMiscModal = function() {
  miscModal.modal('hide');
}