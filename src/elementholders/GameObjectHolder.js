var BrushMan = BrushMan || {};
(function(){
	function GameObjectHolder(){}
	
	var p = GameObjectHolder.prototype = new BrushMan.ElementHolder();
	
	p.ElementHolder_init = p.init;
	p.init = function(){}
	
	BrushMan.GameObjectHolder = GameObjectHolder;
}());