import flash.external.ExternalInterface;

_lockroot = true;

button.onRelease = button.onReleaseOutSide = function():Void {
  _root.copyToClipboard(ExternalInterface.call("getEnvText"));
};

button.onRollOver = function():Void {
  ExternalInterface.call("swfRollOverCallback", _root.id);
};

button.onRollOut = function():Void {
  ExternalInterface.call("swfRollOutCallback", _root.id);
};

function copyToClipboard(message:String):Void {
  System.setClipboard(message);
}

//ExternalInterface.addCallback("copyToClipboard", this, copyToClipboard);
stop();
