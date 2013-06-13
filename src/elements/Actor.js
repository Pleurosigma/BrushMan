/**
*	Actor.js
*	@author Logan Wilkerson
*	@written 6/2013
*	@modified 6/12/2013
*/
var BrushMan = BrushMan || {};
(function(){
	/*
	*	Actor
	*	The Actor object represents Characters in the game.
	*
	*	@param {BrushMan.ControllerState} The ControllerState the Actor is concerned with
	*	@param {BrushMan.GameState} The GameState the Actor is concerned with
	*	@param {BrushMan.Master} This Actor's Master
	*	@param {createjs.DisplayObject} This Actor's displayObject
	*	@param {BrushMan.Polygon} This Actors bounding polygon. It must be a convex polygon.
	*/
	function Actor(master, controllerState, gameState, displayObject, boundingPolygon){
		this.init(master, controllerState, gameState, displayObject, boundingPolygon);
	}
	
	var p = Actor.prototype = new BrushMan.GameObject();
	
	/*
	*	init
	*	Initializes the Actor. Should only be called by the constructor or children.
	*
	*	@param {BrushMan.ControllerState} The ControllerState the Actor is concerned with
	*	@param {BrushMan.GameState} The GameState the Actor is concerned with
	*	@param {BrushMan.Master} This Actor's Master
	*	@param {createjs.DisplayObject} This Actor's displayObject
	*	@param {BrushMan.Polygon} This Actors bounding polygon. It must be a convex polygon.
	*/
	p.GameObject_init = p.init;
	p.init = function(master, controllerState, gameState, displayObject, boundingPolygon){
		this.GameObject_init(master, controllerState, gameState, displayObject, boundingPolygon);
	}
	
	BrushMan.Actor = Actor;
}());