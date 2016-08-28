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

exports.getUserByMail = function(email, callback) {
	User.findOne({email:email}, callback);
};

exports.countUsersByMail = function (email, callback) {
	User.count({email:email}, callback);
};

exports.getUserByLoginName = function (loginName, callback) {
  User.findOne({'loginname': new RegExp('^'+loginName+'$', "i")}, callback);
};

exports.getUserById = function(id, callback) {
	User.findOne({_id:id}).populate('name').exec(callback);
};

var makeGravatar = function (email) {
  return 'http://www.gravatar.com/avatar/' + utility.md5(email.toLowerCase()) + '?size=48';
};
exports.makeGravatar = makeGravatar;

exports.getGravatar = function (user) {
  return user.avatar || makeGravatar(user);
};