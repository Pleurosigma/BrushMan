var BrushMan = BrushMan || {};
(function(){
	function SquareStageManager(master){
		if(master)
			this.init(master);
	}
	
	var p = SquareStageManager.prototype = new BrushMan.StageManager();
	
	p.circle = null;
	
	p.StageManager_init = p.init;
	p.init = function(master){
		this.StageManager_init(master);
		this.circle = new BrushMan.Square(this.master.controllerState, this.master.gameState, this.master);
		this.master.stage.addChild(this.circle.displayObject);
	}
	
	p.onStage = function(){
		return new Array(this.circle);
	}
	BrushMan.SquareStageManager = SquareStageManager;
}());