var express = require('express');
var utility = require('../modules/utility');
var User = require('../models/user');
var Issue = require('../models/issue');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Add Issue
router.get('/add_issue',function(req,res,next){
  res.render('./functions/add_issue');
})
router.post('/add_issue',utility.addIssue);

//View Issus
router.get('/view_issue',function(req,res,next){
  res.render('./functions/view_issue');
});
router.post('/view_issue',utility.view_issue);

//Get Sprint
router.get('/get_sprint',utility.get_sprint);

//Plain DB
router.get('/plain_db',utility.get_issue_plain);

//update
router.get('/update_data',function(req,res,next){
  res.render('./functions/update');
});
router.post('/update_data',utility.get_issue_plain);
module.exports = router;
