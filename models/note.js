var mongoose  = require('mongoose');
var BaseModel = require('./base_model');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var NoteSchema = new Schema({
  title: { type: String },
  content: { type: String },
  author_id: { type: ObjectId },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  tab: {type: String},
});

NoteSchema.plugin(BaseModel);

mongoose.model('Note', NoteSchema);