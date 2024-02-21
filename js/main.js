window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js');
  }
}



let intervalID;

function moveOnRepeat() {
  intervalID = setInterval(moveit, 30);
}

function moveit() {
    var xpos = document.getElementById("mycircle").cx.baseVal.value;
    console.log(xpos);
    
    if(xpos >= 100)
    {
        xpos = 0;      
    }
    else
    {
        xpos += 2;   
    }
    
    document.getElementById("mycircle").cx.baseVal.value = xpos;
    
};




function moveOnRepeat2() {
  setInterval(moveit2, 80);
}
function moveit2() {
    var xpos = document.getElementById("mycircle2").cx.baseVal.value;
    console.log(xpos);
    
    if(xpos >= 300)
    {
        xpos = 0;      
    }
    else
    {
        xpos += 2;   
    }
    
    document.getElementById("mycircle2").cx.baseVal.value = xpos;
    
};


