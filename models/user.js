var mongoose  = require('mongoose');
var BaseModel = require('./base_model');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
	name: {type: String},
	loginname:{type: String},
	pass:{type: String},
	email:{type: String},
	profile_image_url: {type: String},
	create_at: { type: Date, default: Date.now },
	update_at: { type: Date, default: Date.now },
	level: { type: String },
	active: { type: Boolean, default: false },
	accessToken: {type: String},
	create_at: { type: Date, default: Date.now },
  	update_at: { type: Date, default: Date.now },
});

UserSchema.plugin(BaseModel);
UserSchema.virtual('avatar_url').get(function () {
  var url = this.avatar || ('https://gravatar.com/avatar/' + utility.md5(this.email.toLowerCase()) + '?size=48');

  url = url.replace('www.gravatar.com', 'gravatar.com');

  if (url.indexOf('http:') === 0) {
    url = url.slice(5);
  }

  if (url.indexOf('githubusercontent') !== -1) {
    url += '&s=120';
  }

  return url;
});

mongoose.model('User', UserSchema);