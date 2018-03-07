var User = require('../models/user');
var Issue = require('../models/issue');
var Project = require('../models/project');
var Sprint = require('../models/sprint');
var chance = require('chance')();

module.exports = {
  addIssue:function(req,res,next){

    var issue = new Issue();
    var sprint = new Sprint();
    var project = new Project();
    var sent_issue = req.body;
    var tasks = sent_issue.tasks;
    var tasks_id = [];

    User.findOne({name:sent_issue.user_name},function(err,user){
      if(err) throw err;
      var id;
      //If user does not exist,  create one
      if(user == null){
        var new_user = new User();
        new_user.id = chance.natural();
        new_user.name = sent_issue.user_name;
        new_user.save(function(err){
          if(err) throw err;
        });
        //Obtain user id
        id = new_user.id;
      }else{
        //Obtain user id
        id = user.id;
      }

      //If id successfully returned save issue_type
      if(id != null){
        //save Sprint
        sprint.id = chance.natural();
        sprint.name = sent_issue.issue_version;
        sprint.save(function(err){
          if(err)throw err;
        });

        //save Project
        Project.find({},function(err,data){
          if(err)throw err;
          console.log(JSON.parse(data[0].sprint));
          var sprint_arr = JSON.parse(data[0].sprint);
          console.log(sprint_arr);
          sprint_arr.push(sprint.id);
          Project.update({"_id":data[0]._id},{$set:{sprint:JSON.stringify(sprint_arr)}},function(err,doc){
            if(err)throw err;
          });
        });

        //save subtasks
        for(var i = 0;i<tasks.length;i++){
          issue = new Issue();

          issue.id = tasks[i].id;
          issue.type = tasks[i].issue_type;
          issue.name = tasks[i].name;
          issue.createdBy = id;
          issue.assignee = id;
          issue.description = tasks[i].desc;
          issue.status = tasks[i].issue_state;
          issue.sprint = sprint.id;
          issue.updatedAt = Date();
          issue.createdAt = Date();

          //Save subtask id for task array of basic task
          tasks_id.push(tasks[i].id);

          //save subtask
          issue.save(function(err){
            if(err)throw err;
          })
        }

        //save basic task
        issue = new Issue();
        issue.id = chance.natural();
        issue.type = sent_issue.issue_type;
        issue.name = sent_issue.name;
        issue.sprint = sprint.id;
        issue.createdBy = id;
        issue.assignee = id;
        issue.description = sent_issue.desc;
        issue.status = sent_issue.issue_state;
        issue.tasks = JSON.stringify(tasks_id),
        //comments:Number,
        issue.updatedAt = Date();
        issue.createdAt = Date();

        //save issue
        issue.save(function(err){
          if(err)throw err;
        });
        res.render('./functions/add_issue');
      }
    });
  },

  view_issue: function(req,res,next){
    var type_array = ["Feature","Bug","Task"];
    var no_version = req.body.no_version;
    var no_type = req.body.no_type;
    var no_state = req.body.no_state;

    var count=0;
    var result = [];
    var partial_result = [];
    var p_partial_result = [];

    Issue.find(function(err,data){
      if(err)throw err;
      res.send(data);
    });
  },

  get_issue_plain:function(req,res,next){
    Issue.find(function(err,data){
      if(err)throw err;
      res.json(data);
    })
  },
  get_sprint:function(req,res,next){
    Sprint.find(function(err,data){
      if(err) throw err;
      res.send(data);
    })
  }

}
