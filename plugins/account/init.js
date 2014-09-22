/**
 * New node file
 */
var user = require('./routes/user');
var underscore =require('underscore');
var queryString = require('querystring');
exports.init=function(app){
	//user表增加admin帐号
	if(app.dbSchema){
		app.dbSchema.models.User.count({code:'admin'},function(err,count){
			if(count===0){
				var admin = new app.dbSchema.models.User();
				admin.code="admin";
				admin.password="111";
				admin.name="admin";
				admin.save();
			}
		});
	}
	app.needAuth=function(path){
		if(this.publicPath && underscore.some(this.publicPath,function(item){
			if(typeof item=="string"){
				return path.indexOf(item) == 0;
			}
			if(typeof item=="object"){
				return item.test(path);
			}
			return false;
		})){
			return false;
		}
		return true;
	};
	//增加session检查
	app.use(function(req,res,next){
		if(!req.app.needAuth(req._parsedUrl.pathname)){
			next();
			return;
		}
		if(!req.session.logininfo){
			res.render('account.redirect',{url:'/site/loginpage?url=' + queryString.escape(req.url)});
			//res.redirect('/site/loginpage?url=' +queryString.escape(req.url));
			return;
		}
		next();
	});
	
	app.get('/',user.redirectIndex);

	app.publicPath  = [];
	app.publicPath.push('/site/loginpage');
	app.publicPath.push('/widget/loginform');
	app.publicPath.push('/site/index');
	app.publicPath.push('/widget/index');
	app.publicPath.push('/widget/logininfo');
	app.publicPath.push('/widget/loginout');
	app.publicPath.push('/widget/pagenotexist');
	app.publicPath.push('/action/auth');
	
//	if(app.defaultLayout && app.defaultLayout.params && app.defaultLayout.params.navright){
//		app.defaultLayout.params.navright.push('logininfo');
//		app.defaultLayout.params.navright.push('loginout');
//	};	
};

exports.dependencies=[];
exports.actions=[{
	name:'auth',
	route:user.auth,
	privacy:false
}];
exports.widgets=[{
	name:'logout',
	route:user.logout
},{
	name:'loginform',
	route:user.showLoginForm,
	privacy:false,
	params:{
		url:{
			desc:"redirect url after logined",
		},
		target:{
			desc:'frontend html node id'
		}
	}
},{
	name:'logininfo',
	route:user.logininfo,
	privacy:false,
	params:{
		target:{
			desc:'frontend html node id'
		}
	}
},{
	name:'loginout',
	route:user.loginout,
	privacy:false
},{
	name:'user_baseinfo_nav',
	route:user.baseinfo_nav,
	privacy:false
},{
	name:'user_baseinfo',
	route:user.baseinfo,
	privacy:false
},{
	name:'usermanager',
	route:user.usermanager,
	complex:true,
	layout:{funcs:[{
		nav:'user_baseinfo_nav',
		content:'user_baseinfo'
	}]},
	privacy:false,
	params:{
		func:{
			desc:'sub page of usermanager widget'
		}
	}
}];
exports.pages=[{
	name:'loginpage',
	privacy:false,
	layout:{
		content:'loginform'
	}
},{
	name:'usermanager',
	privacy:false,
	layout:{
		content:'usermanager'
	}
},{
	name:'index',
	privacy:false,
	layout:{
		content:'index'
	}
}];
exports.dbModel={
		User:{
			code:String,
			name:String,
			password:String
		}
};