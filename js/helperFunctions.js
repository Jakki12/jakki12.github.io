//***HELPER FUNCTIONS*****************************************************************************

//check if touch was click oder hold
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

 };


	//handle when MOUSE is clicked -> rufe unsere eigene onMouseDown-Routine auf
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



}; //deprecated

function changeStyle(svgElement){


	//new circle size and radius with randomness
	let newRadius = generateRandomIntegerInRange(minCircleSize, maxCircleSize);
	let newStrokeWidth = generateRandomIntegerInRange(minStrokeWidth, maxStrokeWidth);

	//get new color with randomness
	//
	//which color pair to get? === which index in color collection?
	let newColorIndex = generateRandomIntegerInRange(0, (colorCollection.colorpairs.length-1));

	//grab color pairs from collection
	let newColorA = colorCollection.colorpairs[newColorIndex].firstColor;
	let newColorB = colorCollection.colorpairs[newColorIndex].secondColor;

	//decide randomly which color is fill and which is stroke
	let hueHott = generateRandomIntegerInRange(0, 1);

	let newFillColor;
	let newStrokeColor;

	switch (hueHott)
	{
		case 0:
			newFillColor = newColorA;
			newStrokeColor = newColorB;
			break;
		case 1:
			newFillColor = newColorB;
			newStrokeColor = newColorA;
			break;
		default:
			console.log("issue in own function changeStyle");
	}

	//set the new attributes to the circle
	svgElement.setAttribute("r", newRadius);
	svgElement.setAttribute("stroke-width", newStrokeWidth);
	svgElement.setAttribute("fill", newFillColor);
	svgElement.setAttribute("stroke", newStrokeColor);
}

//Generate a number between 0 and max, including max
function generateRandomInteger(max) {
	return Math.floor(Math.random() * max) + 1;
}

//Generate a random number between min and max, including both min and max
function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Generate random random float in range, including max
function generateRandomFloatInRange(min, max) {
    return Math.random() * (max - min) + min;
}

//Get inner color of circle
function getColor(svgElement)
{	
	return svgElement.getAttribute('fill');
}

function getMoodFromColor(color){

for (let i = 0; i < colorCollection.colorMoodPairs.length; i++) {
  
		let currentColor = colorCollection.colorMoodPairs[i].color;
		if (color === currentColor)
		{
			let colorMood = colorCollection.colorMoodPairs[i].mood;
			return colorMood;
		}
}


}


//************************************************************************************************
