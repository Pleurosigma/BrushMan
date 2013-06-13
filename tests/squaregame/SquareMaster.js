var BrushMan = BrushMan|| {};
(function(){
	function SquareMaster(stage, controllerState, gameState){
		if(stage && controllerState && gameState)
			this.init(stage, controllerState, gameState);
	}
	
	var p = SquareMaster.prototype = new BrushMan.Master();
	
	p.Master_init = p.init;
	p.init = function(stage, controllerState, gameState){
		this.Master_init(stage, controllerState, gameState);
		this.stageManager = new BrushMan.SquareStageManager(this)
	}
	
	BrushMan.SquareMaster = SquareMaster;
}());