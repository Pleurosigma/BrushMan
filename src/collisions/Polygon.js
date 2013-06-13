/**
*	Polygon.js
*	@author Logan Wilkerson
*	@written 6/2013
*	@modified 6/12/2013
*/
var BrushMan = BrushMan || {};
(function(){
	/*
	*	Polygon
	*	A polygon represented by its vertices. Each vertex should be
	*	an Array with vertex[0] being the x component and vertex[1]
	*	being the y component of the vertex. So for example a unit
	*	square around the origin point would be represented by
	*	
	*	var unitSquare = new BrushMan.Polygon([-.5, .5], [.5, .5], [.5, -.5], [-.5, -.5]);
	*
	*	Vertices should be in clockwise order, and the object assumes that between
	*	each vertex i of n vertices there is an edge between i and i+1 with vertex n 
	*	connecting back to vertex 0.
	*/
	function Polygon(){
		this.init(arguments);
	}
	
	var p = Polygon.prototype;
	
	p.vertices = null;
	
	/*
	*	init
	*	Initilizes the Polygon. Should only be called by constructor 
	*	or children
	*
	*	@param {Array} Array of verticies
	*/
	p.init = function(vertices){
		this.vertices = new Array();
		for( var i in vertices){
			this.vertices.push(vertices[i]);
		}
	}
	
	/*
	*	addVertex
	*	Adds a vertex to the polygon. This function accepts either
	*	an array with [0] = x and [1] = y OR two parameters x and y
	*
	*	@param {Array} The vertex
	*		OR
	*	@param {Number} x component of the vertex
	*	@param {Number} y component of the vertex
	*/
	p.addVertex = function(x, y){
		if (x instanceof Array){
			this.vertices.push(x);
		}
		else{
			this.vertices.push([x, y]);
		}
	}
	
	/*
	*	addVertices
	*
	*	Adds an array of verticies to the Polygon
	*	@param {Array} Array of vertices
	*/
	p.addVertices = function(arguments){
		for (var i in arguments){
			this.vertices.push(arguments[i]);
		}
	}
	
	/*
	*	removeVertex
	*	
	*	Removes a vertex based on the given index
	*	@param {Number} The index of the vertex to remove
	*/
	p.removeVertex = function(index){
		if (index in this.vertices)
			this.vertices.splice(index, 1);s
	}
	
	/*
	*	move
	*	Moves the polygon by shifting the x and y value of each vertex
	*	by dx and dy respectfully
	*
	*	@param {Number} dx
	*	@param {Number} dy
	*/
	p.move = function(dx, dy){
		for (var i in this.vertices){
			this.vertices[i][0] += dx;
			this.vertices[i][1] += dy;
		}
	}
	
	/*
	*	position
	*	Positions the polygon so that the [0] and [1] value of 
	*	this.vertices[0] is x and y respectfully
	*
	*	@param {Number} the x value
	*	@param {Number} the y value
	*/
	p.position = function(x, y){
		var dx = x - this.vertices[0][0];
		var dy = y - this.vertices[0][1];
		this.move(dx, dy);
	}
	
	/*
	*	clone
	*	Returns a deep clone of the polygon
	*
	*	@return {BrushMan.Polygon} The clone.
	*/
	p.clone = function(){
		var clone = new Polygon();
		for (var i in this.vertices){
			clone.addVertex(this.vertices[i][0], this.vertices[i][1]);
		}
		return clone;
	}
	
	BrushMan.Polygon = Polygon;
}());