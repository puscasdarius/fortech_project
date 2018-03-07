var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var issueSchema = new Schema({
    id:Number,
    type:String,
    name:String,
    sprint:Number,
    createdBy:Number,
    assignee:Number,
    description:String,
    status:Number,
    tasks:String,
    comments:Number,
    updatedAt:Date,
    createdAt:Date
});

var Issue = mongoose.model('Issue',issueSchema);
module.exports = Issue;
