var BrushMan = BrushMan || {};
(function(){
	function Square(controllerState, gameState, master){
		if(controllerState && gameState && master)
			this.init(controllerState, gameState, master);
	}
	console.log(BrushMan);
	var p = Square.prototype = new BrushMan.Actor();
	
	p.Agent_init = p.init;
	p.init = function(controllerState, gameState, master){
		this.Agent_init(controllerState, gameState, master);
		console.log(this);
		this.displayObject = new createjs.Shape();
		this.displayObject.graphics.beginFill('#00F').drawCircle(this.x, this.y, 10)
	}
	
	p.tick = function(){
		this.dx = 0;
		this.dy = 0;
		if(this.controllerState.upDown)
			this.dy = -10;
		if(this.controllerState.downDown)
			this.dy = 10;
		if(this.controllerState.leftDown)
			this.dx = -10;
		if(this.controllerState.rightDown)
			this.dx = 10;
		this.master.requestMove(this.dx, this.dy, this);
	}
	
	BrushMan.Square = Square;
}());