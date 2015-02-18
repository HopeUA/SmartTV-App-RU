var Player = {
	plugin : null,
	state : -1,
	skipState : -1,
	stopCallback : null,
	originalSource : null,

	STOPPED : 0,
	PLAYING : 1,
	PAUSED : 2,
	FORWARD : 3,
	REWIND : 4
}

Player.init = function() {
	var success = true;
	alert("success vale :  " + success);
	this.state = this.STOPPED;
	
	this.plugin = document.getElementById("pluginPlayer");
	this.plugin.OnEvent = onEvent;
	this.plugin.Open("Player", "0001", "InitPlayer");

	if(!this.plugin) {
		alert("success vale this.plugin :  " + success);
		success = false;
	}

	alert("success vale :  " + success);

	this.setFullscreen();

	alert("success vale :  " + success);

	this.plugin.OnConnectionFailed = OnConnectionFailed;
	function OnConnectionFailed() {
	    Player.Stop();
	    
	}
	alert("success vale :  " + success);
	return success;
}

Player.deinit = function() {
	alert("Player deinit!");

	if(this.plugin) {
		this.plugin.Execute("Stop");
		this.plugin.Close();
	}
}

Player.setFullscreen = function() {
	this.plugin.Execute('SetDisplayArea', 0, 0, 960, 540);
}

Player.setVideoURL = function(url) {
	this.url = url;
}

Player.playVideo = function() {
	if(this.url == null) {
		alert("No videos to play");
	} else {
		this.state = this.PLAYING;
		Display.status("Play");
		this.setFullscreen();
		this.plugin.Execute("Play", this.url);
		Audio.plugin.Execute('SetSystemMute',0);
	}
}

Player.getState = function() {
	return this.state;
}

Player.onBufferingStart = function() {
	Display.status("Buffering...");
	switch(this.skipState) {
		case this.FORWARD:
			break;

		case this.REWIND:
			break;
	}
}

Player.onBufferingProgress = function(percent) {
	Display.status("Buffering:" + percent + "%");
}

Player.onBufferingComplete = function() {
	Display.status("Play");
	switch(this.skipState) {
		case this.FORWARD:
			break;

		case this.REWIND:
			break;
	}
}

Player.setCurTime = function(time) {
	Display.setTime(time);
}

Player.setTotalTime = function() {
	Display.setTotalTime(Player.plugin.Execute("GetDuration"));
}
onServerError = function() {
	Display.status("Server Error!");
}
OnNetworkDisconnected = function() {
	Display.status("Network Error!");
}
getBandwidth = function(bandwidth) {
	alert("getBandwidth " + bandwidth);
}
onDecoderReady = function() {
	alert("onDecoderReady");
}
onRenderError = function() {
	alert("onRenderError");
}
stopPlayer = function() {
	Player.stopVideo();
}
setTottalBuffer = function(buffer) {
	alert("setTottalBuffer " + buffer);
}
setCurBuffer = function(buffer) {
	alert("setCurBuffer " + buffer);
}

function onEvent(event, param) {
	alert("onEvent");
	alert("event " + event);
	
	switch (event) {
	
		case 14:// OnCurrentPlayBackTime, param = playback time in ms
			alert("updateStatus " + param);
			Player.setCurTime(param);
			break;
	
		case 1:		// OnConnectionFailed
			alert("Error: Connection failed");			
			break;
			
		case 2:		// OnAuthenticationFailed
			alert("Error: Authentication failed");			
			break;
			
		case 3:		// OnStreamNotFound
			alert("Error: Stream not found");			
			break;
			
		case 4:		// OnNetworkDisconnected
			alert("Error: Network disconnected");			
			break;
			
		case 6:		// OnRenderError
			var error;
			switch (param) {
				case 1:
					error = "Unsupported container";
					break;
				case 2:
					error = "Unsupported video codec";
					break;
				case 3:
					error = "Unsupported audio codec";
					break;
				case 6:
					error = "Corrupted stream";
					break;
				default:
					error = "Unknown";
			}
			alert("Error: " + error);			
			break;
			
		case 8:		// OnRenderingComplete
			alert("End of streaming");			
			break;
			
		case 9:		// OnStreamInfoReady
			alert("updateStatus");
			Player.setTotalTime(param);
			alert(" " +Player.plugin.Execute("StartSubtitle", Player.surl));
			alert(" " +Player.plugin.Execute("SetStreamID", 5, 0));
			break;	
			
		case 11:	// OnBufferingStart
			alert("Buffering started");
			Player.onBufferingStart(param);
			break;
			
		case 12:	// OnBufferingComplete
			alert("Buffering complete");
			Player.onBufferingComplete(param);
			break;
			
		case 13:	// OnBufferingProgress, param = progress in % 
			alert("Buffering: ");
			Player.onBufferingProgress(param);
			break;
			
		case 19:	// OnSubtitle, param = subtitle string for current playing time
			alert("Subtitle");
			break;
	}
	
}