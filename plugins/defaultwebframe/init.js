/**
 * New node file
 */
exports.init=function(app){
	app.defaultLayout={
			view:'defaultwebframe.portal',
			params:{navleft:[],navright:[],content:''}
		};
};

exports.dependencies=[];