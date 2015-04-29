(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"./res/dome.jpg", id:"lv1"}
	]
};

(lib.SlowBall = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Ag8BzQgQgJgOgOQgngmAAg2QAAg0AngmQAOgOAQgJQAcgQAgAAQAhAAAcAPQAQAJAPAPQAmAmAAA0QAAA2gmAmQgPAOgRAJQgbAPghAAQggAAgcgPgAA9hyIgBDlAg8hxIAADk");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AA9hyQAQAJAPAPQAmAmgBA0QABA1gmAnQgPAOgRAJgAhaBcQgngnABg1QgBg0AngmQAOgOAQgJIAADjQgQgIgOgOg");

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#56A0D3").s().p("Ag8BzIAAjkQAcgPAgAAQAhAAAcAOIgBDlQgbAPghgBQggAAgcgOg");

	this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-14,-14,28,28);



(lib.ScoreBoard = function() {
	this.initialize();

	// Layer 1
	this.textField = new cjs.Text("0", "bold 19px Courier, monospace", "red");
	this.textField.name = "textField";
	this.textField.lineHeight = 23;
	this.textField.lineWidth = 35;
	this.textField.setTransform(8.6,3.1);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").p("AESCJQAAAGgCAFQgCAFgEAAIhkgBQgmgBgdACIghABQhAABiEABQgWgDgMAAIhkAAQgDAAgDgFQgDgEAAgHIAAhBQgChJAChKIAAhCQAAgGADgEQADgEADAAIISAAQAEAAACAEQACAEAAAGIAABCQgBAZABAxQACAugCAbg");
	this.shape.setTransform(27.5,15.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFCE2").s().p("AikCZIhkAAQgDAAgDgFQgDgEAAgHIAAhBQgChJAChKIAAhCQAAgGADgEQADgEADAAIISAAQAEAAACAEQACAEAAAGIAABCQgBAZABAxQACAugCAbIAABBQAAAGgCAFQgCAFgEAAIhkgBQgmgBgdACIghABIjEACQgWgDgMAAg");
	this.shape_1.setTransform(27.5,15.7);

	this.addChild(this.shape_1,this.shape,this.textField);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-1,-1,57.1,34.6);


(lib.Clock = function() {
	this.initialize();

	// Layer 1
	this.textField = new cjs.Text("30.0", "bold 19px Courier, monospace", "red");
	this.textField.name = "textField";
	this.textField.lineHeight = 23;
	this.textField.lineWidth = 35;
	this.textField.setTransform(8.6,3.1);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").p("AESCJQAAAGgCAFQgCAFgEAAIhkgBQgmgBgdACIghABQhAABiEABQgWgDgMAAIhkAAQgDAAgDgFQgDgEAAgHIAAhBQgChJAChKIAAhCQAAgGADgEQADgEADAAIISAAQAEAAACAEQACAEAAAGIAABCQgBAZABAxQACAugCAbg");
	this.shape.setTransform(27.5,15.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFCE2").s().p("AikCZIhkAAQgDAAgDgFQgDgEAAgHIAAhBQgChJAChKIAAhCQAAgGADgEQADgEADAAIISAAQAEAAACAEQACAEAAAGIAABCQgBAZABAxQACAugCAbIAABBQAAAGgCAFQgCAFgEAAIhkgBQgmgBgdACIghABIjEACQgWgDgMAAg");
	this.shape_1.setTransform(27.5,15.7);

	this.addChild(this.shape_1,this.shape,this.textField);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-1,-1,57.1,34.6);


(lib.PowerBar = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF3300").s().p("AgvAKIAAgSIBfAAIAAASg");
	this.shape.setTransform(0,-1);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-4.8,-2,9.8,2);


(lib.PlayButton = function() {
	this.initialize();

	// Layer 1
	this.text = new cjs.Text("Play Game", "26px 'Andola'");
	this.text.lineHeight = 32;
	this.text.setTransform(-70.6,-11.9);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").p("ANCDbQAAAKgGAGQgHAHgKAAQhAAAjxgCQiHgBhvADQjZAFkQgBQlHgDjCgBIg8AAQgJAAgIgHQgGgGAAgKIAAhlQAEhOgBhAQgDiJAAg0QAAgKAGgGQAHgHAKAAIBrAAQC/gNFpAFQFwAGBbgGQDZABB+ADQCAAEAgAAQAKAAAHAHQAGAHAAAJIAABlQgEBOABBAQADCKAAAzg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFCE2").s().p("AjlD2IoJgEIg8AAQgJAAgIgHQgGgGAAgKIAAhlQAEhOgBhAQgDiJAAg0QAAgKAGgGQAHgHAKAAIBrAAQC/gNFpAFQFwAGBbgGQDZABB+ADICgAEQAKAAAHAHQAGAHAAAJIAABlQgEBOABBAQADCKAAAzQAAAKgGAGQgHAHgKAAIkxgCQiHgBhvADQi4AEjeAAIhTAAg");

	this.addChild(this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-84.4,-26.9,169,56.1);


(lib.HoopSquare = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgxAyIAAhjIBjAAIAABjg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-5,-5,10,10);


(lib.HoopSensor = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(102,255,0,0.62)").s().p("AjGAdIAAg5IGNAAIAAA5g");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-20,-3,40,6);


(lib.HoopBoard = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(1,1,1).p("AgxmOIBjAAIAAMdIhjAAg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgxGPIAAsdIBjAAIAAMdg");

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-6,-41,12,82);



(lib.BouncyBall = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AguhXQAVgMAZAAQAaAAAVAMQANAHALALQAdAdAAAoQAAApgdAeQgLALgNAHQgVALgaAAQgZAAgVgMQgMgGgLgLQgegeAAgpQAAgoAegdQALgLAMgHIAACvAAvhXIAACw");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AguBYIAAivQAVgMAZABQAaAAAVALIAACwQgVALgagBQgZAAgVgLg");

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAuhXQAOAHALALQAdAdgBAoQABApgdAeQgLALgOAGgAhFBHQgegeABgpQgBgoAegdQALgLAMgHIAACvQgMgHgLgKg");

	this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-11,-11,22,22);


(lib.PowerArrow = function() {
	this.initialize();

	// Layer 1
	this.powerBar = new lib.PowerBar();
	this.powerBar.setTransform(10.2,0.3,1,1,90);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(102,255,0,0.4)").s().p("ACoCJIpMAAIAAkRIJMAAIAAiaID9EiIj9EjgAk+AzIHjAAIAAhfInjAAg");
	this.shape.setTransform(42.2,0);

	this.addChild(this.shape,this.powerBar);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,-29.2,84.3,58.4);


(lib.LevelSelection = function() {
	this.initialize();

	// Layer 1

	// Layer 1
	this.playButton = new lib.PlayButton();
	this.playButton.setTransform(241.6,286.3,1,1,0,0,0,0,1.1);

	this.text = new cjs.Text("Ball Game", "39px 'Andola'");
	this.text.lineHeight = 47;
	this.text.setTransform(137.6,70.1);

	this.desc = new cjs.Text("Beat MJ's high score! \nMake 10 baskets in 30 seconds.\nHold mouse to shoot.", "19px 'Andola'");
	this.desc.lineHeight = 35;
	this.desc.setTransform(100, 140);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AewOuIAAFcMggBAAAQh3AIiWgCQhBgBjJgHQjDgHh6ADIjxAEQh1ACh2AAIoxAAIAAnKQgMikAEj6QAIkUAAiJIAA0NILMAAQCmgMEQAIQFVAJBcgCQAZAAA0ACQCZgCEzgGQEPgDC+AIQAZAAAxgCICWAAQCFgDDDABQBtABDZABIHbAAIAAUMQAKE+ABCXQACECgNDTg");
	this.shape.setTransform(237.7,194.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,1,1).p("AezhPIhnCfMg6aAAAIhkie");
	this.shape_1.setTransform(237.7,331.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AlRAAIgBAAIKlAAIh1AAg");
	this.shape_2.setTransform(74.5,323.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AwCADQhAAAjKgFMAoZAAAIAAABMggBAAAQhfAEh0AAIg7AAg");
	this.shape_3.setTransform(305.2,323.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#B1A793").s().p("A9OBQIhjieIIxAAQB1AAB1gBIIuAAQDJAHBBAAQCWACB3gIMAgBAAAIAAgBIADAAIhnCfg");
	this.shape_4.setTransform(237.7,331.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EEDEC2").s().p("ApoUMQjDgHh6ADIjxAEIscAAIAAnIQgMikAEj6QAIkUAAiJIAA0NILMAAQCmgMEQAIQFVAJBcgCIBNACIHMgIQEPgDC+AIQAZAAAxgCICWAAQCFgDDDABIFGACIHbAAIAAUMQAKE+ABCXQACECgNDTIAAFag");
	this.shape_5.setTransform(237.7,194.1);

	this.shape_6 = new cjs.Bitmap("./res/dome.jpg");

	this.addChild(this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape,this.text,this.desc,this.playButton);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,480,360);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;