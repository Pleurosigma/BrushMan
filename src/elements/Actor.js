var BrushMan = BrushMan || {};
(function(){
	function Actor(master, controllerState, gameState, displayObject, boundingPolygon){
		this.init(master, controllerState, gameState, displayObject, boundingPolygon);
	}
	
	var p = Actor.prototype = new BrushMan.GameObject();
	
	p.GameObject_init = p.init;
	p.init = function(master, controllerState, gameState, displayObject, boundingPolygon){
		this.GameObject_init(master, controllerState, gameState, displayObject, boundingPolygon);
	}
	
	BrushMan.Actor = Actor;
}());