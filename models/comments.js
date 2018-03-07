var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    id:Number,
    name:String
});

var Comments = mongoose.model('Comments',commentSchema);
module.exports = Comments;
