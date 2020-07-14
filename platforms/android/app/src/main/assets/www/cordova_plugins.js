cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-camera.Camera",
      "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "Camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverOptions",
      "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverOptions"
      ]
    },
    {
      "id": "cordova-plugin-camera.camera",
      "file": "plugins/cordova-plugin-camera/www/Camera.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "navigator.camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverHandle",
      "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverHandle"
      ]
    },
    {
      "id": "cordova-plugin-crop.CropPlugin",
      "file": "plugins/cordova-plugin-crop/www/crop.js",
      "pluginId": "cordova-plugin-crop",
      "clobbers": [
        "plugins.crop"
      ]
    },
    {
      "id": "com.virtuoworks.cordova-plugin-canvascamera.CanvasCamera",
      "file": "plugins/com.virtuoworks.cordova-plugin-canvascamera/www/CanvasCamera.js",
      "pluginId": "com.virtuoworks.cordova-plugin-canvascamera",
      "clobbers": [
        "plugin.CanvasCamera",
        "CanvasCamera"
      ]
    },
    {
      "id": "cordova-plugin-mobile-ocr.rectext",
      "file": "plugins/cordova-plugin-mobile-ocr/www/rectext.js",
      "pluginId": "cordova-plugin-mobile-ocr",
      "clobbers": [
        "textocr"
      ]
    },
    {
      "id": "cordovarduino.Serial",
      "file": "plugins/cordovarduino/www/serial.js",
      "pluginId": "cordovarduino",
      "clobbers": [
        "window.serial"
      ]
    },
    {
      "id": "com.wikitude.phonegap.wikitudeplugin.WikitudePlugin",
      "file": "plugins/com.wikitude.phonegap.wikitudeplugin/www/WikitudePlugin.js",
      "pluginId": "com.wikitude.phonegap.wikitudeplugin",
      "clobbers": [
        "WikitudePlugin"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-camera": "4.1.0",
    "cordova-plugin-crop": "0.3.1",
    "com.virtuoworks.cordova-plugin-canvascamera": "1.2.0",
    "cordova-plugin-mobile-ocr": "3.1.1",
    "cordovarduino": "0.0.10",
    "com.wikitude.phonegap.wikitudeplugin": "9.1.0"
  };
});