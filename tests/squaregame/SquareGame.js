var BrushMan = BrushMan || {};
(function(){	
	function SquareGame(canvasID){
		if(canvasID)
			this.init(canvasID);
	}
	
	var p = SquareGame.prototype = new BrushMan.Game();
	
	p.Game_init = p.init;
	p.init = function(canvasID){
		console.log(this);
		this.Game_init(canvasID);
		this.gameState.currentMaster = new BrushMan.SquareMaster(this.stage, this.controllerState, this.gameState);
	}
	
	BrushMan.SquareGame = SquareGame;
}());