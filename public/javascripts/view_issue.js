$( document ).ready(function() {

  var result = [];
  var sprint_data = [];
  var states = JSON.parse(localStorage.getItem('states'));
  var no_version = JSON.parse(localStorage.getItem('version'));
  var no_type = JSON.parse(localStorage.getItem('types'));
  var no_state = JSON.parse(localStorage.getItem('states'));
  var table_body = document.getElementById('table_body');
  var select_filter = document.getElementById('select_filter');

  var xmlhttp = new XMLHttpRequest();

  if(document.getElementById('states_panel'))
    init();
  if(select_filter)
    select_filter.onchange = filter;


//Functions

  //Not working
  function process_data(){
    var sprint = JSON.parse(localStorage.getItem('version'));

    var basic_arr = [];
    var partial_arr = [];

    for(var i = 1;i<=sprint;i++){
      partial_arr = [];
      for(var j = 0;j<sprint_data.length;j++){
        if(sprint_data[j].name == i){
          partial_arr.push(sprint_data[j].id);
        }
      }
      basic_arr.push(partial_arr);
    }

    for(var i = 0;i<basic_arr.length;i++){
      var arr = basic_arr[i];
      partial_arr = [];
      for(var k = 0;k<arr.length;k++){
        for(var j = 0;j<result.length;j++){
          if(arr[k] == result[j]){
            partial_arr.push(result[j]);
          }
        }
      }
    }

  }

  function filter(){
    var filter_value = select_filter.value;

    //Sprint filter
    //Not working
    if(filter_value == 1){
      //Get sprint table
      xmlhttp.open("GET", "/get_sprint");
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlhttp.send(null);
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4) {
          sprint_data = JSON.parse(xmlhttp.response);
          //process_data();
        }
      }
    }

    //Status Filter
    if(filter_value == 2){
      var basic_arr = [];
      var status = JSON.parse(localStorage.getItem('states'));
      for(var i = 0;i<status.length;i++){
        for(var j = 0;j<result.length;j++){
          if(i == result[j].status){
            basic_arr.push(result[j]);
          }
        }
      }
      render(table_body,basic_arr);
    }

  }

  //Render table body
  function render(tag,data){
      tag.innerHTML = '';
    for(var i = 0;i<data.length;i++){
      tag.innerHTML +=
      +'<tr>'
        +'<td>'+data[i].id+'</td>'
        +'<td>'+data[i].sprint+'</td>'
        +'<td>'+data[i].name+'</td>'
        +'<td>'+data[i].description+'</td>'
        +'<td>'+data[i].status+'</td>'
        +'<td>'+data[i].type+'</td>'
     +'</tr>';
    }
  }

  //Get initial data
  function init(){
    table_body.innerHTML = "";

    xmlhttp.open("POST", "/view_issue");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(null);

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        result = JSON.parse(xmlhttp.response);
        render(table_body,result);
      }
    }
  }
});
