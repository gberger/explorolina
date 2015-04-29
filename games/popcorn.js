enchant();
var count; 
window.onload = function() {
  var game = new Game(666, 443);
  game.preload('res/avatarsheet.png', 'res/microwave.png', 'res/microwavefire.png', 'res/popcorn.png', 'res/popcorn.mp3', 'res/firealarm.mp3', 'res/victory.mp3'); 
  game.fps = 30;
  game.scale = 1;
  game.onload = function() {
	  count = 0 ; 

    var scene = new SceneGame();
	
    game.pushScene(scene);
	
  }
  game.start();

  var SceneGame = Class.create(Scene, {
    initialize: function() {
	  var game, label, bg; 

      Scene.apply(this);
      game = Game.instance;

      label = new Label('SCORE<br>0');
      label.x = 9;
      label.y = 32;
      label.color = 'white';
      label.font = '16px strong';
      label.textAlign = 'center';
      label._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
      this.scoreLabel = label;

      bg = new Sprite(666,443);
      bg.image = game.assets['res/microwave.png'];

      this.addChild(bg);
      this.addChild(label);

      this.addEventListener(Event.TOUCH_START,this.handleTouchControl);
      //this.addEventListener(Event.ENTER_FRAME, this.update);
      this.scoreTimer = 0;
      this.score = 0;
      this.count=0;
    },
    handleTouchControl: function (evt) {
	 // bring popcorn into frame
	 // play popcorn effect
	 // add to score 
	 console.log(this.score); 
	 game.assets['res/popcorn.mp3'].play();
	 this.setScore(this.score + 1);
	 
	 if (count == 2){
		 console.log("winner"); 
		 game.replaceScene(new SceneWin());
	 }	 
	 
	 if (this.score >= 30){
		game.replaceScene(new SceneFire()); 
	 }
    },


setScore: function (value) {
  this.score = value;
  this.scoreLabel.text = 'SCORE<br>' + this.score;
}
});

 
// SceneGameOver
var SceneFire = Class.create(Scene, {
  initialize: function(score) {
 
    Scene.apply(this);
	back = new Sprite(666,443);
    back.image = game.assets['res/microwavefire.png'];
	game.assets['res/firealarm.mp3'].play();


        // Game Over label
        gameOverLabel = new Label("STARTED A FIRE<br><br>Tap to Move On");
        gameOverLabel.x = 140;
        gameOverLabel.y = 128;
        gameOverLabel.color = 'white';
        gameOverLabel.font = '30px strong';
        gameOverLabel.textAlign = 'center';

// Add labels
this.addChild(gameOverLabel);
	this.addChild(back); 
this.addEventListener(Event.TOUCH_START, this.touchToRestart);

},

touchToRestart: function(evt) {
  var game = Game.instance;
  count = count + 1; 
  console.log("COUNT" + count); 
  game.replaceScene(new SceneGame());
//  end(); 

}
});
// SceneGameOver
var SceneWin = Class.create(Scene, {
  initialize: function(score) {
 
 
    Scene.apply(this);
	bck = new Sprite(666,443);
    bck.image = game.assets['res/popcorn.png'];
	game.assets['res/victory.mp3'].play();


        // Game Over label
        gameOverLabel = new Label("YOU DID IT");
        gameOverLabel.x = 140;
        gameOverLabel.y = 128;
        gameOverLabel.color = 'white';
        gameOverLabel.font = '30px strong';
        gameOverLabel.textAlign = 'center';

// Add labels
this.addChild(gameOverLabel);
	this.addChild(bck); 
  parent.postMessage("win","*");

},

});

};