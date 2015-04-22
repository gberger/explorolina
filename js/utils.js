var latLngDistance = function(a, b) {
  return Math.sqrt( Math.pow(a.lat - b.lat, 2) + Math.pow(a.lng - b.lng, 2) );
}

var dialogueModal = $("#dialogue-modal");

var showDialogueModal = function(title, body, img, button, callback) {
  dialogueModal.find(".modal-title").text(title);
  dialogueModal.find(".modal-body").html(body);
  dialogueModal.find(".modal-img img").attr('src', img); 
  dialogueModal.find(".action-btn").text(button);

  if(callback) {
    dialogueModal.find(".action-btn").one('click', callback);
  }

  dialogueModal.modal();
}

var hideDialogueModal = function() {
  dialogueModal.modal('hide');
}


var gameModal = $("#game-modal");

var showGameModal = function(title, src, callback) {
  gameModal.find(".modal-title").text(title);
  gameModal.find('iframe').attr('src', src);
  gameModal.find(".action-btn").one('click', callback).one('click', function() {
    gameModal.find('iframe').attr('src', '');
  })
  gameModal.modal();
};
