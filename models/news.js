var mongoose  = require('mongoose');
var BaseModel = require('./base_model');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var NewsSchema = new Schema({
	title: {type: String},
	visit_count: {type: Number, default: 0},
	reply_count: {type: Number, default: 0},
	create_at: {type: Date, default: Date.now},
	update_at: {type: Date, default: Date.now},
	content: {type: String},
	author_id: {type: String},
	deleted: {type: Boolean, default: false},
	top: {type: Boolean, default: false},
	lock: {type: Boolean, default: false},
	tab: {type: String},
});

NewsSchema.plugin(BaseModel);

mongoose.model('News', NewsSchema);

