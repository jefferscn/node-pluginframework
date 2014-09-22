/**
 * New node file
 */
var underscore = require('underscore');
exports.listPlugin = function(req,res){
	var plugins=req.app.plugins;
	res.render('pluginMgr.pluginList',{plugins:plugins});
};

exports.pagenotexist = function(req,res){
	res.render('pluginMgr.pagenotexist');
};

exports.pluginDetail = function(req,res){
	var plugins=req.app.plugins;
	var plugin = underscore.find(plugins,function(item){
		return item.name==req.query.plugin;
	});
	var widgets = underscore.filter(req.app.widgets,function(item){
		return item.plugin==req.query.plugin;
	});
	
	var pages = underscore.filter(req.app.pages,function(item){
		return item.plugin==req.query.plugin;
	});
	res.render('pluginMgr.pluginDetail',{plugin:plugin,widgets:widgets,pages:pages});
};