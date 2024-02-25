const mySynths = ["jakob", "laura"];
const pitchTypes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
const noteTypes = ["1n", "2n", "4n", "8n", "16n"];
const delayTimes = ["4n", "8n", "16n"];


function playTone(){
    
		let currentSynth = setupSynth(mySynths[generateRandomIntegerInRange(0, mySynths.length-1)]);
		let currentPitch =  pitchTypes[generateRandomIntegerInRange(0,pitchTypes.length-1)];
		let currentNote =  noteTypes[generateRandomIntegerInRange(0, noteTypes.length-1)];

	  if (Tone.context.state !== "running")
    {
    Tone.start();
    }
    
		currentSynth.triggerAttackRelease(currentPitch, currentNote);
}





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
			
			delay = new Tone.FeedbackDelay(myDelayTime, 0.9);
			console.log(delay.delayTime.value);
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
