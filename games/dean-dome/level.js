var game = this.game || (this.game={});

(function(game){

  var degrees = Math.PI / 180

  game.balls = {
    'slow ball': {
      className: 'SlowBall',
      radius: 13,
      density: 0.6,
      friction: 0.8,
      restitution: 0.1
    },
    'bouncy ball': {
      className: 'BouncyBall',
      radius: 10,
      density: 1.1,
      friction: 0.8,
      restitution: 0.4
    }
  };
  game.levels = [
    {
      hoopPosition: {x:50, y:150},
      ballName: 'slow ball',
      ballPosition: {x:350, y:250},
      ballRandomRange: {x:60, y:60},
      obstacles: []
    }
  ];
  game.currentLevel = game.levels[0]; // default the 1st level.
}).call(this, game);