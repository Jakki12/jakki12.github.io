
var pitchCollection =
{
"moodPitchPairs":
	[
	{"mood":"friendly", "pitches":["G#5"]},
	{"mood":"dark", "pitches":["F5"]},
	{"mood":"alarming", "pitches":["C#5","F#5"]},
	{"mood":"nothing", "pitches":["G#5"]},
	{"mood":"nice", "pitches":["C5"]},
	{"mood":"soft", "pitches":["A#5"]}
	]
};


const mySynths = ["jakob", "laura"];
const pitchTypes = ["G#4"];
const noteTypes = ["4n", "8n", "16n"];
const delayTimes = ["4n", "8n", "16n"];



console.log("lookAhead: " + Tone.context.lookAhead);
console.log("setting lookAhead..");
Tone.context.lookAhead = 0;
console.log("lookAhead: " + Tone.context.lookAhead);






var mySynth = new Tone.PolySynth(Tone.Synth);
mySynth.options.envelope.decay = 1;
mySynth.options.envelope.release = 1;
mySynth.options.envelope.attack = 0.1;
mySynth.options.envelope.sustain = 0.5;
mySynth.options.oscillator.type = "sine";



  //// AUDIO MASTER
  var filter1 = new Tone.Filter(1000, "highpass", -24);
  filter1.Q.value = 0.3;
  filter1.gain.value = 0.35;


//mySynth.envelope.decay.value = 1;
//mySynth.envelope.release.value = 1;

//var mySynth = new Tone.Synth();
//mySynth.oscillator.type = "sine";
//mySynth.envelope.attack = 0.005;
const reverb = new Tone.Reverb();
reverb.decay = 1;
reverb.dry = 0.5;
reverb.wet = 0.5;

const delay = new Tone.FeedbackDelay();
delay.delayTime.value = "4n";
delay.feedback.value = 0.9;
delay.wet.value = 0.3;
console.log(delay);

mySynth.chain(delay,filter1, Tone.Master);


function getPitchFromMood(someMood){

	
	for (let i = 0; i < pitchCollection.moodPitchPairs.length; i++) {
  
		let currentMood = pitchCollection.moodPitchPairs[i].mood;
		if (someMood === currentMood)
		{
			//we have the index, where incoming mood's pitches stand
			//get pitch for that mood
			console.log("getting pitch for mood: " + someMood);
			let pitchArrayLength = pitchCollection.moodPitchPairs[i].pitches.length;
			console.log("Array Length for pitches: " + pitchArrayLength);
			newPitch = pitchCollection.moodPitchPairs[i].pitches[generateRandomIntegerInRange(0,pitchArrayLength-1)];
			console.log("new Pitch: " + newPitch);
			return newPitch;
		
		}
	}
}



function playTone(svgElement){

		let currentMood = getMoodFromColor(getColor(svgElement));
		let currentPitch = getPitchFromMood(currentMood);
		let currentNote =  noteTypes[generateRandomIntegerInRange(0, noteTypes.length-1)];

			
		//let currentSynth = setupSynth(mySynths[generateRandomIntegerInRange(0, mySynths.length-1)]);

	  if (Tone.context.state !== "running")
    {
    Tone.start();
    }

		mySynth.triggerAttackRelease(currentPitch, currentNote);
}



/*
function setupSynth(synthID){


	let filter;
	let delay;
	let myDelayTime = delayTimes[generateRandomIntegerInRange(0, delayTimes.length-1)];
	console.log("delayTime: " , myDelayTime);

	switch (synthID)
	{
			case "jakob":
			var mySynth = new Tone.Synth();
			mySynth.oscillator.type = "sine";
			mySynth.envelope.attack = 0.005;
			filter = new Tone.Filter(400, 'highpass', -48);
			filter.Q.value = 0;

			delay = new Tone.FeedbackDelay(myDelayTime, 0.5);


			//console.log(delay.delayTime.value);
			// synth->master
  		//mySynth.connect(Tone.Master);
			//mySynth.chain(Tone.Master);

			break;

		case "laura":

			var mySynth = new Tone.Synth();
			mySynth.volume.value = -10;
			mySynth.oscillator.type = "triangle";
			mySynth.envelope.attack = 0.005;
			filter = new Tone.Filter(300, 'highpass', -48);
			filter.Q.value = 0;
			delay = new Tone.FeedbackDelay(myDelayTime, 0.9);
			//delay.delayTime.value = myDelayTime;

			break;

		  default:
				console.log("issue in own function setupSynth");
	}


	let compressor = new Tone.Compressor(-30, 7);
	mySynth.chain(filter, delay, compressor, Tone.Master)

	// synth->master
  //mySynth.connect(Tone.Master);
	//mySynth.chain(Tone.Master);

	return mySynth;

}
*/
