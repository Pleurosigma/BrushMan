var BrushMan = BrushMan || {};
(function(){
	function GameObject(controllerState, gameState, master){
		if(controllerState && gameState && master)
			this.init(controllerState, gameState, master);
	}
	
	var p = GameObject.prototype;
	
	p.controllerState = null;
	p.gameState = null;
	p.master = null;
	p.displayObject = null;
	//p.isVisible = false;
	//p.isPhysical = false;
	p.x = 0;
	p.y = 0;
	p.dx = 0;
	p.dy = 0;
	
	p.init = function(controllerState, gameState, master){
		this.controllerState = controllerState;
		this.gameState = gameState;
		this.master = master;
	}
	
	p.tick = function(){}
	
	p.move = function(dx, dy){
		this.x += dx;
		this.y += dy;
		if(this.displayObject){
			this.displayObject.x += dx;
			this.displayObject.y += dy;
		}
	}
	
	
	BrushMan.GameObject = GameObject;
}());