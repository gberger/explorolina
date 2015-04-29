// 1 - Start enchant.js
enchant();
// 2 - On document load 
window.onload = function() {
	// 3 - Starting point
	var game = new Game(640, 360);
	// 4 - Preload resources
	game.preload('res/Gio_run.jpg',
				 'res/avatarsheet.png',
				 'res/crowd.mp3');
	// 5 - Game settings
	game.fps = 30;
	game.scale = 1;
	game.onload = function() {
		// 6 - Once Game finishes loading
		console.log("Run Gio Run!");
		var scene = new SceneGame();
		game.pushScene(scene);
	}
	// 7 - Start
	game.start();   
};
// SceneGame  
var SceneGame = Class.create(Scene, {
     // The main gameplay scene.     
    initialize: function() {
        var game, label, bg, ram;
 
        // 1 - Call superclass constructor
        Scene.apply(this);
        // 2 - Access to the game singleton instance
        game = Game.instance;
        this.game = game;
        // 3 - Create child nodes
        // label = new Label("Run Gio Run!");
        // Label
		label = new Label('Time Reamining: <br> ');
		label.x = 400;
		label.y = 30;        
		label.color = 'white';
		label.font = '20px strong';
		label.textAlign = 'center';
		label._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
		this.scoreLabel = label;        
        bg = new Sprite(640,360);
        bg.image = game.assets['res/Gio_run.jpg'];
        // Ram
        ram = new Ram();
		this.ram = ram;
		//ram.x = game.width/2 - ram.width/2;
		//ram.y = 280;
        // 4 - Add child nodes        
        this.addChild(bg);
        this.addChild(ram);        
        this.addChild(label);
        // Touch/Click listener
		this.addEventListener(Event.TOUCH_START,this.handleTouchControl);
		// this.addEventListener(Event.LEFT_BUTTON_DOWN, this.handleKeyControl);
		this.addEventListener(Event.DOWN_BUTTON_UP, this.handleKeyControl);
		this.addEventListener(Event.LEFT_BUTTON_UP, this.handleKeyControl);
		// this.addEventListener(Event.ENTER_FRAME,this.update);

		this.scoreTimer = 15;
		this.elapsedTime = 0;

		//Background Music
		this.bgm = game.assets['res/crowd.mp3'];
		this.bgm.play();

    },

    handleTouchControl: function (evt) {
    	console.log(evt.x, evt.y)
    	//602,333
	    var laneWidth, lane;
	    laneWidth = 640/3;
	    lane = Math.ceil(evt.x/laneWidth);
	    lane = Math.max(Math.max(2,lane),0);
	    console.log(lane);
	    this.ram.switchToLaneNumber(evt.x, evt.y);
	    this.addEventListener(Event.ENTER_FRAME,this.update);
	},

	handleKeyControl: function(evt) {
		console.log(evt);

		if(evt.type == 'leftbuttonup'){
			//this.ram.movePosition(this.ram.x, this.ram.y);
			this.ram.x = this.ram.x-2;
			this.ram.y = this.ram.y;
			//console.log(this.ram.x);
			//console.log("score timer"+this.scoreTimer);
			if(this.ram.x <= 40 && this.scoreTimer >= 0)
			{
				this.game.replaceScene(new SceneWonGame(this.scoreTimer));
				//alert("You won");
			}
		    this.addEventListener(Event.ENTER_FRAME,this.update);

		} else if(evt.type =='downbuttonup'){
					this.ram.x = 555;
					this.ram.y = 250;
				    this.addEventListener(Event.ENTER_FRAME,this.update);
		}
		//Left Button Down evt: leftbuttondown
		//Left Button Up evt: leftbuttonup
		// console.log("Left Key Down"+evt);
		// console.log(evt);
		// console.log("Left Key Up"+evt);
		// console.log(evt);
	},

	update: function(evt) {
        // Score increase as time pass
        //var elapsedTime;
        this.elapsedTime += evt.elapsed * 0.001;
        if(this.elapsedTime >= 0.01){
            this.setScore((this.scoreTimer-0.01).toFixed(2));
            if(this.scoreTimer == 0.0){
            	this.bgm.stop();
				this.game.replaceScene(new SceneGameOver(this.scoreTimer));        
            }
            this.elapsedTime -= 0.01;
        }

        if (this.bgm.currentTime >= this.bgm.duration ){
    		this.bgm.play();
		}
    },

	setScore: function(value){
		// console.log("setScore"+value);
		this.scoreTimer = value;
		this.scoreLabel.text = 'Time Remaining <br>' + this.scoreTimer;
	}
});

var Ram = Class.create(Sprite, {
	//Ram Characteristics
	initialize: function() {
		//Superclass Constructor
		Sprite.apply(this, [105,105]);
		this.image = Game.instance.assets['res/avatarsheet.png'];
		//Animation
		this.animationDuration = 0;
		this.addEventListener(Event.ENTER_FRAME, this.updateAnimation);

	},
	updateAnimation: function (evt) {
		// Score increase as time passes
		this.animationDuration += evt.elapsed * 0.001;  
		 if (this.animationDuration >= 0.15) {
         	this.frame = (this.frame + 1) % 6;
        	//this.frame = (this.frame + 2) % 4;
        	this.animationDuration -= 0.15;
    	}
	},
    movePosition: function(posX, posY){
    	console.log("posX"+posX);
    	console.log("posY"+posY);
    	this.x = posX-2;
    	this.y = posY; 
    	// this.x = 602;
    	// this.y = 300;    
	    // var targetX = 160 - this.width/2 + (lane-1)*90;
	    // console.log("targexX"+targetX);
	    // this.x = targetX;
	}
});

var SceneGameOver = Class.create(Scene, {
    initialize: function(score) {
        var gameOverLabel;
        Scene.apply(this);
        this.backgroundColor = 'black';

        gameOverLabel = new Label("GAME OVER<br><br>Tap to Restart");
        gameOverLabel.x = 8;
        gameOverLabel.y = 128;
        gameOverLabel.color = 'white';
        gameOverLabel.font = '32px strong';
        gameOverLabel.textAlign = 'center';

        // Add labels
		this.addChild(gameOverLabel);

		this.addEventListener(Event.TOUCH_START, this.touchToRestart);

    },

    touchToRestart: function(evt) {
	    var game = Game.instance;
	    game.replaceScene(new SceneGame());
	}
});

var SceneWonGame = Class.create(Scene, {
    initialize: function(score) {
        var gameOverLabel;
        Scene.apply(this);
        this.backgroundColor = 'black';

        gameOverLabel = new Label("YOU WON!!");
        gameOverLabel.x = 8;
        gameOverLabel.y = 128;
        gameOverLabel.color = 'white';
        gameOverLabel.font = '32px strong';
        gameOverLabel.textAlign = 'center';
        // Add labels
		this.addChild(gameOverLabel);
		window.parent.postMessage("win","*");
		// this.addEventListener(Event.TOUCH_START, this.touchToRestart);

    },

    touchToRestart: function(evt) {
	    var game = Game.instance;
	    game.replaceScene(new SceneGame());
	}
});