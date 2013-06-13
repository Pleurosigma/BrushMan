/**
*	Smash2d.js
*	@author Logan Wilkerson
*	@written 6/6/2013
*	@modifed 6/7/2013
*/
var BrushMan = BrushMan || {};
(function(){
	/*
	*	Smash2d
	*	Smash2d handles 2d collisions within the BrushMan
	*	library. Because sometimes things just have to
	*	smash together.
	*
	*	Smash2d expects points and vectors to be Array objects
	*
	*	As of right now Smash2d only handles SAT collisions
	*/
	var Smash2d = {}
	
	/*
	*	SAT_Collision
	*	Preforms an SAT collision test on the vertices
	*	of two convex polygons.
	*
	*	@param {Array} The vertices of the first polygon
	*	@param {Array} The vertices of the second polygon
	* 	@returns {false or object} If the polygons do not collide
	*	this function returns false. If they do collide it sents
	*	an object with min translational vector information. The object
	*	has the attributes mtvs1, mtvs2, scale1, and scale2. The mtvs refer
	*	to noramalize min translational vectors and the scale values
	*	are the scaling constant for those vectors to actually seperate
	*	the polygons. The number refers to which polygon the numbers
	*	need to be applied to.
	*/
	Smash2d.SAT_Collision = function(p1Vertices, p2Vertices){
		var smallest1 = new Array();
		var overlap1 = Infinity;
		var smallest2 = new Array();
		var overlap2 = Infinity;
		var axes1 = Smash2d.SAT_axes(p1Vertices);
		var axes2 = Smash2d.SAT_axes(p2Vertices);
		
		for (var i in axes1){
			var axis = axes1[i];
			
			var proj1 = Smash2d.SAT_proj(p1Vertices, axis);
			var proj2 = Smash2d.SAT_proj(p2Vertices, axis);
			if(!Smash2d.SAT_isProjOverlap(proj1, proj2)){
				return false;
			}
			else{
				var o = Smash2d.SAT_getProjOverlap(proj1, proj2);
				if(o[1] == 0){
					if(o[0] == overlap1){
						smallest1.push(axis);
					}
					if(o[0] < overlap1){
						overlap1 = o[0];
						smallest1 = new Array(axis);
					}
				}
				else{					
					if(o[0] == overlap2){
						smallest2.push(axis);
					}
					if(o[0] < overlap2){
						overlap2 = o[0];
						smallest2 = new Array(axis);
					}
				}
			}
		}
		
		for (var i in axes2){
			var axis = axes2[i];
			
			var proj1 = Smash2d.SAT_proj(p1Vertices, axis);
			var proj2 = Smash2d.SAT_proj(p2Vertices, axis);
			if(!Smash2d.SAT_isProjOverlap(proj1, proj2)){
				return false;
			}
			else{
				var o = Smash2d.SAT_getProjOverlap(proj1, proj2);
				if(o[1] == 0){
					if(o[0] == overlap1 && !axis in smallest1){
						smallest1.push(axis);
					}
					if(o < overlap1){
						overlap1 = o;
						smallest1 = new Array(axis);
					}
				}
				else{					
					if(o == overlap2){
						smallest2.push(axis);
					}
					if(o < overlap2 && !axis in smallest2){
						overlap2 = o;
						smallest2 = new Array(axis);
					}
				}
			}
		}
		
		return {
			'mtvs1' : smallest1, 'scale1' : overlap1,
			'mtvs2' : smallest2, 'scale2' : overlap2
			};
	}
	
	/*
	*	SAT_axes
	*	Computes an Array of test axes for a polygon to
	*	preform an SAT collision test.
	*
	*	@param {Array} Array containing the polygon's vertices
	*	@return {Array} Array containing the axis vectors
	*/
	Smash2d.SAT_axes = function(pVertices){
		var axes = new Array();
		var j = 0
		for (var i in pVertices){
			var v1 = [pVertices[i][0], pVertices[i][1]];
			j = (j + 1) % pVertices.length;
			var v2 = [pVertices[j][0], pVertices[j][1]];
			var edge = BrushMan.Vec2.subtract(v1, v2);
			var perp = BrushMan.Vec2.perp(edge);
			var normal = BrushMan.Vec2.normalize(perp);
			axes.push(normal);
		}
		return axes;
	}
	
	/*
	*	SAT_proj
	*	Computes the projection of a shape on a given axes
	*/
	Smash2d.SAT_proj = function(pVertices, v1){
		var min = Infinity;
		var max = -Infinity;
		for (var i in pVertices){
			var v2 = [pVertices[i][0], pVertices[i][1]];
			var dot = BrushMan.Vec2.dot(v1, v2);
			if(dot < min)
				min = dot;
			else if(dot > max)
				max = dot;
		}
		return {'min' : min, 'max' : max};
	}
	
	/*
	*	SAT_isProjOverlap
	*	Determines if two SAT projs overlap
	*/
	Smash2d.SAT_isProjOverlap = function(proj1, proj2){
		return (proj2.max > proj1.min && proj2.max < proj1.max)
			|| (proj2.min > proj1.min && proj2.min < proj1.max);
	}
	
	/*
	*	SAT_getProjOverlap
	*	Computes the projection overlap and returns that
	*	and a projection index
	*/
	Smash2d.SAT_getProjOverlap = function(proj1, proj2){
		if(proj1.max > proj2.max){
			return [proj2.max - proj1.min, 0]
		}
		else
			return [proj1.max - proj2.min, 1]
	}
	
	//point in polygon test
	/*
	*	pip
	*	Preforms a point in polygon test to determine
	*	if point is inside the polygon defined by
	*	vertices. This test only works with CONVEX 
	*	polygons.
	*
	*	@param {Array} Array representing a point
	*	@param {Array} Array containing the polygon vertex points.
	*	@return {boolean} true if point is in the polygon
	*/
	Smash2d.pip = function(point, vertices){
		var isLeft = Smash2d.isLeft(vertices[0], vertices[1], point);
		for(var i = 1; i < vertices.length; i++){
			var j = (i + 1) % vertices.length;
			if(isLeft != Smash2d.isLeft(vertices[i], vertices[j], point))
				return false;
		}
		return true;
	}
	
	/*
	*	isLeft
	*	Given three points a, b, c where a and b
	*	represent the end points of a vector traveling
	*	from a to b and where c represents a point
	*	determines if the point c is to the left of the
	*	vector a->b
	*
	*	This function is essentially doing a "2d Crossproduct"
	*	and determining if z component is positive.
	*
	*	@param {Array} Array representing a point
	*	@param {Array} Array representing a point
	*	@param {Array} Array representing a point
	*	@returns {boolean} true if c is to the left, false otherwise
	*/
	Smash2d.isLeft = function(a, b, c){
		return (b[0] - a[0]) * (c[1] - a[1]) -
			   (b[1] - a[1]) * (c[0] - a[0]) > 0;
	}
	
	
	BrushMan.Smash2d = Smash2d;
}());