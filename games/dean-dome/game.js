var game = this.game || (this.game={});
var createjs = createjs || {};
var images = images||{};

;(function(game, cjs, b2d){
  game.load = function() {
    // load bitmap assets before starts the game
    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", function(e){
      if (e.item.type === "image") { images[e.item.id] = e.result; }  // assgin to images object for assets.js to use
    });
    loader.addEventListener("complete", game.start);
    loader.loadManifest(lib.properties.manifest);
  };

  game.start = function() {
    console.log("Let's start.");

    cjs.EventDispatcher.initialize(game); // allow the game object to listen and dispatch custom events.

    game.canvas = document.getElementById('canvas');

    game.stage = new cjs.Stage(game.canvas);
    cjs.Touch.enable(game.stage, /*single touch=*/ true, /*allow default=*/ true);

    cjs.Ticker.setFPS(60);
    cjs.Ticker.addEventListener('tick', game.stage); // add game.stage to ticker make the stage.update call automatically.
    cjs.Ticker.addEventListener('tick', game.tick); // gameloop

    game.physics.createWorld();
    game.view.initPowerIndicator();

    var levelSelection = new lib.LevelSelection();
    game.stage.addChild(levelSelection);

    game.isPlaying = false;
    levelSelection.playButton.on('click', function() {
      levelSelection.parent.removeChild(levelSelection);
      // game.physics.showDebugDraw();
      game.score = 0;
      game.timeLeft = 30;
      game.start = new Date();
      game.currentLevel = game.levels[0];
      game.physics.createLevel();
      game.view.showScoreBoard();
      game.view.showClock();
      game.isPlaying = true;
    });
    

    game.mouseBefore = false;
    game.tickWhenDown = 0;
    game.tickWhenUp = 0;
    game.stage.on('stagemousedown', function(e){
      if (!game.isPlaying) { return; }
      if (!game.physics.ball) { 
        game.mouseBefore = true;
        return; 
      }
      game.mouseBefore = false;

      var position = game.physics.ballPosition();
      game.view.showPowerIndicator(position.x, position.y);

      var rotation = game.physics.launchAngle(e.stageX, e.stageY);
      game.view.rotatePowerIndicator(rotation* 180 / Math.PI);

      game.tickWhenDown = cjs.Ticker.getTicks();
      game.view.updatePowerBar(0);
    });
    game.stage.on('stagemousemove', function(e){
      if (!game.isPlaying) { return; }
      if (!game.physics.ball) { return; }

      var rotation = game.physics.launchAngle(e.stageX, e.stageY);
      game.view.rotatePowerIndicator(rotation* 180 / Math.PI);
    });
    game.stage.on('stagemouseup', function(e){
      if (!game.isPlaying) { return; }
      if (!game.physics.ball || game.mouseBefore) { return; }

      game.view.hidePowerIndicator();
      game.tickWhenUp = cjs.Ticker.getTicks();
      ticksDiff = game.tickWhenUp - game.tickWhenDown;

      game.physics.shootBall(e.stageX, e.stageY, ticksDiff);

      setTimeout(game.spawnBall, 500);
    });

  };

  game.increaseScore = function() {
    game.score += 1;
    game.view.updateScore();
    console.log(game.score);
  };

  game.spawnBall = function() {
    game.physics.spawnBall();
  };

  game.tick = function(){
    if (cjs.Ticker.getPaused()) { return; } // run when not paused

    game.physics.update();

    // launch power preview
    var ticksDiff = cjs.Ticker.getTicks() - game.tickWhenDown;
    game.view.updatePowerBar(ticksDiff);
    
    if(game.isPlaying) {
      // update clock
      var now = new Date();
      game.timeLeft = Math.max(0, 30 - (now - game.start)/1000);
      game.view.updateClock();

      // win/lose
      if(game.timeLeft > 0 && game.score >= 10) {
        game.goToWin();
      } else if(game.timeLeft <= 0) {
        game.goToLose();
      }
    }  
  };

  game.goToWin = function() {
    game.isPlaying = false;
    parent.postMessage("win","*");
  }

  game.goToLose = function() {
    game.isPlaying = false;
    parent.postMessage("lose","*");
  }

  game.load();


}).call(this, game, createjs, Box2D);


