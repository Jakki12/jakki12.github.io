
//TODO
//smarthphone auto gestures blockierne, auf jeden fall zoom, text markierungen 
//portrait oder landscape oder beiedes? --> anzahl circles
//onAnimation() stroke width dynamisch




//***GLOBAL VARIABLES****************************************************************************
var startingStrWidth = Number(document.getElementById('mycircle').getAttribute("stroke-width"));
var startingStrWidth2 = Number(document.getElementById('mycircle2').getAttribute("stroke-width")); 
var startingStrWidth3 = Number(document.getElementById('mycircle3').getAttribute("stroke-width")); 
var startingStrWidth4 = Number(document.getElementById('mycircle4').getAttribute("stroke-width")); 

var minCircleSize = 40;
var maxCircleSize = 110;
var minStrokeWidth = 20;
var maxStrokeWidth = 60;
//************************************************************************************************



//***DEBUG CONSOLE********************************************************************************
/*
(()=>{
  const console_log = window.console.log;
  window.console.log = function(...args){
    console_log(...args);
    var textarea = document.getElementById('my_console');
    if(!textarea) return;
    args.forEach(arg=>textarea.value += `${JSON.stringify(arg)}\n`);
		document.getElementById('my_console').scrollTop = document.getElementById('my_console').scrollHeight
  }
})();
*/

console.log("Hello=)");
//************************************************************************************************



//***ON LOAD STUFF********************************************************************************
window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js');
  }
    
moveOnRepeat();
moveOnRepeat2();
moveOnRepeat3();
moveOnRepeat4();

	


}

//onMount
document.addEventListener("DOMContentLoaded", function () {
// let btnUp = document.getElementById("click-up");
// let btnDwn = document.getElementById("click-down");
// clickAndHold(btnUp);
// clickAndHold(btnDwn);

//register circles for click-and-press-checking-routine
		
let cir = document.getElementById("mycircle");
let cir2 = document.getElementById("mycircle2");
let cir3 = document.getElementById("mycircle3");
let cir4 = document.getElementById("mycircle4");

clickAndHoldTouch(cir);
clickAndHoldTouch2(cir2);
clickAndHoldTouch3(cir3);
clickAndHoldTouch4(cir4);
	
changeStyle(cir);
changeStyle(cir2);
changeStyle(cir3);
changeStyle(cir4);
});
//************************************************************************************************

 





//***CIRCLE SPECIFIC STUFF************************************************************************
//******CIRCLE 1*******//

let isPlaying = false;

//this function is fired continously by clickAndTouch()-function
function onCircleClick(){
		
	
	if(!doOffAnimation)
	{
		onAnimation(100);
		
	}
	else
	{
		playTone();
		offAnimation();
	}
    
}

function onAnimation(maxStrokeWidth){
	console.log("in on animation1");
	let cir = document.getElementById('mycircle'); 
	let strWidth = Number(cir.getAttribute("stroke-width"));
	if (strWidth <= maxStrokeWidth) //todo: maxStrokeWidth dynamisch festlegen mit anfänglicher stroke-width
	{
		cir.setAttribute("stroke-width", strWidth+3);
		//were still animating
		return true;
	}
	else
	{
		//on Animation has finished
		return false;	
	}
}
function offAnimation() {
	console.log("in off animation1");
	
	let kreis = document.getElementById('mycircle'); 
	let timer = setInterval(function()
	{
		let strokeWidth = Number(kreis.getAttribute("stroke-width"));
		//console.log("current stroke width " + strokeWidth);

		if (strokeWidth <= startingStrWidth)
		{
			//console.log("stop");
			clearInterval(timer);
			return;
		}
		else
		{
			kreis.setAttribute("stroke-width", strokeWidth-3);
		}
	}, 20);	
}

let intervalID;
function moveOnRepeat() {
  intervalID = setInterval(moveit, 30);
}
function moveit() {
    //every x ms do:
	  var circle_elem = document.getElementById("mycircle");
    var xpos = document.getElementById("mycircle").cx.baseVal.value;
    var circle_width = circle_elem.getBoundingClientRect().width;
    
    //check if we're outside on the right
    if(!elementRightBorderCheck(circle_elem))
    {  
			//reset circle position to outside-left  
			xpos = -circle_width;
			changeStyle(circle_elem);
    }
    else
    {
				//move on
        xpos += 2;   
    }
    //set new position
    document.getElementById("mycircle").cx.baseVal.value = xpos;
    
};

//This function clicks a dedicated btn-element programmatically as long as it is pressed.
//By this, the HTML-onClick() function will continously be fired as long as the element is held.
var pressedTime = 0;
var clickOrHold = 0;
var doOffAnimation = false;
function clickAndHoldTouch(svgElement){
 
 let timerId;
 const DURATION = 20;

 //handle when clicking down
 const onMouseDown = (event) =>
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
 const clearTimer = (event) =>
 {
	 timerId && clearInterval(timerId);
	 clickOrHold = wasClick(pressedTime);
	 doOffAnimation = true;
 };
	
	
	//handle when MOUSE is clicked/screen is touched -> rufe unsere eigene onMouseDown-Routine auf
 svgElement.onpointerdown = onMouseDown;
 svgElement.onpointerup = clearTimer;
 svgElement.onpointercancel = clearTimer;
 svgElement.onpointercancel = clearTimer;
 svgElement.onpointerout = clearTimer;
 svgElement.onpointerleave = clearTimer;
 svgElement.onlostpointercapture = clearTimer;

};

//******CIRCLE 1*******//



//******CIRCLE 2*******//
function onCircleClick2(){

	console.log("second Circle clicked");
		if(!doOffAnimation2)
	{
		onAnimation2(100);
	}
	else
	{
		playTone();
		offAnimation2();	
	}

}

function onAnimation2(maxStrokeWidth){
	console.log("in on animation2");
	let cir2 = document.getElementById('mycircle2'); 
	let strWidth = Number(cir2.getAttribute("stroke-width"));
	if (strWidth <= maxStrokeWidth) //todo: maxStrokeWidth dynamisch festlegen mit anfänglicher stroke-width
	{
		cir2.setAttribute("stroke-width", strWidth+3);
		//were still animating
		return true;
	}
	else
	{
		//on Animation has finished
		return false;	
	}
}
function offAnimation2() {
	console.log("in off animation2");
	
	let kreis2 = document.getElementById('mycircle2'); 
	let timer = setInterval(function()
	{
		let strokeWidth = Number(kreis2.getAttribute("stroke-width"));

		if (strokeWidth <= startingStrWidth2)
		{
			//console.log("stop");
			clearInterval(timer);
			return;
		}
		else
		{
			kreis2.setAttribute("stroke-width", strokeWidth-3);
		}
	}, 20);	
}
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
			  changeStyle(circle_elem);
    }
    else
    {
        xpos += 2;   
    }
    
    document.getElementById("mycircle2").cx.baseVal.value = xpos;
    
};

var pressedTime2 = 0;
var clickOrHold2 = 0;
var doOffAnimation2 = false;
function clickAndHoldTouch2(svgElement){
 
 let timerId;
 const DURATION = 20;

 //handle when clicking down
 const onMouseDown = (event) =>
 {
	
	pressedTime2 = 0;
	doOffAnimation2 = false;
	 
  timerId = setInterval(() =>
  {	
		//for buttons use: svgElement.click();
		//for svg-circles, we use: dispatchEvent()....
    svgElement && svgElement.dispatchEvent(new Event('click')) && pressedTime2++;
  }, DURATION);
 };

 //stop or clear interval
 const clearTimer = (event) =>
 {
	 timerId && clearInterval(timerId);
	 clickOrHold2 = wasClick(pressedTime2);
	 doOffAnimation2 = true;
 };
	
	
	//handle when MOUSE is clicked/screen is touched -> rufe unsere eigene onMouseDown-Routine auf
 svgElement.onpointerdown = onMouseDown;
 svgElement.onpointerup = clearTimer;
 svgElement.onpointercancel = clearTimer;
 svgElement.onpointercancel = clearTimer;
 svgElement.onpointerout = clearTimer;
 svgElement.onpointerleave = clearTimer;
 svgElement.onlostpointercapture = clearTimer;
};
//******CIRCLE 2*******//



//******CIRCLE 3*******//
function onCircleClick3(){
	
	if(!doOffAnimation3)
	{
		onAnimation3(100);
	}
	else
	{
		playTone();
		offAnimation3();
		
	}
}
function onAnimation3(maxStrokeWidth){
	console.log("in on animation3");
	let cir3 = document.getElementById('mycircle3'); 

	let strWidth = Number(cir3.getAttribute("stroke-width"));
	if (strWidth <= maxStrokeWidth) //todo: maxStrokeWidth dynamisch festlegen mit anfänglicher stroke-width
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
		//console.log("current stroke width " + strokeWidth);

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
		changeStyle(circle_elem);
  }
  else
  {
  	xpos += 1;   
  } 
  
	document.getElementById("mycircle3").cx.baseVal.value = xpos;  
};

var pressedTime3 = 0;
var clickOrHold3 = 0;
var doOffAnimation3 = false;
function clickAndHoldTouch3(svgElement){
 
 let timerId;
 const DURATION = 20;

 //handle when clicking down
 const onMouseDown = (event) =>
 {
	
	pressedTime3 = 0;
	doOffAnimation3 = false;
	 
  timerId = setInterval(() =>
  {	
		//for buttons use: svgElement.click();
		//for svg-circles, we use: dispatchEvent()....
    svgElement && svgElement.dispatchEvent(new Event('click')) && pressedTime3++;
  }, DURATION);
 };

 //stop or clear interval
 const clearTimer = (event) =>
 {
	 timerId && clearInterval(timerId);
	 clickOrHold3 = wasClick(pressedTime3);
	 doOffAnimation3 = true;
 };
	
	
	//handle when MOUSE is clicked/screen is touched -> rufe unsere eigene onMouseDown-Routine auf
 svgElement.onpointerdown = onMouseDown;
 svgElement.onpointerup = clearTimer;
 svgElement.onpointercancel = clearTimer;
 svgElement.onpointerout = clearTimer;
 svgElement.onpointerleave = clearTimer;
 svgElement.onlostpointercapture = clearTimer;


};
//******CIRCLE 3*******//





//******CIRCLE 4*******//
function onCircleClick4(){
	
	if(!doOffAnimation4)
	{
		onAnimation4(100);
	}
	else
	{
		playTone();
		offAnimation4();	
	}
}
function onAnimation4(maxStrokeWidth){
	console.log("in on animation4");
	let cir4 = document.getElementById('mycircle4'); 

	let strWidth = Number(cir4.getAttribute("stroke-width"));
	if (strWidth <= maxStrokeWidth) //todo: maxStrokeWidth dynamisch festlegen mit anfänglicher stroke-width
	{
		cir4.setAttribute("stroke-width", strWidth+3);
		//were still animating
		return true;
	}
	else
	{
		//on Animation has finished
		return false;	
	}
}
function offAnimation4() {
	console.log("in off animation4");
	
	let kreis4 = document.getElementById('mycircle4'); 
	let timer = setInterval(function()
	{
		let strokeWidth = Number(kreis4.getAttribute("stroke-width"));
		//console.log("current stroke width " + strokeWidth);

		if (strokeWidth <= startingStrWidth4)
		{
			//console.log("stop");
			clearInterval(timer);
			return;
		}
		else
		{
			kreis4.setAttribute("stroke-width", strokeWidth-3);
		}
	}, 20);	
}
function moveOnRepeat4() {
  setInterval(moveit4, 20);
}
function moveit4() {
	var circle_elem = document.getElementById("mycircle4");
  var xpos = document.getElementById("mycircle4").cx.baseVal.value;
  var circle_width = circle_elem.getBoundingClientRect().width;
    
  if(!elementRightBorderCheck(circle_elem))
  {
  	xpos = -circle_width;
		changeStyle(circle_elem);
  }
  else
  {
  	xpos += 2.5;   
  } 
  
	document.getElementById("mycircle4").cx.baseVal.value = xpos;  
};

var pressedTime4 = 0;
var clickOrHold4 = 0;
var doOffAnimation4 = false;
function clickAndHoldTouch4(svgElement){
 
 let timerId;
 const DURATION = 20;

 //handle when clicking down
 const onMouseDown = (event) =>
 {
	
	pressedTime4 = 0;
	doOffAnimation4 = false;
	 
  timerId = setInterval(() =>
  {	
		//for buttons use: svgElement.click();
		//for svg-circles, we use: dispatchEvent()....
    svgElement && svgElement.dispatchEvent(new Event('click')) && pressedTime4++;
  }, DURATION);
 };

 //stop or clear interval
 const clearTimer = (event) =>
 {
	 timerId && clearInterval(timerId);
	 clickOrHold4 = wasClick(pressedTime4);
	 doOffAnimation4 = true;
 };
	
	
	//handle when MOUSE is clicked/screen is touched -> rufe unsere eigene onMouseDown-Routine auf
 svgElement.onpointerdown = onMouseDown;
 svgElement.onpointerup = clearTimer;
 svgElement.onpointercancel = clearTimer;
 svgElement.onpointerout = clearTimer;
 svgElement.onpointerleave = clearTimer;
 svgElement.onlostpointercapture = clearTimer;
};
//******CIRCLE 4*******//

//learning pointer touch
//
//function over_handler(event) {}
//function enter_handler(event) {}
//function down_handler(event) {
//console.log("in down handler");
//}
//function move_handler(event) {}
//function up_handler(event) {}
//function cancel_handler(event) {}
//function out_handler(event) {}
//function leave_handler(event) {}
//function rawupdate_handler(event) {}
//function gotcapture_handler(event) {}
//function lostcapture_handler(event) {}
//


// pointer funktionen:
/*
      const el = document.getElementById("target");
      // Register pointer event handlers
      el.onpointerover = over_handler;
      el.onpointerenter = enter_handler;
      el.onpointerdown = down_handler; //hab ich
      el.onpointermove = move_handler;
      el.onpointerup = up_handler; //hab ich
      el.onpointercancel = cancel_handler; //hab ich
      el.onpointerout = out_handler;
      el.onpointerleave = leave_handler;
      el.onpointerrawupdate = rawupdate_handler;
      el.ongotpointercapture = gotcapture_handler;
      el.onlostpointercapture = lostcapture_handler;

*/