var Display =
{
    
}

Display.init = function()
{
    var success = true;
    
    this.statusDiv = document.getElementById("status");

    if (!this.statusDiv)
    {
        success = false;
    }
    
    return success;
}

Display.status = function(status)
{
    alert(status);
    widgetAPI.putInnerHTML(this.statusDiv, status);
}

Display.setVolume = function(level)
{
    document.getElementById("volumeBar").style.width = level + "%";
    
    var volumeElement = document.getElementById("volumeInfo");

    widgetAPI.putInnerHTML(volumeElement, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Audio.getVolume());
}

Display.hide = function()
{
    document.getElementById("main").style.display="none";
}

Display.show = function()
{
    document.getElementById("main").style.display="block";
}

