var BrushMan = BrushMan || {};
(function(){
	function GameObject(master, controllerState, gameState, displayObject, boundingPolygon){
		this.init(master, controllerState, gameState, displayObject, boundingPolygon);
	}
	
	var p = GameObject.prototype = new BrushMan.Element();
	
	p.Element_init = p.init;
	p.init = function(master, controllerState, gameState, displayObject, boundingPolygon){
		this.Element_init(master, controllerState, gameState, displayObject, boundingPolygon);
	}
	
	p.collidesWith = function(gameObject){
		return BrushMan.Smash2d.SAT_Collision(
			this.boundingPolygon.vertices,
			gameObject.boundingPolygone.vertices
		);
	}
	
	
	BrushMan.GameObject = GameObject;
}());