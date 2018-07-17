// Greeter.js
module.exports = function(a) {
  var greet = document.createElement('div');
  greet.textContent = "Hi there and greetings!";

  var dj=function(){
    alert(a+"晓翠");
  }

  return dj;
};