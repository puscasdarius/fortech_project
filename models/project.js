var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    id:Number,
    sprint:String
});

var Project = mongoose.model('Project',projectSchema);
module.exports = Project;
