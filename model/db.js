/**
 * New node file
 */
var Schema = require('jugglingdb').Schema;
//var schema = new Schema('mongodb', {
	//url: 'mongodb://jefers.xicp.net/myapp',
    //w: 1,
    //j: 1
//});
var schema = new Schema('mysql',{
	host:'1.1.2.191',
    	port:3306,
	username:'mysql',
    password:'mysql',
    database:'yigoprojects'
});

module.exports = exports=schema;
