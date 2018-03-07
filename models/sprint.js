var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sprintSchema = new Schema({
    id:Number,
    name:String
});

var Sprint = mongoose.model('Sprint',sprintSchema);
module.exports = Sprint;
