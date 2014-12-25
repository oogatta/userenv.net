function onFlashInit(capabilities) {
  $("#flashPlayerVersion").html(capabilities.version);
  if (capabilities.isDebugger.toString() == "true") {
    $("#flashPlayerVersion").append(" (debug)");
  }
  $("#os").html(capabilities.os);
}

function createFormattedMessage() {
  var message = [
    "==============================",
    "アクセス日時: " + $.trim($("#accessDate").text()),
    "ブラウザ情報: " + $.trim($("#userAgent").text()),
    "JavaScript: " + "有効",
    "Cookie: " + $.trim($("#enableCookie").text()),
    "OS: " + $.trim($("#os").text()),
    "Flash Player のバージョン: " + $.trim($("#flashPlayerVersion").text()),
    "モニタの解像度: " + "幅 x 高さ = " + screen.width + " x " + screen.height + "px",
    "ブラウザ (描画領域) のサイズ: " + "幅 x 高さ = " + $(window).width() + " x " + $(window).height() + "px",
    "IP アドレス: "  + $.trim($("#ipAddress").text()),
    "ホスト名: "  + $.trim($("#hostName").text()),
    "=============================="
  ];
  return message.join("\r\n");
}

function getEnvText() {
  return createFormattedMessage();
}

function swfRollOverCallback(id) {
  $("#" + id).next().addClass("hover");
}

function swfRollOutCallback(id) {
  $("#" + id).next().removeClass("hover");
}

function isEnableCookie() {
  document.cookie = "userenvinfotest=userenvinfotest;";
  return (document.cookie.indexOf("userenvinfotest=userenvinfotest") >= 0);
}

$(function() {
  //below FP8 is cannot use menu
  if(!swfobject.hasFlashPlayerVersion("8")) {
    $("#menu").hide();
  }

  //set parameters

  //browser resolution
  var setBrowserResolution = function() {
    $("#browserWidth").html($(window).width() + " px");
    $("#browserHeight").html($(window).height() + " px");
  }
  setBrowserResolution();
  $(window).resize(function() {
    setBrowserResolution();
  });

  //screen resolution
  $("#screenWidth").html(screen.width + " px");
  $("#screenHeight").html(screen.height + " px");
  $("#screenColor").html(screen.colorDepth + " bit");

  if (isEnableCookie()) {
    $("#enableCookie").html("有効");
  } else {
    $("#enableCookie").html("無効");
  }

  //init menu
  $("#sendToMail a").click(function() {
    var isWindows = $("#userAgent").text().match(/Windows/);
    var subject = "Flash Player やブラウザのバージョン情報";
    var body = createFormattedMessage();
    if (isWindows) {
      subject = EscapeSJIS(subject);
      body = EscapeSJIS(body);
    } else {
      subject = EscapeUTF8(subject);
      body = EscapeUTF8(body);
    }
    location.href = "mailto:?subject=" + subject + "&body=" + body;
  });

  swfobject.embedSWF("images/env.swf", "envFlash", "1", "1", "8", null, null, {wmode: "transparent"}, null, function(event) {
    if (!event.success) {
      $("#flashPlayerVersion").html("Flash Player がインストールされていません");
      var message = "<span class='caution'>表示するには Flash Player 8 以上が必要です<" + "/span>";
      $("#os").html(message);
    }
  });

  var params = {
    menu: "false",
    scale: "noScale",
    salign: "LT",
    allowFullscreen: "true",
    allowScriptAccess: "always",
    wmode: "transparent"
  };

  var vars = {
    id: "copyToClipboardFlash"
  };

  swfobject.embedSWF("images/utils.swf", "copyToClipboardFlash", $("#copyToClipboard a").width() + 6, $("#copyToClipboard a").height() + 6, "8", null, vars, params);

});
