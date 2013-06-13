/**
*	ControllerState.js
*	@author Logan Wilkerson
*	@created 5/31/2013
*	@modified 6/1/2013
*/

var BrushMan = BrushMan || {};
(function(){
	/*
	*	ControllerState
	*	This class monitors and updates the controller state.
	*	@class ControllerState
	*	@param {String} The id of the game canvas
	*/
	function ControllerState(canvasID){
		if(canvasID)
			this.init(canvasID);
	}
	
	var p = ControllerState.prototype;
	
	// Alias for the lazy
	var CS = ControllerState
	
	//Event type strings.
	CS.mouseMove = 'mousemove';
	CS.click = 'click';
	CS.keyUp = 'keyup';
	CS.keyDown = 'keydown';
	
	//Javascript event keycodes
	CS.keyCodes = {
		'backspace' : 8,
		'tab' : 9,
		'enter' : 13,
		'shift' : 16,
		'ctrl' : 17,
		'alt' : 18,
		'left' : 37,
		'up' : 38,
		'right' : 39,
		'down' : 40,
	}
	
	/**
	*	Queue to hold the events
	*	@property eventQueue
	*	@type Array
	**/
	p.eventQueue = []; 
	
	/**
	*	At beginning of tick is up pressed
	*	@property upPressed
	*	@type {Boolean}
	**/
	p.upDown = false;
	
	/**
	*	At beginning of tick is down pressed
	*	@property downPressed
	*	@type {Boolean}
	**/
	p.downDown = false;
	
	/**
	*	At beginning of tick is left pressed
	*	@property leftPressed
	*	@type {Boolean}
	**/
	p.leftDown = false;
	
	/**
	*	At beginning of tick is right pressed
	*	@property rightPressed
	*	@type {Boolean}
	**/
	p.rightDown = false;
	
	/**
	*	Was there a mouse over event in the last
	*	tick
	*	@property wasMouseOver
	*	@type {Boolean}
	**/
	p.wasMouseOver
	
	/**
	*	At beginning of tick what is mouse over
	*	x position
	*	@property mouseOverX
	*	@type {Number}
	**/
	p.mouseOverX
	
	/**
	*	At beginning of tick what is mouse over
	*	y position
	*	@property mouseOverY
	*	@type {Number}
	**/
	p.mouseOverY
	
	/**
	*	Was there a mouse click event in the last
	*	tick
	*	@property wasMouseClick
	*	@type {Boolean}
	**/
	p.wasMouseClick
	
	/**
	*	At beginning of tick what is mouse click
	*	x position
	*	@property mouseClickX
	*	@type {Number}
	**/
	p.mouseClickX
	
	/**
	*	At beginning of tick what is mouse Click
	*	y position
	*	@property mouseClickY
	*	@type {Number}
	**/
	p.mouseClickY
	
	p.init = function(canvasID){
		$(document.body).on(CS.keyDown, this.queueEvent(this));
		$(document.body).on(CS.keyUp, this.queueEvent(this));
		$('#'+canvasID).on(CS.click, this.queueEvent(this));
		$('#'+canvasID).on(CS.mouseMove, this.queueEvent(this));
	}
	
	/*
	*	queueEvent
	*	Returns the function to be attached to any html elements
	*	that you want to listen for controller events.
	*	@param {ControllerState} the main controller state object
	*	@returns {function} the function to attach to html
	*/
	p.queueEvent = function(controllerState, canvasID){
		return function(event){
			if (CS.isMouseEvent(event)){
				event.preventDefault();
				event.stopPropagation();
			}
			controllerState.eventQueue.push(event);			
		};
	}
	
	/*
	*	tick
	*	Empty the event queue and update the controller state
	*/
	p.tick = function(){
		this.wasMouseMove = false;
		this.wasMouseClick = false;
		while(event = this.eventQueue.shift()){
			this.update(event);
		}
	}
	
	/*
	*	update
	*	Preform an update using a single event
	*	@param {Event} The event to update with
	*/
	p.update = function(event){
		if (CS.isMouseEvent(event)){
			this.updateMouseEvent(event);
		}
		else{
			this.updateKeyEvent(event);
		}
	}
	
	/*
	*	updateMouseEvent
	*	Preform an updated using a single mouse event
	*	@param {Event} The mouse event to update with
	*/
	p.updateMouseEvent = function(event){
		var x = event.pageX;
		var y = event.pageY;
		if(event.type == CS.mouseMove){
			this.wasMouseMove = true;
			this.mouseMoveX = x;
			this.mouseMoveY = y;
		}
		else{
			this.wasMouseClick = true;
			this.mouseClickX = x;
			this.mouseClickY = y;
		}
	}
	
	/*
	*	updateKeyEvent
	*	Preform an update using a single key event
	*	@param {Event} The key event to update with
	*/
	p.updateKeyEvent = function(event){
		var down = event.type == CS.keyDown;
		switch(event.keyCode){
			case CS.keyCodes.up:
				this.upDown = down;
				break;
			case CS.keyCodes.down:
				this.downDown = down;
				break;
			case CS.keyCodes.left:
				this.leftDown = down;
				break;
			case CS.keyCodes.right:
				this.rightDown = down;
				break;
		}
		
	}
	
	//Statis Methods
	
	/*
	*	isMouseEvent
	*	Determines if the event is a mouse event
	*	@param {Event} The event to test
	*	@return {Boolean} True if the event is a mouse event, false otherwise
	*/
	ControllerState.isMouseEvent = function(event){
		return event.type == CS.mouseMove || event.type == CS.click;
	}
	
	BrushMan.ControllerState = ControllerState
}());