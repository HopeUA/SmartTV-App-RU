var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

function AVPlayerInit() {

    var playerInstance = webapis.avplay;
    playerInstance.getAVPlay(onAVPlayObtained, onGetAVPlayError);

    function onAVPlayObtained(avplay) {
        Main.AVPlayer = avplay;
        Main.AVPlayer.init();
    }

    function onGetAVPlayError(error) {
        // alert('#####onGetAVPlayError: ' + error.message);
    }
};

function AVPlayerRun() {
    Main.AVPlayer.open('http://live.tvhope.cdnvideo.ru/tvhope-pull/tvhope_1/playlist.m3u8|COMPONENT=HLS', {});
    Main.AVPlayer.play(onSuccessCB, onErrorCB);

    function onSuccessCB() {
        // alert('Play Success');
    }
    function onErrorCB(error) {
        // alert('Play Error' + error.message);
    }
}

var Main = {};
Main.onLoad = function() {
    this.enableKeys();
    widgetAPI.sendReadyEvent();

    AVPlayerInit();
    AVPlayerRun();
};

Main.onUnload = function() {};

Main.enableKeys = function() {
    document.getElementById('anchor').focus();
};

Main.keyDown = function() {
    var keyCode = event.keyCode;

    switch(keyCode) {
        case tvKey.KEY_RETURN:
            break;
    }
};