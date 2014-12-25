import flash.external.ExternalInterface;

var props:Object = System.capabilities;
//props.screenResolutionX = System.capabilities.screenResolutionX;
//props.screenResolutionY = System.capabilities.screenResolutionY;

ExternalInterface.call("onFlashInit", props);
stop();
