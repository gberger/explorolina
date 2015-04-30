var game = this.game || (this.game={});

(function(game){

  var degrees = Math.PI / 180

  game.balls = {
    'slow ball': {
      className: 'SlowBall',
      radius: 13,
      density: 0.65,
      friction: 0.8,
      restitution: 0.35
    }
  };
  game.levels = [
    {
      hoopPosition: {x:50, y:170},
      ballName: 'slow ball',
      ballPosition: {x:350, y:250},
      ballRandomRange: {x:100, y:100},
      obstacles: []
    }
  ];
  game.currentLevel = game.levels[0]; // default the 1st level.
}).call(this, game);