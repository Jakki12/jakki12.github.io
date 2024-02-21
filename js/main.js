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
    var circle_elem = document.getElementById("mycircle");
    var xpos = document.getElementById("mycircle").cx.baseVal.value;
    var circle_width = circle_elem.getBoundingClientRect().width;
    
    
    if(!elementRightBorderCheck(circle_elem))
    {
        xpos = -circle_width;      
    }
    else
    {
        xpos += 2;   
    }
    
    document.getElementById("mycircle").cx.baseVal.value = xpos;
    
};




function moveOnRepeat2() {
  setInterval(moveit2, 10);
}
function moveit2() {
   
    var circle_elem = document.getElementById("mycircle2");
    var xpos = document.getElementById("mycircle2").cx.baseVal.value;
    var circle_width = circle_elem.getBoundingClientRect().width;
    
    if(!elementRightBorderCheck(circle_elem))
    {
        xpos = -circle_width;      
    }
    else
    {
        xpos += 2;   
    }
    
    document.getElementById("mycircle2").cx.baseVal.value = xpos;
    
};


function elementRightBorderCheck(element) {

    var bounding = element.getBoundingClientRect();
    
    var elemWidth = bounding.width;
  

    if (bounding.right <= ((window.innerWidth+elemWidth) || (document.documentElement.clientWidth+elemWidth)))
    {
        return true;
    } else {
        return false;
    }
}
