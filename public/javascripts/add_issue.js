$(document).ready(function(){

  var button = document.getElementById('new_version');
  var version = JSON.parse(localStorage.getItem('version') || 0);
  var select = document.getElementById('issue_version');
  var issue_form = document.getElementById('issue_form');
  var issue_type = document.getElementById('issue_type');
  var second_panel = document.getElementsByClassName('second_panel');
  var tasks = [];

  init();
  if(button)
    button.addEventListener('click',addVersion);
  if(issue_form)
    issue_form.addEventListener('submit',submit);
  if(issue_type)
    issue_type.onchange = display_second_panel;
  if(document.getElementById('s_add_subtask'))
    document.getElementById('s_add_subtask').addEventListener('click',process_second_panel);

  function process_second_panel(){
    var name = document.getElementById('s_input_name').value;
    var desc = document.getElementById('s_input_des').value;
    var issue_state = document.getElementById('s_issue_state').value;
    var form = document.getElementById('s_issue_form');

    var task = {
      id:chance.natural(),
      name:name,
      desc:desc,
      issue_state:issue_state,
      issue_type:"Task"
    };

    tasks.push(task);
    form.reset();
  }

  function display_second_panel(){
    var type = issue_type.value;
    if( type == "Feature" || type == "Bug" ){
      second_panel[0].classList.remove('deactivate_second_panel');
      second_panel[0].classList.add('activate_second_panel');
    }
    else{
      second_panel[0].classList.remove('activate_second_panel');
      second_panel[0].classList.add('deactivate_second_panel');
    }

  }

  function submit(){
        var name = document.getElementById('input_name').value;
        var desc = document.getElementById('input_des').value;
        var issue_version = document.getElementById('issue_version').value;
        var issue_type = document.getElementById('issue_type').value;
        var issue_state = document.getElementById('issue_state').value;
        var user_name = document.getElementById('user_name').value;

        var issue = {
          name:name,
          desc:desc,
          issue_version:issue_version,
          issue_type:issue_type,
          issue_state:issue_state,
          user_name:user_name,
          tasks:tasks
        };

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/add_issue");
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify(issue));
      }

  function init(){
    if(select){
      select.innerHTML = "";

        if(select){
          for(var i = 1;i<= version;i++){
            select.innerHTML += '<option value="'+i+'">'+i+'</option>';
          }
        }
    }
}

    function addVersion(){
      version ++;
      localStorage.setItem('version',JSON.stringify(version));
      init();
    }
});
