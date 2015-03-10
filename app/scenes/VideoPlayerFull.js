function SceneVideoPlayerFull(options) {
	this.playList = [ {
		url : 'http://live.tvhope.cdnvideo.ru/tvhope-pull/tvhope_1/playlist.m3u8|COMPONENT=HLS',
		title : 'Надежда ТВ',
	} ];
}

SceneVideoPlayerFull.prototype.initialize = function() {
	alert("SceneVideoPlayerFull.initialize()");

	var items = [];
	for (var i = 0; i < this.playList.length; i++) {
		items.push(this.playList[i].title);
	}
	$("#lstVideoPlayer").sfList({
		data : items,
		index : 0,
		itemsPerPage : 8
	}).sfList('blur');
}

SceneVideoPlayerFull.prototype.handleShow = function() {
	alert("SceneVideoPlayerFull.handleShow()");

	var opt = {};
	var _THIS_ = this;
	opt.onerror = function(error, info) {
		var err = {};
		err[sf.service.VideoPlayer.ERR_NOERROR] = 'NoError';
		err[sf.service.VideoPlayer.ERR_NETWORK] = 'Network';
		err[sf.service.VideoPlayer.ERR_NOT_SUPPORTED] = 'Not Supported';
		_THIS_.printEvent('ERROR : ' + (err[error] || error)
				+ (info ? ' (' + info + ')' : ''));
	};
	opt.onend = function() {
		_THIS_.printEvent('END');
	};
	opt.onstatechange = function(state, info) {
		var stat = {};
		stat[sf.service.VideoPlayer.STATE_PLAYING] = 'Playing';
		stat[sf.service.VideoPlayer.STATE_STOPPED] = 'Stoped';
		stat[sf.service.VideoPlayer.STATE_PAUSED] = 'Paused';
		stat[sf.service.VideoPlayer.STATE_BUFFERING] = 'Buffering';
		stat[sf.service.VideoPlayer.STATE_SCANNING] = 'Scanning';

		_THIS_.printEvent('StateChange : ' + (stat[state] || state)
				+ (info ? ' (' + info + ')' : ''));
	};
	sf.service.VideoPlayer.init(opt);

	var item = this.playList[$("#lstVideoPlayer").sfList('getIndex')];
	item.fullScreen = true;
	sf.service.VideoPlayer.play(item);

	sf.service.VideoPlayer.setKeyHandler(sf.key.RETURN, function() {
		// sf.service.VideoPlayer.stop();
		sf.core.exit(false);
	});

	sf.service.VideoPlayer.setKeyHandler(sf.key.EXIT, function() {
		// sf.service.VideoPlayer.stop();
		sf.core.exit(false);
	});
}

SceneVideoPlayerFull.prototype.handleHide = function() {
	alert("SceneVideoPlayerFull.handleHide()");
}

SceneVideoPlayerFull.prototype.handleFocus = function() {
	alert("SceneVideoPlayerFull.handleFocus()");
	$("#keyhelp").sfKeyHelp({
		UPDOWN : 'Move Item',
		ENTER : 'Play',
		RETURN : 'Return'
	});
	$("#lstVideoPlayer").sfList('focus');
}

SceneVideoPlayerFull.prototype.handleBlur = function() {
	alert("SceneVideoPlayerFull.handleBlur()");
	$("#lstVideoPlayer").sfList('blur');
}

SceneVideoPlayerFull.prototype.handleKeyDown = function(keyCode) {
	alert("SceneVideoPlayerFull.handleKeyDown(" + keyCode + ")");
}

SceneVideoPlayerFull.prototype.printEvent = function(msg) {
	alert("SceneVideoPlayerFull.prototype.printEvent(" + msg + ")");
	document.getElementById("VideoPlayerEvent").innerHTML = msg + '<br>'
			+ document.getElementById("VideoPlayerEvent").innerHTML;
}