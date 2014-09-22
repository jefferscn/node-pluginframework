node-pluginframework
====================
An extension project of nodejs express framework.

# Purpose
 
 In developing a web application,there will be a mass of views,routes.With default usage of Express,
 everything is mixed together.This is not conducive to reuse and  maintenance of code.
 This project will build a framework to build a Express with seperated modules(pluings).
 A module is made up with routes,views and an init.js file.
 
# Dependencies
 1. ServerSide
  * JugglingDB
  * Express
  * Underscore
 2. ClientSide
  * JQuery
  * Underscore
 
# Usage

 * Do everything Express need.
 * Download this project as a nodejs module.And copy all the files to the root dir of Express.
 * Make database config,a config of jugglingdb,put everywhere of the project.
  just like below
 ```javascript
  var Schema = require('jugglingdb').Schema;
  var schema = new Schema('mysql',{
	host:'1.1.2.191',
    	port:3306,
	    username:'mysql',
      password:'mysql',
      database:'TEST'
  });

  module.exports = exports=schema;

 ```
 * Do some change in app.js
 ```javascript
    var proto=require('underscore');
    var extApp = require('application');
    var app =new express();

    app.set('db', path.join(__dirname, 'model/db'));
    ...
    app.use(express.cookieParser());
    app.use(express.session({ secret: "pluginframework" ,cookie:{maxAge:5*60*60*1000}}));
    ...
    app.initPluginSystem(function(){
	
    });
    ...

 ```
    
# Test

 There are several plugins in this project.After server started,u can visit host/site/pluginlistpage 
 to list all the serverside plugins.
 
# How to develop plugin
