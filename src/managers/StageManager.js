var BrushMan = BrushMan || {};
(function(){
	function StageManager(master){
		if(master)
			this.init(master);
	}
	
	var p = StageManager.prototype;
	
	//attributes
	p.master = null;
	
	p.init = function(master){
		this.master = master;
	}
	//returns game objects on the current stage
	p.onStage = function(){}
	
	//orders the stage manager to update (should be done at end of loop)
	p.update = function(){}
	BrushMan.StageManager = StageManager
}());