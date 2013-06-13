/**
*	Vec2.js
*	@author Logan Wilkerson
*	@written 6/6/2013
*	@modified 6//7/2013
*/
var BrushMan = BrushMan || {};
(function(){
	/*
	*	Vec2
	*	Simple d2 vector functions
	*/
	var Vec2 = {}
	
	
	/*
	*	v
	*	Creates a vector from x and y components
	*	Because Vec2 just expects an array, or any
	*	object with numerical indexing any suitable
	*	object will be usable in Vec2. You do not need
	*	to use this function.
	*
	*	@param {Number} x component
	*	@param {Number} y component
	*	@returns {Array} the vector
	*/
	Vec2.v = function(x, y){
		return [x, y]
	}
	
	/*
	*	add
	*	adds two vectors together
	*/
	Vec2.add = function(v1, v2){
		return [
			v1[0] + v2[0],
			v1[1] + v2[1]
		];
	}
	
	/*
	*	subtract
	*	subtracts one vector from another
	*/
	Vec2.subtract = function(v1, v2){
		return [
			v1[0] - v2[0],
			v1[1] - v2[1]
		];
	}
	
	/*
	*	scale
	*	returns a new vector of v*c
	*/
	Vec2.scale = function(v, c){
		return [
			v[0] * c,
			v[1] * c
		]
	}
	
	/*
	*	length
	*	gets euclidean length of a vector
	*/
	Vec2.length = function(v){
		return Math.sqrt((v[0] * v[0]) + (v[1] * v[1]));
	}
	
	/*
	*	normalize
	*	Returns a normalized vector in the same direction
	*	as v
	*/
	Vec2.normalize = function(v){
		var len = 1.0 / Vec2.length(v);
		return Vec2.scale(v, len);
	}
	
	/*
	*	perp
	*	Returns a vector of the same length but perpendicular
	*	to v
	*/
	Vec2.perp = function(v){
		return [
			-v[1],
			v[0]
		]
	}
	
	/*
	*	dot
	*	Returns the dot product of two vectors.
	*/
	Vec2.dot = function(v1, v2){
		return (v1[0] * v2[0]) + (v1[1] * v2[1]);
	}
	
	BrushMan.Vec2 = Vec2;
}())