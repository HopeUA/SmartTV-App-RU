var Audio = {
	plugin : null
}

Audio.init = function() {
	var success = true;

	this.plugin = document.getElementById("pluginAudio");
	this.plugin.Open("Audio", "1.000", "GetVolume");

	if(!this.plugin) {
		success = false;
	}

	return success;
}

Audio.deinit = function() {
	if(!this.plugin) {
		this.plugin.Close();
	}
}

Audio.setRelativeVolume = function(delta) {
	this.plugin.Execute('SetVolumeWithKey', delta);
	Display.setVolume(this.getVolume());

}

Audio.getVolume = function() {
	alert("Volume : " + this.plugin.Execute('GetVolume'));
	return this.plugin.Execute('GetVolume');
}