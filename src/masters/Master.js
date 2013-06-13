var BrushMan = BrushMan || {};
(function(){
	function Master(stage, controllerState, gameState){
		if(stage && controllerState && gameState)
			this.init(stage, controllerState, gameState);
	}
	
	var p = Master.prototype;
	
	p.stage = null;
	p.controllerState = null;
	p.gameState = null;	
	p.stageManager = null;
	p.gameObjectHolder = null;
	
	p.init = function(stage, controllerState, gameState){
		this.stage = stage;
		this.controllerState = controllerState;
		this.gameState = gameState;
	}
	
	p.tick = function(){
		var onStage = this.stageManager.onStage();
		for (i in onStage){
			onStage[i].tick();
		}
	}
	
	p.requestMove = function(dx, dy, gameObject){
		gameObject.move(dx, dy);
	}	
	BrushMan.Master = Master;
}());