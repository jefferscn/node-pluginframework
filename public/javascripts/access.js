showWaitingMask=function(domId){
	
};
hideWaitingMask=function(domId){
	
};

function QueryStringToJSON(queryString) {    
    var pairs = queryString.split('&');
    var result = {};
    _.each(pairs,function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });
//    pairs.forEach(function(pair) {
//        pair = pair.split('=');
//        result[pair[0]] = decodeURIComponent(pair[1] || '');
//    });

    return JSON.parse(JSON.stringify(result));
}

if (typeof String.prototype.startsWith != 'function') {
	  // see below for better implementation!
	  String.prototype.startsWith = function (str){
	    return this.indexOf(str) == 0;
	  };
	};

submitForm=function(widget,formId,target,param){
	var params=$("#" + formId).serialize();
	params = params.replace(/\+/g,'%20');
	if(param)
		params+='&' + param;
	renderWidget(target,widget,params);
};

destroyWidgetDom=function(domId){
	var funName= 'func_' +domId;
	try{
		eval(funName)();
	}catch(a){
		
	}
};

renderWidget=function(domId,widget,params,target){
	if(!widget)
		return ;
	showWaitingMask(domId);
	var param = {target:target || domId};
	var url = '/widget/' + widget;
	if(location.search){
		var locParams = QueryStringToJSON(location.search.slice(1));
		param = $.extend(param,locParams);
	}
	if(params){
		var parParams = QueryStringToJSON(params);
		param = $.extend(param,parParams);
	}
//	if(location.search){
//		url+=location.search;
//		if(params){
//			url += '&';
//			url+=params;
//		}
//	}else{
//		if(params){
//			url+= '?';
//			url+=params;
//		}
//	}
//	if(params)
//		param = $.extend(param,params);
	$.ajax({
		url:url,
		method:'get',
		data:param
	}).done(function(html){
		html = $.trim(html);
		if(!html.startsWith('<')){
			eval(html);
		}else{
			destroyWidgetDom(domId);
			var dom = $('#' + domId);
			if(dom.length==0){
				window.location='/site/index';
			}else{
				$('#' + domId).empty();
				$('#' + domId).append(html);
			}
		}
	}).always(function(){
		hideWaitingMask(domId);
	});
};
