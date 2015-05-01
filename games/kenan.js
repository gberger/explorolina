var TIME_TO_RUN = 55.0;
var FPS = 30
var WIDTH = 640;
var HEIGHT = 360;
var RAM_STEPS = 2;

enchant();
window.onload = function() {
  var game = new Game(WIDTH, HEIGHT);

  game.preload('res/Gio_run.jpg', 'res/avatarsheet.png', 'res/crowd.mp3');

  game.fps = FPS;
  game.scale = 1;

  game.onload = function() {
    var scene = new SceneStart();
    game.pushScene(scene);
  }

  game.start();
};

var SceneStart = Class.create(Scene, {
  initialize: function(score) {
    var label;
    Scene.apply(this);
    this.backgroundColor = 'black';

    var label = new Label("Press left or tap the screen to run!<br><br>Make it to the end in " + TIME_TO_RUN.toFixed(0) + " seconds.<br><br>Press any key to start.");
    label.x = 0;
    label.y = 40;
    label.color = 'white';
    label.font = '32px strong';
    label.width = WIDTH;
    label.height = HEIGHT;
    label.textAlign = 'center';

    this.addChild(label);
    this.addEventListener(Event.TOUCH_START, this.touchToStart);
    this.addEventListener(Event.INPUT_END, this.touchToStart);
  },

  touchToStart: function(evt) {
    var game = Game.instance;
    game.replaceScene(new SceneGame());
  }
});

var SceneGame = Class.create(Scene, {

  initialize: function() {
    // superclass constructor
    Scene.apply(this);

    this.game = Game.instance;

    this.timeLabel = new Label('Time Reamining');
    this.timeLabel.x = 400;
    this.timeLabel.y = 30;
    this.timeLabel.color = 'white';
    this.timeLabel.font = '20px strong';
    this.timeLabel.textAlign = 'center';
    this.timeLabel._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

    this.scoreLabel = new Label(TIME_TO_RUN.toFixed(2));
    this.scoreLabel.x = 400;
    this.scoreLabel.y = 60;
    this.scoreLabel.color = 'white';
    this.scoreLabel.font = '20px strong';
    this.scoreLabel.textAlign = 'center';
    this.scoreLabel._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";


    this.bg = new Sprite(640,360);
    this.bg.image = this.game.assets['res/Gio_run.jpg'];

    this.ram = new Ram();
    this.ram.x = 555;
    this.ram.y = 250;

    this.bgm = this.game.assets['res/crowd.mp3'];
    this.bgm.play();

    this.timeLeft = TIME_TO_RUN;

    this.addChild(this.bg);
    this.addChild(this.ram);
    this.addChild(this.timeLabel);
    this.addChild(this.scoreLabel)

    this.addEventListener(Event.TOUCH_END, this.moveLeft);
    this.addEventListener(Event.LEFT_BUTTON_UP, this.handleKeyControl);
    this.addEventListener(Event.ENTER_FRAME, this.update);

  },

  handleKeyControl: function(evt) {
    this.moveLeft();
  },

  moveLeft: function(evt) {
    this.ram.x -= RAM_STEPS;
  },



  update: function(evt) {
    this.timeLeft -= 1/FPS;
    this.scoreLabel.text = this.timeLeft.toFixed(2);

    // lose condition
    if(this.timeLeft <= 0){
      this.bgm.stop();
      this.game.replaceScene(new SceneGameOver(this.timeLeft));
    }

    // win condition
    if(this.ram.x <= 40 && this.timeLeft > 0) {
      this.game.replaceScene(new SceneWonGame(this.timeLeft));
    }

    // loop bgm
    if (this.bgm.currentTime >= this.bgm.duration ){
      this.bgm.play();
    }
  }
});

var Ram = Class.create(Sprite, {
  initialize: function() {
    Sprite.apply(this, [105,105]);
    this.image = Game.instance.assets['res/avatarsheet.png'];
    this.animationDuration = 0;
    this.addEventListener(Event.ENTER_FRAME, this.updateAnimation);
  },
  updateAnimation: function (evt) {
    this.frame = Math.floor(new Date() % 1000 / (1000/6))
  }
});

var SceneGameOver = Class.create(Scene, {
  initialize: function(score) {
    var label;
    Scene.apply(this);
    this.backgroundColor = 'black';

    var label = new Label("GAME OVER<br><br>Tap to Restart");
    label.x = 8;
    label.y = 128;
    label.color = 'white';
    label.font = '32px strong';
    label.textAlign = 'center';

    this.addChild(label);
    this.addEventListener(Event.TOUCH_START, this.touchToRestart);
  },

  touchToRestart: function(evt) {
    var game = Game.instance;
    game.replaceScene(new SceneGame());
  }
});

var SceneWonGame = Class.create(Scene, {
  initialize: function(score) {
    Scene.apply(this);
    this.backgroundColor = 'black';

    var label = new Label("YOU WON!!");
    label.x = 8;
    label.y = 128;
    label.color = 'white';
    label.font = '32px strong';
    label.textAlign = 'center';

    this.addChild(label);
    window.parent.postMessage("win","*");
  }
});