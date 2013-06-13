var BrushMan = BrushMan || {};
(function(){
	/*
	*	Element
	*	The Element is the core parent for all objects that are meant to appear on the screen.
	*
	*	@param {BrushMan.ControllerState} The ControllerState the Element is concerned with
	*	@param {BrushMan.GameState} The GameState the Element is concerned with
	*	@param {BrushMan.Master} This Element's Master
	*	@param {createjs.DisplayObject} This Element's displayObject
	*	@param {BrushMan.Polygon} This elements bounding polygon.
	*/
	function Element(master, controllerState, gameState, displayObject, boundingPolygon){	
		this.init(controllerState, gameState, master, displayObject, boundingPolygon);
	}
	
	var p = Element.prototype;
	
	// Attributes
	
	/**
	*	The ControllerState the Element is concerned with
	*	@property controllerState
	*	@type {BrushMan.ControllerState}
	*/
	p.controllerState = null;
	
	/**
	*	The GameState the Element is concerned with
	*	@property gameState
	*	@type {BrushMan.GameState}
	*/
	p.gameState = null;
	
	/**
	*	The Master the Element is concerned with
	*	@property master
	*	@type {BrushMan.Master}
	*/
	p.master = null;
	
	/**
	*	The DisplayObject the Element is concerned with
	*	@property displayObject
	*	@type {createjs.DisplayObject}
	*/
	p.displayObject = null;
	
	/**
	*	The Polygon that bounds this element
	*	@property boundingPolygon
	*	@type {BrushMan.Polygon}
	*/
	p.boundingPolygon = null;
	
	/**
	*	The x position of the Element.
	*	I recommend that this x be the same as the displayObject
	*	and/or the boundingPolygon
	*	@property x
	*	@type {Number}
	*/
	p.x = 0;
	
	/**
	*	The y position of the Element.
	*	I recommend that this y be the same as the displayObject
	*	and/or the boundingPolygon
	*/
	p.y = 0;
	
	/**
	*	The x offset between the Element's x and what the
	*	displayObject's x should be. Whenever the Element
	*	is positioned this offset will be used.
	*	@property displayObject_xOffset
	*	@type {Number}
	*/
	p.displayObject_xOffset = 0;
	
	/**
	*	The y offset between the Element's y and what the
	*	displayObject's y should be. Whenever the Element
	*	is positioned this offset will be used.
	*	@property displayObject_yOffset
	*	@type {Number}
	*/
	p.displayObject_yOffset = 0;
	
	/**
	*	The x offset between the Element's x and what the
	*	boundingPolygon's x should be. Whenever the Element
	*	is positioned this offset will be used.
	*	@property boundingPolygon_xOffset
	*	@type {Number}
	*/
	p.boundingPolygon_xOffset = 0;
	
	/**
	*	The y offset between the Element's y and what the
	*	boundingPolygon's y should be. Whenever the Element
	*	is positioned this offset will be used.
	*	@property boundingPolygon_yOffset
	*	@type {Number}
	*/
	p.boundingPolygon_yOffset = 0;
	
	/*
	*	Initializes the Element. Should only be called by the constructor or 
	*	child classes.
	*	@param {BrushMan.ControllerState} The ControllerState the Element is concerned with
	*	@param {BrushMan.GameState} The GameState the Element is concerned with
	*	@param {BrushMan.Master} This Element's Master
	*	@param {createjs.DisplayObject} This Element's displayObject
	*	@param {BrushMan.Polygon} This elements bounding polygon.
	*/
	p.init = function(controllerState, gameState, master, displayObject, boundingPolygon){	
		//Check for Undefined values, set them to null;
		master = typeof master != 'undefined' ? master : null;
		controllerState = typeof controllerState != 'undefined' ? controllerState : null;
		gameState = typeof gameState != 'undefined' ? gameState : null;
		displayObject = typeof displayObject != 'undefined' ? displayObject : null;
		boundingPolygon = typeof boundingPolygon != 'undefined' ? boundingPolygon : null;
		
		this.controllerState = controllerState;
		this.gameState = gameState;
		this.master = master;
		this.displayObject = displayObject;
		this.boundingPolygon = boundingPolygon;
	}
	
	/*
	*	tick
	*	This method should be called once each game tick while the element
	*	is on the screen.
	*/
	p.tick = function(){}
	
	/*
	*	move
	*	Moves the element by dx and dy. The x and y values for the element,
	*	the displayObject and the boundingPolygon will be changed by
	*	dx and dy respectfully
	*
	*	This method should probably not be called by the Element itself.
	*	Instead an Element should use Master.requestMove(dx, dy, this),
	*	and the master will call the element.move with the correct dx, dy
	*	values.
	*
	*	This is especially important for the Player Character as their
	*	movement may everything else instead in order to keep the 
	*	Player Character centered.
	*/
	p.move = function(dx, dy){
		this.x += dx;
		this.y += dy;
		if(this.displayObject){
			this.displayObject.x += dx;
			this.displayObject.y += dy;
		}
		if(this.boundingPolygon){
			this.boundingPolygon.move(dx, dy);
		}
	}
	
	/*
	*	position
	*	Sets all the corresponding x and y values of the element to
	*	the given x and y plus any offsets
	*
	*	@param {Number} The x value to position the element too
	*	@param {Number} The y value to position the element too
	*/
	p.position = function(x, y){
		this.x = x;
		this.y = y;
		if(this.displayObject){
			this.displayObject.x = x + this.displayObject_xOffset;
			this.displayObject.y = y + this.displayObject_yOffset;
		}
		if(this.boundingPolygon){
			this.boundingPolygon.position(
				x + this.boundingPolygon.xOffset, 
				y + this.boundingPolygon.yOffset
			);
		}
	}
	
	/*
	*	clone
	*/
	p.clone = function(){
		return new Element(
			this.master,
			this.controllerState,
			this.gameState,
			this.displayObject.clone(),
			this.polygon.clone()
		);
	}
	
	
	BrushMan.Element = Element;
}());