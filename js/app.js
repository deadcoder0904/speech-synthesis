document.addEventListener('DOMContentLoaded',function() {
	const msg = new SpeechSynthesisUtterance();
	let voices = [];
	const dropDownMenu = document.querySelector('[name=dropDownMenu]');
	const stopButton = document.getElementById('stop');
	const speakButton = document.getElementById('speak');
	const options = document.querySelectorAll('[type=range], [name=text]');

	msg.text = document.querySelector('[name=text]').value;

	function populateVoices() {
		voices = this.getVoices();
		dropDownMenu.innerHTML = voices.map(i => `<option value="${i.name}">${i.name} (${i.lang})</option>`).join('');
	}

	function speakUp() {
		speechSynthesis.speak(msg);
	}

	function setVoices() {
		msg.voice = voices.find(voice => voice.name === this.value);
		toggle();
	}

	function toggle(startOver = true) {
		speechSynthesis.cancel();
		if(startOver)
			speakUp();
	}

	function setOption() {
		msg[this.name] = this.value;
		toggle();
	}

	speechSynthesis.addEventListener('voiceschanged', populateVoices);
	dropDownMenu.addEventListener('change', setVoices);

	options.forEach(option => option.addEventListener('change', setOption));

	speakButton.addEventListener('click', speakUp);
	stopButton.addEventListener('click', () => toggle(false));
});
