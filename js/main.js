

var startingStrWidth3 = Number(document.getElementById('mycircle3').getAttribute("stroke-width")); 






window.onload = () => {
  'use strict';


  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js');
  }
    
moveOnRepeat();
moveOnRepeat2();
moveOnRepeat3();

}

//onMount
document.addEventListener("DOMContentLoaded", function () {
// let btnUp = document.getElementById("click-up");
// let btnDwn = document.getElementById("click-down");
// clickAndHold(btnUp);
// clickAndHold(btnDwn);

//register circles for click-and-press-checking-routine
		
		
let cir3 = document.getElementById("mycircle3");
clickAndHold(cir3);
		

});

   

function onCircleClick(){
    playTone();
    
}

function playTone(){
    const synth = new Tone.Synth().toDestination();
    if (Tone.context.state !== "running")
    {
    Tone.start();
    }
    synth.triggerAttackRelease("C4", "8n");   
}



function onCircleClick2(){
    playTone2();
}

function playTone2(){
    var synth = new Tone.Synth().toDestination();
    if (Tone.context.state !== "running")
    {
    Tone.start();
    }
    synth.triggerAttackRelease("C5", "16n"); 
}





function wasClick(TimeThatCircleWasPressed)
{
	if(TimeThatCircleWasPressed <= 10)
	{
	return true;
	}
	else
	{
	return false;
	}
}
	


function onCircleClick3(){
	if(!doOffAnimation)
	{
		onAnimation3(100);
	}
	else
	{
		
		//playTone je nach farbe,geschwindikeit was auch immer kurz oder lang oder hoch oder tief
		//TODO
		
		playTone3();
		
		//entscheide je nach press oder click, ob delay oder nicht oder irgendwein anderer effekt
		//TODO
		
		
		
		//mache off animation ebenfalls je nach delay,reverb, press time was auch immer
		
		console.log("mache off animation");
		offAnimation3();
		
	}
}



function onAnimation3(maxStrokeWidth){
	console.log("in on animation");
	let cir3 = document.getElementById('mycircle3'); 
  //console.log(g.attributes)
	//g.setAttribute("r", radius+3);
	let strWidth = Number(cir3.getAttribute("stroke-width"));
	if (strWidth <= maxStrokeWidth) //todo: 80 dynamisch festlegen mit anfänglicher stroke-width
	{
		cir3.setAttribute("stroke-width", strWidth+3);
		//were still animating
		return true;
	}
	else
	{
		//on Animation has finished
		return false;	
	}
}


function offAnimation3() {
	//console.log("in off animation");
	
	let kreis3 = document.getElementById('mycircle3'); 
	let timer = setInterval(function()
	{
		let strokeWidth = Number(kreis3.getAttribute("stroke-width"));
		console.log("current stroke width " + strokeWidth);

		if (strokeWidth <= startingStrWidth3)
		{
			//console.log("stop");
			clearInterval(timer);
			return;
		}
		else
		{
			kreis3.setAttribute("stroke-width", strokeWidth-3);
		}
	}, 20);	
}


function playTone3(){
	var synth = new Tone.Synth().toDestination();
  
	if (Tone.context.state !== "running")
  {
    Tone.start();
  }
  synth.triggerAttackRelease("E4", "4n"); 
}

													 


//moving the circles

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


function moveOnRepeat3() {
  setInterval(moveit3, 13);
}
function moveit3() {
	var circle_elem = document.getElementById("mycircle3");
  var xpos = document.getElementById("mycircle3").cx.baseVal.value;
  var circle_width = circle_elem.getBoundingClientRect().width;
    
  if(!elementRightBorderCheck(circle_elem))
  {
  	xpos = -circle_width;      
  }
  else
  {
  	xpos += 1;   
  } 
  
	document.getElementById("mycircle3").cx.baseVal.value = xpos;  
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


//This function clicks a dedicated btn-element programmatically as long as it is pressed.
//By this, the HTML-onClick() function will continously be fired as long as the element is held.





var pressedTime = 0;
var clickOrHold = 0;
var doOffAnimation = false;

function clickAndHold(svgElement){
 
 let timerId;
 const DURATION = 20;

 //handle when clicking down
 const onMouseDown = () =>
 {
	pressedTime = 0;
	doOffAnimation = false;
	 
  timerId = setInterval(() =>
  {	
		//for buttons use: svgElement.click();
		//for svg-circles, we use: dispatchEvent()....
    svgElement && svgElement.dispatchEvent(new Event('click')) && pressedTime++;
  }, DURATION);
 };

 //stop or clear interval
 const clearTimer = () =>
 {
   timerId && clearInterval(timerId);
	 clickOrHold = wasClick(pressedTime);
	 doOffAnimation = true;
	 console.log(clickOrHold);
	 
 };
	

 //handle when mouse is clicked -> rufe unsere eigene onMouseDown-Routine auf
 svgElement.addEventListener("mousedown", onMouseDown);
 //handle when mouse is raised ->rufe unsere eigene clearTimer-Routine auf
 svgElement.addEventListener("mouseup", clearTimer);
 //handle mouse leaving the clicked button
 svgElement.addEventListener("mouseout", clearTimer);

 // a callback function to remove listeners useful in libs like react
 // when component or element is unmounted
 return () =>
 {
   svgElement.removeEventListener("mousedown", onMouseDown);
   svgElement.removeEventListener("mouseup", clearTimer);
   svgElement.removeEventListener("mouseout", clearTimer);
 };
};









/////////Stuff for later 



      let counterUp = 0;
      let counterDown = 0;
      //Now you can just listen to the click event will keep trigerring while you hold down the button
      const clickUp = () => {
        console.log("in function clickup");
        counterDown = 0;
        counterUp++;
        document.getElementById(
          "display-one"
        ).innerHTML = `Button Clicked Up: ${counterUp}`;
      };

      const clickDown = () => {
        counterUp = 0;
        counterDown++;
        document.getElementById(
          "display-two"
        ).innerHTML = `Button Clicked Down: ${counterDown}`;
      };
 

