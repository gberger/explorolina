// 1 - Start enchant.js
enchant();
 
// 2 - On document load 
window.onload = function() {
  // 3 - Starting point
  var game = new Game(666, 443);
  // 4 - Preload resourcess
  game.preload('res/thePit.png','res/avatarsheet.png','res/garybein.png','res/flyer.png','res/finalCountdown.mp3','res/sodo.mp3','res/Hit.mp3','res/toast.mp3');
  // 5 - Game settings
  game.fps = 30;
  game.scale = 1;
  game.onload = function() {
    // 6 - Once Game finishes loading
    
    var scene = new SceneGame();
        game.pushScene(scene);

  }
  // 7 - Start
  game.start();
  window.scrollTo(0, 0);
  // SceneGame  
var SceneGame = Class.create(Scene, {
     // The main gameplay scene.     
    initialize: function() {
        var game, label, bg,penguin,iceGroup,count,flyerGroup;
        // 1 - Call superclass constructor
        Scene.apply(this);

        // 2 - Access to the game singleton instance
        game = Game.instance;

        // 3 - Create child nodes
        // Label
label = new Label('SCORE<br>0');
label.x = 9;
label.y = 32;        
label.color = 'white';
label.font = '16px strong';
label.textAlign = 'center';
label._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
this.scoreLabel = label;

        bg = new Sprite(666,443);
        bg.image = game.assets['res/thePit.png'];
        penguin = new Penguin();
penguin.x = game.width/2 - penguin.width/2;
penguin.y = 280;
this.penguin = penguin;
// Ice group
flyerGroup=new Group();
this.flyerGroup=flyerGroup;
iceGroup = new Group();
this.iceGroup = iceGroup;


        // 4 - Add child nodes 
            
        this.addChild(bg); 
        this.addChild(flyerGroup);
        this.addChild(iceGroup);
         this.addChild(penguin);         
        this.addChild(label);
        // Touch listener

this.addEventListener(Event.TOUCH_START,this.handleTouchControl);
// Update
this.addEventListener(Event.ENTER_FRAME, this.update);


// Listen for taps

// Instance variables
this.generateIceTimer = 0;
this.animationDuration=0;
this.generateFlyerTimer=0;
this.scoreTimer = 0;
this.score = 0;
this.count=0;
this.meow=1;
// Background music
this.bgm = game.assets['res/finalCountdown.mp3']; // Add this line
// Start BGM
this.bgm.play();
    },
    handleTouchControl: function (evt) {
    var laneWidth, lane;
    laneWidth = 666/6;
    lane = Math.floor(evt.x/laneWidth);
    lane = Math.max(Math.min(6,lane),0);
    this.penguin.switchToLaneNumber(lane);
},

update: function(evt) {

  // Score increase as time passes
this.scoreTimer += evt.elapsed * 0.001;
if (this.scoreTimer >= 0.5) {
    this.setScore(this.score + 1);
    this.scoreTimer -= 0.5;
}
    // Check if it's time to create a new set of obstacles
    if(this.score<20)
    {
this.generateFlyerTimer += evt.elapsed * 0.001;
    if (this.generateFlyerTimer >= 1) {
        var flyer;
        this.generateFlyerTimer -= 1;
        flyer = new Flyer(Math.floor(Math.random()*3));
        //this.addChild(ice);
this.flyerGroup.addChild(flyer);
    }

        // Check collision
for (var i = this.flyerGroup.childNodes.length - 1; i >= 0; i--) {
    var flyer;
    flyer = this.flyerGroup.childNodes[i];
    if (flyer.intersect(this.penguin)){
        this.count+=1;
          this.meow=0;
    var game = Game.instance;
    game.assets['res/Hit.mp3'].play();

    this.flyerGroup.removeChild(flyer); 
    //this.penguin.updateAnimation2();
  

   // Add the following lines
    // Game over
    if(this.count>=3){
    this.bgm.stop();
  game.replaceScene(new SceneGameOver(this.score));  
}      
    break;
}
}
  

 if (this.count>=1 && this.meow==0) {
        this.animationDuration += evt.elapsed * 0.001;       
   
        this.penguin.frame =7 ;
        //this.frame = (this.frame + 2) % 4;
        if(this.animationDuration>=.5)
        {
        this.meow=1;
        this.animationDuration-=.5;
        }
    }
  else{
  this.animationDuration += evt.elapsed * 0.001;       
     if(this.animationDuration>=.5)
        {
this.penguin.frame=(this.penguin.frame + 1)%5;
this.animationDuration-=.5;
       }
  }  

}
else{

    this.generateIceTimer += evt.elapsed * 0.001;
    if (this.generateIceTimer >= 2) {
        var ice;
        this.generateIceTimer -= 2;
        ice = new Ice(Math.floor(Math.random()*3));
        //this.addChild(ice);
this.iceGroup.addChild(ice);
    }

    // Check collision
for (var i = this.iceGroup.childNodes.length - 1; i >= 0; i--) {
    var ice;
    ice = this.iceGroup.childNodes[i];
    if (ice.intersect(this.penguin)){
        this.count+=1;
          this.meow=0;
    var game = Game.instance;

     this.iceGroup.removeChild(ice); 
        if(this.count>=3){
    this.bgm.stop();
    game.replaceScene(new SceneGameOver(this.score)); 
    game.assets['res/genitals.mp3'].play(); 
    //this.penguin.updateAnimation2();
}
else{
    game.assets['res/toast.mp3'].play();

  }

   // Add the following lines
    // Game over

    break;
}
}
if (this.count>=1 && this.meow==0) {
        this.animationDuration += evt.elapsed * 0.001;       
   
        this.penguin.frame =7 ;
        //this.frame = (this.frame + 2) % 4;
        if(this.animationDuration>=.5)
        {
        this.meow=1;
        this.animationDuration-=.5;
        }
    }
  else{
  this.animationDuration += evt.elapsed * 0.001;       
     if(this.animationDuration>=.25)
        {
this.penguin.frame=(this.penguin.frame + 1)%5;
this.animationDuration-=.25;
       }
  } 

}
// Loop BGM
if (this.bgm.currentTime >= this.bgm.duration ){
    this.bgm.play();
}
},
setScore: function (value) {
    this.score = value;
    this.scoreLabel.text = 'SCORE<br>' + this.score;
}
});
// Penguin
 var Penguin = Class.create(Sprite, {
    // The player character.     
    initialize: function() {
        // 1 - Call superclass constructor
        Sprite.apply(this,[105, 105]);
        this.image = Game.instance.assets['res/avatarsheet.png'];
        // 2 - Animate
        this.animationDuration = 0;
       // this.addEventListener(Event.ENTER_FRAME, this.updateAnimation);
       
    },
    /*updateAnimation: function (evt) {        
    this.animationDuration += evt.elapsed * 0.001;       
   

 if (this.animationDuration >= 0.25) {
        this.frame = (this.frame + 1) % 5;
        //this.frame = (this.frame + 2) % 4;
        this.animationDuration -= 0.25;
    }

},*/

switchToLaneNumber: function(lane){     
    var targetX = 160 - this.width/2 + (lane-1)*90;
    this.x = targetX;
}
});
 // Ice Boulder
var Ice = Class.create(Sprite, {
    // The obstacle that the penguin must avoid
    initialize: function(lane) {
        // Call superclass constructor
        Sprite.apply(this,[160, 240]);
        this.image  = Game.instance.assets['res/garybein.png'];      
        this.rotationSpeed = 0;
        this.setLane(lane);
        this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    setLane: function(lane) {
  var game, distance;
  game = Game.instance;        
  distance = 180;
 
  this.rotationSpeed = Math.random() * 100 - 50;
 
    this.x = game.width/2 - this.width/2 + (lane - 1) * distance;
    this.y = -this.height/2;    
   // this.rotation = Math.floor( Math.random() * 360 );    
},
update: function(evt) { 
  var ySpeed, game;
 
  game = Game.instance;
    ySpeed = 300;
 
  this.y += ySpeed * evt.elapsed * 0.001;
  //this.rotation += this.rotationSpeed * evt.elapsed * 0.001;           
    if (this.y > game.height) {
        this.parentNode.removeChild(this);        
    }
}
});
var Flyer = Class.create(Sprite, {
    // The obstacle that the penguin must avoid
    initialize: function(lane) {
        // Call superclass constructor
        Sprite.apply(this,[70, 90]);
        this.image  = Game.instance.assets['res/flyer.png'];      
        this.rotationSpeed = 0;
        this.setLane(lane);
        this.addEventListener(Event.ENTER_FRAME, this.update);

    },
    setLane: function(lane) {
  var game, distance;
  game = Game.instance;        
  distance = 180;
 
  this.rotationSpeed = Math.random() * 100 - 50;
 
    this.x = game.width/2 - this.width/2 + (lane - 1) * distance;
    this.y = -this.height;    
    this.rotation = Math.floor( Math.random() * 360 );    
},
update: function(evt) { 
  var ySpeed, game;
 
  game = Game.instance;
    ySpeed = 300;
 
  this.y += ySpeed * evt.elapsed * 0.001;
  this.rotation += this.rotationSpeed * evt.elapsed * 0.004;           
    if (this.y > game.height) {
        this.parentNode.removeChild(this);        
    }
}
});
// SceneGameOver  
var SceneGameOver = Class.create(Scene, {
    initialize: function(score) {
        var gameOverLabel, scoreLabel;
        Scene.apply(this);
        this.backgroundColor = 'black';
        // Game Over label
gameOverLabel = new Label("GAME OVER<br><br>Tap to Restart");
gameOverLabel.x = 140;
gameOverLabel.y = 128;
gameOverLabel.color = 'white';
gameOverLabel.font = '30px strong';
gameOverLabel.textAlign = 'center';
// Score label
scoreLabel = new Label('SCORE<br>' + score);
scoreLabel.x =140;
scoreLabel.y = 32;        
scoreLabel.color = 'white';
scoreLabel.font = '16px strong';
scoreLabel.textAlign = 'center';

// Add labels
this.addChild(gameOverLabel);
this.addChild(scoreLabel);
this.addEventListener(Event.TOUCH_START, this.touchToRestart);
    },
    touchToRestart: function(evt) {
    var game = Game.instance;
    game.replaceScene(new SceneGame());
}
});

};