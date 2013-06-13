/**
*	GameObject.js
*	@author Logan Wilkerson	
*	@written 5/2013
*	@modifed 6/12/2013
*/
var BrushMan = BrushMan || {};
(function(){
	/*
	*	GameObject
	*	The GameObject is meant to represent any virtual object in the game world.
	*	Anything that the player character can interact with directly should be
	*	Considered a GameObject. By default GameObjects should be collidable.
	*
	*	@param {BrushMan.ControllerState} The ControllerState the GameObject is concerned with
	*	@param {BrushMan.GameState} The GameState the GameObject is concerned with
	*	@param {BrushMan.Master} This GameObject's Master
	*	@param {createjs.DisplayObject} This GameObject's displayObject
	*	@param {BrushMan.Polygon} This GameObjects bounding polygon. It must be a convex polygon.
	*/
	function GameObject(master, controllerState, gameState, displayObject, boundingPolygon){
		this.init(master, controllerState, gameState, displayObject, boundingPolygon);
	}
	
	var p = GameObject.prototype = new BrushMan.Element();
	
	/*
	*	init
	*	Initializes the GameObject. Should only be called by constructor or child classes.
	*
	*	@param {BrushMan.ControllerState} The ControllerState the GameObject is concerned with
	*	@param {BrushMan.GameState} The GameState the GameObject is concerned with
	*	@param {BrushMan.Master} This GameObject's Master
	*	@param {createjs.DisplayObject} This GameObject's displayObject
	*	@param {BrushMan.Polygon} This GameObjects bounding polygon.
	*/
	p.Element_init = p.init;	//Overriding init from parent
	p.init = function(master, controllerState, gameState, displayObject, boundingPolygon){
		this.Element_init(master, controllerState, gameState, displayObject, boundingPolygon);
	}
	
	/*
	*	collidesWith
	*	Determines if gameObject collides with this one using an SAT test
	*
	*	@param {BrushMan.GameObject} The gameObject to test against.
	*/
	p.collidesWith = function(gameObject){
		return BrushMan.Smash2d.SAT_Collision(
			this.boundingPolygon.vertices,
			gameObject.boundingPolygone.vertices
		);
	}
	
	
	BrushMan.GameObject = GameObject;
}());