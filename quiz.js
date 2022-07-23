var buttons = document.getElementsByClassName("option");
var correct;
var num_correct = 0;
var num_wrong = 0;
var hintUp = false;
var grading = false;

function generateSet(){
  var id = Math.floor(Math.random()*89);
  var direction = Math.floor(Math.random()*4);
  var cardinal = ["north","south","west","east"];
  var correct_button = Math.floor(Math.random()*4);
  var answer = data[id][direction+1];
  var question = "Which constellation is " + cardinal[direction] + " of " + data[id][0] + "?";
  var current;
  var distractors = [];
  for(var i = 0; i < 3; ++i){
    do{
      current = data[Math.floor(Math.random()*89)][0];
    }
    while(distractors.includes(current)||current==answer);
    distractors.push(current);
  }
  document.getElementById("question").innerHTML = question;
  var j=0;
  for(var i =0; i < buttons.length; ++i){
    if(i==correct_button)buttons[i].innerHTML=answer;
    else {
      buttons[i].innerHTML=distractors[j];
      ++j;
    }
  }
  return answer;
}

function grade(e){
  if(grading) return;
  grading = true;
  var response = document.getElementById("response");
  if(e.target.innerHTML==correct){
    e.target.classList.add("btn-success");
    e.target.classList.remove("btn-outline-dark");
    response.innerHTML = "Correct! The answer is " + correct + ".";
  setTimeout(function(){
    grading = false;
    correct = generateSet();
    e.target.classList.add("btn-outline-dark");
    e.target.classList.remove("btn-success");
  }, 500);
    ++num_correct;
  }
  else{
    e.target.classList.add("btn-danger");
    e.target.classList.remove("btn-outline-dark");
    response.innerHTML = "Try again.";
    setTimeout(function(){
    grading = false;
    e.target.classList.add("btn-outline-dark");
    e.target.classList.remove("btn-danger");
  }, 500);
    ++num_wrong
  }
}

function toggleHint(){
  if(hintUp){
    document.getElementById("hint-container").style.display = "none";
    document.getElementById("show-hint").innerHTML = "Check star map";
  }
  else{
    document.getElementById("hint-container").style.display = "block";
    document.getElementById("show-hint").innerHTML = "Close star map";
  }
  hintUp = !hintUp;
}

function listen(){
  for(var i =0; i < buttons.length; ++i){
    buttons[i].addEventListener("click", grade);
  }
  document.getElementById("show-hint").addEventListener("click", toggleHint);
}

correct = generateSet();
listen();
