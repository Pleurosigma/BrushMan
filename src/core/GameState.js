var BrushMan = BrushMan || {};
(function(){
	function GameState(){}
	
	var p = GameState.prototype;
	
	/**
	*	The game's current Master
	*	@property currentMaster
	*	@type {BrushMan.Master}
	*/
	p.currentMaster = null;
	
	BrushMan.GameState = GameState;
}());