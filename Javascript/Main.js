var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var playerPlugin = document.getElementById("pluginPlayer");
var Main = {
	selectedVideo : 0,
	mode : 0,
	mute : 0,

	UP : 0,
	DOWN : 1,

	WINDOW : 0,
	FULLSCREEN : 1,

	NMUTE : 0,
	YMUTE : 1
}

Main.onLoad = function() {
	if (Player.init() && Audio.init() && Display.init()) {
		Display.setVolume(Audio.getVolume());

		this.enableKeys();

		widgetAPI.sendReadyEvent();

		var url = 'http://live.tvhope.cdnvideo.ru/tvhope-pull/tvhope_1/playlist.m3u8|COMPONENT=HLS';

		Player.setVideoURL(url);
		Player.playVideo();
		Display.hide();
		//Player.setFullscreen();
	} else {
		alert("Failed to initialise");
	}
}

Main.onUnload = function() {
	Player.deinit();
	Audio.deinit();
}

Main.enableKeys = function() {
	document.getElementById("anchor").focus();
}

Main.keyDown = function() {
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch (keyCode) {
	case tvKey.KEY_RETURN:
	case tvKey.KEY_PANEL_RETURN:
		alert("RETURN");
		Player.deinit();
		Audio.deinit();

		break;
	break;

case tvKey.KEY_VOL_UP:
case tvKey.KEY_PANEL_VOL_UP:
	alert("VOL_UP");
	if (this.mute == 0)
		Audio.setRelativeVolume(0);
	break;

case tvKey.KEY_VOL_DOWN:
case tvKey.KEY_PANEL_VOL_DOWN:
	alert("VOL_DOWN");
	if (this.mute == 0)
		Audio.setRelativeVolume(1);
	break;

case tvKey.KEY_MUTE:
	alert("MUTE");
	this.muteMode();
	break;

default:
	alert("Unhandled key");
	break;
}
}

Main.setMuteMode = function() {
	if (this.mute != this.YMUTE) {
		var volumeElement = document.getElementById("volumeInfo");
		Audio.plugin.Execute('SetUserMute', 1);
		document.getElementById("volumeBar").style.backgroundImage = "url(Images/videoBox/muteBar.png)";
		document.getElementById("volumeIcon").style.backgroundImage = "url(Images/videoBox/mute.png)";
		widgetAPI.putInnerHTML(volumeElement, "MUTE");
		this.mute = this.YMUTE;
	}
}

Main.noMuteMode = function() {
	if (this.mute != this.NMUTE) {
		Audio.plugin.Execute('SetUserMute', 0);
		document.getElementById("volumeBar").style.backgroundImage = "url(Images/videoBox/volumeBar.png)";
		document.getElementById("volumeIcon").style.backgroundImage = "url(Images/videoBox/volume.png)";
		Display.setVolume(Audio.getVolume());
		this.mute = this.NMUTE;
	}
}

Main.muteMode = function() {
	switch (this.mute) {
	case this.NMUTE:
		this.setMuteMode();
		break;

	case this.YMUTE:
		this.noMuteMode();
		break;

	default:
		alert("ERROR: unexpected mode in muteMode");
		break;
	}
}

Main.setFullScreenMode = function () {
    if (this.mode != this.FULLSCREEN) {
        Display.hide();
        Player.setFullscreen();
        this.mode = this.FULLSCREEN;
    }
}