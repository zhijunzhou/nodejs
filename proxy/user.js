// var Eventproxy		= require('eventproxy');
var User			= require('../models').User;
var uuid           	= require('node-uuid');
var utility			= require('utility');

exports.createUser = function (name, loginname, pass, email, avatar_url, active, callback) {
	
	var user 		= new User();
	
	user.name			= name;
	user.loginname		= loginname;
	user.pass			= pass;
	user.email			= email;
	user.avatar_url		= avatar_url;
	user.active			= active || false;
	user.accessToken	= uuid.v4();

	user.save(callback);
};

var makeGravatar = function (email) {
  return 'http://www.gravatar.com/avatar/' + utility.md5(email.toLowerCase()) + '?size=48';
};
exports.makeGravatar = makeGravatar;

exports.getGravatar = function (user) {
  return user.avatar || makeGravatar(user);
};