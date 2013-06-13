/**
*	Game.js
*	@author Logan Wilkerson
*	@created 5/31/2013
*	@modified 6/1/2013
*/

var BrushMan = BrushMan || {};
(function(){	
	/*
	*	Game
	*	The core game class. This should be the only class
	*	Subscribed to createjs.Ticker. All other classes
	*	should be updated through the game's tick method
	*	or their Master.
	*	@class Game
	*	@param {String} The id of the game canvas
	*/
	function Game(canvasID){
		if(canvasID)
			this.init(canvasID);
	}
	
	var p = Game.prototype;
	
	/**
	*	The game stage
	*	@property stage
	*	@type {createjs.Stage}
	*/
	p.stage = null;
	
	/**
	*	The game's controller state
	*	@property stage
	*	@type {BrushMan.ControllerState}
	*/
	p.controllerState = null;
	
	/**
	*	The game's game state
	*	@property controllerState
	*	@type {BrushMan.GameState}
	*/
	p.gameState = null;
	
	
	
	/*
	*	init
	*	Initializes the game class. Should only be called by
	*	the game constructor.
	*
	*	@param {String} The id of the game canvas
	*/
	p.init = function(canvasID){
		this.stage = new createjs.Stage(canvasID);
		createjs.Ticker.addEventListener('tick', this);
		this.controllerState = new BrushMan.ControllerState(canvasID);
		this.gameState = new BrushMan.GameState();
	}
	
	/*
	*	handleEvent
	*	Function to be called by createjs.Ticker
	*
	*	@param {Event} The tick event
	*/
	p.handleEvent = function(event){
		this.tick(event);
	}
	
	/*
	*	tick
	*	Actual tick event that is called each game tick
	*
	*	@param {Event} The Tick event.
	*/
	p.tick = function(event){
		//Have ControllerState empty event queue and update state
		this.controllerState.tick();
		if(this.gameState.currentMaster)
			this.gameState.currentMaster.tick();
		this.stage.update();
	}
	
	BrushMan.Game = Game;
}());