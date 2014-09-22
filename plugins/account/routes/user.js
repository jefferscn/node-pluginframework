/**
 * New node file
 */
var queryString = require('querystring');
var underscore = require('underscore');
var url = require('url');
exports.redirectIndex=function(req,res){
	res.redirect('/site/index');
};
exports.showLoginForm=function(req,res){
	var params ={};
	params.url=req.query.url;
	params.target = req.query.target;
	if(req.session.logininfo && req.session.logininfo.user){
		//已经登录过
		var redirecturl = '/site/index';
		if(req.query.url && ((req.query.url.indexOf("/site") == 0) ||(req.query.url.indexOf("http") == 0))){
			//redirecturl = queryString.escape(req.query.url);
			//var urlObj = url.parse(redirecturl);
			redirecturl = req.query.url;
			//res.render('account.redirect',{url:urlObj.pathname + urlObj.search?queryString.escape(urlObj.search):''});
		}
		res.render('account.redirect',{url:redirecturl});
		return;
	}
	if(req.query.user){
		var user = req.query.user;
		var pwd = req.query.password;
		req.app.dbSchema.models.User.all({where:{code:user,password:pwd}},function(err,items){
			if(items.length==0){
				params.errMsg = "用户不存在或者密码错误！";
				res.render('account.loginform',params);
				return;
			}
			req.session.logininfo={
				user:items[0]
			};
			var redirecturl = '/site/index';
			if(req.query.url && ((req.query.url.indexOf("/site")==0) ||(req.query.url.indexOf("http") == 0))){
				redirecturl = req.query.url;
//				redirecturl = queryString.escape(req.query.url);
				//var urlObj = url.parse(redirecturl);
				//res.render('account.redirect',{url:urlObj.pathname + urlObj.search?queryString.escape(urlObj.search):''});
			}
			res.render('account.redirect',{url:redirecturl});
			return;
		});
	}else{
		res.render('account.loginform',params);
	}
};

exports.logout = function(req,res){
	delete req.session.logininfo;
	res.redirect('/site/index');
};

exports.logininfo = function(req,res){
	if(req.session.logininfo){
		res.render('account.logininfo',{username:req.session.logininfo.user.name});
		return;
	}
	res.end();
};

exports.usermanager = function(req,res){
	var func = req.query.func;
	var app = req.app;
	var widget = req.app.findWidget('usermanager');
	if(!widget){
		return;
	}
	var params = {nav:[]};
	underscore.each(widget.layout.funcs,function(item){
		params.nav.push(item.nav);
		if(item.nav===func){
			params.content = item.content;
		}
	});
	
	params.activeNav=func || 'user_baseinfo_nav';
	
	params.content = params.content || "pagenotexist";
	
	res.render('account.usermanager',params);
};

exports.baseinfo =function(req,res){
	res.render('account.user_baseinfo',{user:req.session.logininfo.user});
};

exports.baseinfo_nav =function(req,res){
	res.render('account.user_baseinfo_nav');
};

exports.loginout = function(req,res){
	res.render('account.loginout',{logined:req.session.logininfo!=null});
};

exports.auth=function(req,res){
	var user = req.body.user;
	var pwd = req.body.password;
	req.app.dbSchema.models.User.all({code:user,password:pwd},function(err,items){
		if(items.length==0){
			var params = {};
			param.url=req.query.url;
			param.errMsg = "用户不存在或者密码错误！";
			res.redirect('/site/loginpage');
			return;
		}
		req.session.logininfo={
			user:items[0]
		};
		res.redirect(queryString.unescape(req.body.redirecturl));
	});
};