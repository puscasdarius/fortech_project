$( document ).ready(function() {
  init();
});

var init = function(){
  var states = ["New","In progress","Feedback","Rework","Resolved","Ready for Testing"];
  var types = ["Feature","Bug","Task"];

//save permanent data
  localStorage.setItem('states',JSON.stringify(states));
  localStorage.setItem('types',JSON.stringify(types));
}
