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
	
	p.init = function(vertices){
		this.vertices = new Array();
		for( var i in vertices){
			this.vertices.push(vertices[i]);
		}
	}
	
	/**
	*	addVertex(Array)
	*	addVertex(x, y)
	*/
	p.addVertex = function(x, y){
		if (x instanceof Array){
			this.vertices.push(x);
		}
		else{
			this.vertices.push([x, y]);
		}
	}
	
	p.addVertices = function(arguments){
		for (var i in arguments){
			this.vertices.push(arguments[i]);
		}
	}
	
	p.removeVertex = function(index){
		if (index in this.vertices)
			this.vertices.splice(index, 1);
	}
	
	p.move = function(dx, dy){
		for (var i in this.vertices){
			this.vertices[i][0] += dx;
			this.vertices[i][1] += dy;
		}
	}
	
	p.position = function(x, y){
		for (var i in this.vertices){
			this.vertices[i][0] += x;
			this.vertices[i][1] += y;
		}
	}
	
	p.clone = function(){
		var clone = new Polygon();
		for (var i in this.vertices){
			clone.addVertex(this.vertices[i][0], this.vertices[i][1]);
		}
		return clone;
	}
	
	BrushMan.Polygon = Polygon;
}());