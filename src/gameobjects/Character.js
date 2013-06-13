var BrushMan = BrushMan || {};
(function(){
	function Character(controllerState, gameState, master){
		controllerState = typeof controllerState != 'undefined' ? controllerState : null;
	}
	
	var p = Character.prototype = new BrushMan.GameObject();
	
	p.GameObject_init = p.init;
	p.init = function(controllerState, gameState, master){
		this.GameObject_init(controllerState, gameState, master);
	}
	
	BrushMan.Character = Character;
}());