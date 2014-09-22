/**
 * New node file
 */
var pluginMgr = require('./routes/pluginMgr');
exports.init=function(){
	
};

exports.dependencies=['account'];
exports.widgets=[{
	name:'pluginlist',
	route:pluginMgr.listPlugin
},{
	name:'plugindetail',
	route:pluginMgr.pluginDetail
},{
	name:'pagenotexist',
	route:pluginMgr.pagenotexist
}];
exports.pages=[{
	name:'pluginlistpage',
	layout:{
		content:'pluginlist'
	}
},{
	name:'plugindetailpage',
	layout:{
		content:'plugindetail'
	}
}];