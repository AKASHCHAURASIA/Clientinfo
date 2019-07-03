// Last Updated On: 2019-06-30

// ________________
// ClineInfoJs v1.0.0

// https://github.com/AKASHCHAURASIA/ClientInfo

// --------------------------------------------------
// AKASH CHAURASIA AND SHIVANGI SHUKLA
// MIT License   - https://github.com/AKASHCHAURASIA/Clientinfo/blob/master/LICENSE
// --------------------------------------------------
  var active_Machine=[];                // Active Machine in Local Area Network
  var social=[];                        // Social Accounts Logged in
  var plugins =  [];                    // Browser Plugins
  var memetypes = [];                   // Browser Memetypes
  var charging='';                      // Charging Status
  var dischargingtime='';               // Discharrging Time in hours
  var level="";                         // Battery Current Level in Percentage
  var internet="";                      // InternetStatus
  var browser="";                       // Browser Name
  var web_socket_status;                // Web Socket Status
  var ads;                              // Ad blocker status


// Local Area Network Scan Using Web Socket
window.networkScanner = (function() {

    function scan(ipPrefix, i, callback, finishedCallback) {
        var intID_ws;
        var start_time_ws = Date.now();
        var closetimeout = 1200;
        var opentimeout = 2500;
        var process_port_ws = false;

        function websocket_scan(hostname) {

            if ("WebSocket" in window) {
              web_s="Supported";
                ws_scan = new WebSocket("ws://" + hostname);

            }
            if ("MozWebSocket" in window) {
                ws_scan = new MozWebSocket("ws://" + hostname);
                web_s="Supported";

            }

            //var interval = (new Date).getTime() - start_time_ws;

            intID_ws = setInterval(
                function() {
                    var interval = Date.now() - start_time_ws;

                    if (process_port_ws) {
                        clearInterval(intID_ws);
                        return;
                    }
                    if (ws_scan.readyState === 3) // CLOSE
                    {
                        clearInterval(intID_ws);
                        process_port_ws = true;
                        if (interval < closetimeout) {
                            done(false);
                        } else {
                            done(true);
                        }
                    }

                    if (interval >= opentimeout) {
                        clearInterval(intID_ws);
                        process_port_ws = true;

                        done(false);
                    }
                    return;
                }, 1);
        }


        function done(alive) {
            if (ws_scan) {
                ws_scan.close();
                ws_scan = undefined;
            }
            // clearInterval(intID_ws);
            callback(ipPrefix + i, alive, i)
            if (i < 254) {
                scan(ipPrefix, i + 1, callback, finishedCallback);
            } else {
                if (finishedCallback) {
                    finishedCallback();
                }
            }
        }

        websocket_scan(ipPrefix + i);
    }

    return {
        scan: function(ipPrefix, callback, finishedCallback) {
            scan(ipPrefix, 1, callback, finishedCallback);
        }
    }
}())
  function scanMyNetwork(myIp) {
      var regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\./;
      var subnet = myIp.match(regex)[0];

      //wait 5s before we start, so there's less noise in the background
      setTimeout(function() {
        active_Machine=[];
          networkScanner.scan(subnet, function(ip, alive, i) {
              progress= 'Scanning ' + subnet + (i + 1)+' - 255';

              if (alive) {

                  active_Machine.push(ip);
              }
          }, function() {
              progress.style.display = 'none';
          }, 5000);
      })
  }


  var BrowserVersion;             //Browser Version
//  var parser = new UAParser();    // User agent parser
  var osname;                     // operating system name
  var osversion;                  // operating system VERSION
  var vender;                     // Graphics Driver vender
  var render;                     // Graphics Driver Info
  var webgl_version;              // webgl version
  var display;                    // System display info
  var ip_check;                   // Public ip check
  var support;                    // webgl support
  var isPrivate=false;            // Brower Private Window status
  var arch;                       // System Architecture;




function getarch()
{
  var a=navigator.platform;
  arch=a;
}


function detectPrivateMode() {

  try {

          if (window.webkitRequestFileSystem) {
              window.webkitRequestFileSystem(
                  window.TEMPORARY, 1,
                  function() {
                      isPrivate = false;
                  },
                  function(e) {
                      isPrivate = true;
                  }
              );
          } else if (window.indexedDB && /Firefox/.test(window.navigator.userAgent)) {
              var db;
              try {
                  db = window.indexedDB.open('test');
                  db.onerror = function() {
                      return true;
                  };
              } catch (e) {
                  isPrivate = true;
              }

              if (typeof isPrivate === 'undefined') {
                  retry(
                      function isDone() {
                          return db.readyState === 'done' ? true : false;
                      },
                      function next(isTimeout) {
                          if (!isTimeout) {
                              isPrivate = db.result ? false : true;
                          }
                      }
                  );
              }
          } else if (isIE10OrLater(window.navigator.userAgent)) {
              isPrivate = false;
              try {
                  if (!window.indexedDB) {
                      isPrivate = true;
                  }
              } catch (e) {
                  isPrivate = true;
              }
          } else if (window.localStorage && /Safari/.test(window.navigator.userAgent)) {
              try {
                  window.localStorage.setItem('test', 1);
              } catch (e) {
                  isPrivate = true;
              }

              if (typeof isPrivate === 'undefined') {
                  isPrivate = false;
                  window.localStorage.removeItem('test');
              }
          }

      } catch (e) {
          isPrivate = false;
      }


  }
      function updateBatteryStatus(battery) {
               charging=battery.charging ? 'charging' : 'not charging';
              level =(Math.round(battery.level * 10000) / 100) + '%';
          if (!battery.charging) {
                dischargingtime=battery.dischargingTime === Infinity ? 'Infinity' : (Math.round(100 * battery.dischargingTime / 3600) / 100) + 'h';
          } else {
                  dischargingtime=battery.chargingTime === Infinity ? 'Infinity' : (Math.round(100 * battery.chargingTime / 3600) / 100) + 'h';
          }
      }

function getbattery(){
try {
     navigator.getBattery().then(function(battery) {
          // Update the battery status initially
          updateBatteryStatus(battery);

          // .. and for any subsequent updates.
          battery.onchargingchange = function() {
              updateBatteryStatus(battery);
          };
          battery.onlevelchange = function() {

              updateBatteryStatus(battery);
          };

          battery.ondischargingtimechange = function() {
              updateBatteryStatus(battery);
          };
      });
    }

    catch(e) {   }
  }

var gl;
      /* GPU */
      function gp(){
      var canvas = document.getElementById("glcanvas");
      try {
          gl = canvas.getContext("experimental-webgl");
          gl.viewportWidth = canvas.width;
          gl.viewportHeight = canvas.height;
      } catch (e) {}
      if (gl) {

          var extension = gl.getExtension('WEBGL_debug_renderer_info');

          if (extension != undefined) {
              support="supported";
              vender=gl.getParameter(extension.UNMASKED_VENDOR_WEBGL);
              render=gl.getParameter(extension.UNMASKED_RENDERER_WEBGL);
          } else {
              vender = gl.getParameter(gl.VENDOR);
              render = gl.getParameter(gl.RENDERER);
                    webgl_version= gl.getParameter(gl.VERSION);
                  }


      }

  display=window.screen.width + ' x ' + window.screen.height + ' - ' + window.screen.colorDepth + 'bits/pixel';

  }
//--------------------------------------------------
  /* Plugins */
      function getPlugins() {

          try { plugins=[];
              for (var i = 0; i < navigator.plugins.length; i++) {

                  sa = {   Name:navigator.plugins[i].name,
                       Description:navigator.plugins[i].description,
                       Filename:navigator.plugins[i].filename
                   }
                   plugins.push(sa);
               }
              return plugins;
          } catch (e) {
              return null;
          }
      }

          function getMimetypes() {

              try { memetypes=[];
                  for (var i = 0; i < navigator.mimeTypes.length; i++) {

                      saa = {   Type:navigator.mimeTypes[i].type,
                           suffixes:navigator.mimeTypes[i].suffixes,
                           Description:navigator.mimeTypes[i].description
                       }
                       memetypes.push(saa);
                   }
                  return memetypes;
              } catch (e) {
                  return null;

              }
  }


  	var networks = [{
          url: "https://squareup.com/login?return_to=%2Ffavicon.ico",
          name: "Square"
      }, {
          url: "https://www.instagram.com/accounts/login/?next=%2Ffavicon.ico",
          name: "Instagram"
      }, {
          url: "https://twitter.com/login?redirect_after_login=%2Ffavicon.ico",
          name: "Twitter"
      }, {
          url: "https://www.facebook.com/login.php?next=https%3A%2F%2Fwww.facebook.com%2Ffavicon.ico%3F_rdr%3Dp",
          name: "Facebook"
      }, {
          url: "https://accounts.google.com/ServiceLogin?passive=true&continue=https%3A%2F%2Fwww.google.com%2Ffavicon.ico&uilel=3&hl=de&service=youtube",
          name: "Google"
      },, {
          url: "https://plus.google.com/up/accounts/upgrade/?continue=https://plus.google.com/favicon.ico",
          name: "Google Plus"
      }, {
          url: "https://login.skype.com/login?message=signin_continue&redirect_uri=https%3A%2F%2Fsecure.skype.com%2Ffavicon.ico",
          name: "Skype"
      }, {
          url: "https://www.flickr.com/signin/yahoo/?redir=https%3A%2F%2Fwww.flickr.com/favicon.ico",
          name: "Flickr"
      }, {
          url: "https://www.spotify.com/de/login/?forward_url=https%3A%2F%2Fwww.spotify.com%2Ffavicon.ico",
          name: "Spotify"
      }, {
          url: "https://www.reddit.com/login?dest=https%3A%2F%2Fwww.reddit.com%2Ffavicon.ico",
          name: "Reddit"
      }, {
          url: "https://www.tumblr.com/login?redirect_to=%2Ffavicon.ico",
          name: "Tumblr"
      }, {
          url: "https://www.expedia.de/user/login?ckoflag=0&selc=0&uurl=qscr%3Dreds%26rurl%3D%252Ffavicon.ico",
          name: "Expedia"
      }, {
          url: "https://www.dropbox.com/login?cont=https%3A%2F%2Fwww.dropbox.com%2Fstatic%2Fimages%2Ficons%2Ficon_spacer-vflN3BYt2.gif",
          name: "Dropbox"
      }, {
          url: "https://www.amazon.com/ap/signin/178-4417027-1316064?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=10000000&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Ffavicon.ico",
          name: "Amazon"
      }, {
          url: "https://www.pinterest.com/login/?next=https%3A%2F%2Fwww.pinterest.com%2Ffavicon.ico",
          name: "Pinterest"
      }, {
          url: "https://www.netflix.com/Login?nextpage=%2Ffavicon.ico",
          name: "Netflix"
      }, {
          url: "https://de.foursquare.com/login?continue=%2Ffavicon.ico",
          name: "Foursquare"
      }, {
          url: "https://eu.battle.net/login/de/index?ref=http://eu.battle.net/favicon.ico",
          name: "Battle.net"
      }, {
          url: "https://store.steampowered.com/login/?redir=favicon.ico",
          name: "Steam"
      }, {
          url: "https://www.academia.edu/login?cp=/favicon.ico&cs=www",
          name: "Academia.edu"
      }, {
          url: "https://stackoverflow.com/users/login?ssrc=head&returnurl=http%3a%2f%2fstackoverflow.com%2ffavicon.ico",
          name: "Stack Overflow"
      },, {
          url: "https://accounts.google.com/ServiceLogin?service=blogger&hl=de&passive=1209600&continue=https://www.blogger.com/favicon.ico",
          name: "Blogger"
      }];


  //     Do not work because they do not immediately redirect
  //     {
  //         url: "https://login.live.com/login.srf?wa=wsignin1.0&wreply=https%3A%2F%2Fprofile.microsoft.com%2FregsysProfilecenter%2FImages%2FLogin.jpg",
  //         name: "Microsoft"
  //     }, {
  //         url: "https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2Ffavicon.ico%3Fid%3D1",
  //         name: "Github"
  //     }, {
  //         url: "https://slack.com/signin?redir=%2Ffavicon.ico",
  //         name: "Slack"
  //     }, {
  //         url: "https://tablet.www.linkedin.com/splash?redirect_url=https%3A%2F%2Fwww.linkedin.com%2Ffavicon.ico%3Fgid%3D54384%26trk%3Dfulpro_grplogo",
  //         name: "Linkedin"
  //     }



    function social_login(){
      networks.forEach(function(network)
      {
          var img = document.createElement('img');
          img.src = network.url;
  				social=[];
          img.onload = function() {
  					social.push(network.name);
          };
          img.onerror = function() {



          };
      });}


var type;                    //Nework connection Type
var rtt;                     // Network Connnection round trip time
var downlink;                // Network Downlink
var acx="";                  // ActiveX Support Check
var activeX_status="";       // ActiveX Enabled or Disabled
var AcXName="";
//Active x
function activex()
      {  if (window.ActiveX || "ActiveXObject" in window)
        {
        acx="ActiveX Supported";

          if  ( window.external.msActiveXFilteringEnabled())
          {
            activeX_status="disabled";

            }
          else
    { activeX_status="enabled"
      var La = [{ Name: "ADO Stream Object", ActiveXControl: "Adodb.Stream" }, { Name: "Adobe Acrobat Reader", ActiveXControl: "PDF.PdfCtrl" }, { Name: "Adobe Acrobat Reader", ActiveXControl: "AcroPDF.PDF" }, { Name: "Adobe Flash Player", ActiveXControl: "ShockwaveFlash.ShockwaveFlash" }, { Name: "DevalVR", ActiveXControl: "DevalVRXCtrl.DevalVRXCtrl.1" }, { Name: "Macromedia FlashPaper", ActiveXControl: "MacromediaFlashPaper.MacromediaFlashPaper" }, { Name: "Microsoft Shell UI Helper", ActiveXControl: "Shell.UIHelper" }, { Name: "Microsoft Silverlight", ActiveXControl: "AgControl.AgControl" }, { Name: "QuickTime", ActiveXControl: "QuickTime.QuickTime" }, { Name: "QuickTime", ActiveXControl: "QuickTimeCheckObject.QuickTimeCheck.1" }, { Name: "RealPlayer", ActiveXControl: "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)" }, { Name: "RealPlayer G2", ActiveXControl: "rmocx.RealPlayer G2 Control" }, { Name: "RealVideo", ActiveXControl: "RealVideo.RealVideo(tm) ActiveX Control (32-bit)" }, { Name: "Scripting.Dictionary", ActiveXControl: "Scripting.Dictionary" }, { Name: "Skype", ActiveXControl: "Skype.Detection" }, { Name: "Tabular Data Control", ActiveXControl: "TDCCtl.TDCCtl" }, { Name: "Windows Media Player", ActiveXControl: "WMPlayer.OCX" }, { Name: "XML DOM Document", ActiveXControl: "Msxml2.DOMDocument" }, { Name: "XMLHttpRequest", ActiveXControl: "Msxml2.XMLHTTP" }];
      var Sa='';
      AcXName='';
      La.forEach(function (e)
      { try
         { Sa = new window.ActiveXObject(e.ActiveXControl), AcXName = AcXName + e.Name;

         }
         catch (e)
          {
            va += 1;
          }
        })
    }
    }
    else
    {
      acx="ActiveX NOT Supported";

    }
  }
var fulls="";                           //fullScreen
//fullscreencheck
function fullscreeninfo()
{
     if (document.fullscreenchange)
    fulls = "fullscreenchange event fired!";

    document.addEventListener("mozfullscreenchange", function() {
      fulls = "mozfullscreenchange event fired!";
    });
    document.addEventListener("webkitfullscreenchange", function() {
      fulls = "webkitfullscreenchange event fired!";
    });
    document.addEventListener("msfullscreenchange", function() {
      fulls = "msfullscreenchange event fired!";
    });

}
/*connection infomation*/
         function con()
         {
           if(navigator.connection)
           {
             type=navigator.connection.effectiveType;
                    rtt=navigator.connection.rtt;
             downlink=navigator.connection.downlink;

           }
         }


         /* Browser Windows sizes */

var iw ="";                        // innner width
var ih ="";                        // inner height
var ow="";                         // outer width
var oh ="";                        // outer height
function wins()
{

iw = window.innerWidth;
ih = window.innerHeight;
ow = window.outerWidth;
oh = window.outerHeight;
}
//check canvas
var canvas="";
//canzas support

function canvascheck()
{
  var ce = document.createElement("canvas")
    , de = ce.getContext("2d");
if (de)
{
  canvas="canvas supported";
  var can = document.createElement('canvas');
  can.id = "glcanvas";
  var b = document.getElementsByTagName("body")[0];
  b.appendChild(can);
}
}

var location_api;      // location api based
function loc()
{

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {

      if (xhttp.readyState == 4 && xhttp.status == 200) {
          var geolocation = JSON.parse(xhttp.responseText).location;
          location_api = geolocation.lat + ',' + geolocation.lng;



      }

  };



  var key=  'AIzaSyBdS4niOVhS9SHFBNh3VhYg-XdGwqSuwrA'; //api for Geolocation

  xhttp.open("POST", "https://www.googleapis.com/geolocation/v1/geolocate?key=" + key, true);
  xhttp.send();


}



var hostname="";// Hostname

function GetComputerName() {
    try {
        var network = new ActiveXObject('WScript.Network');
        // Show a pop up if it works
        hostname=network.computerName;
    }
    catch (e) { hostname="can not enamurate"}
}


var language_support="";  // Language

// languages

function languages()
{
 language_support = navigator.languages;
}

var Local_time="";
function localt() {
                                // local system time
   Local_time = new Date;

 }

var orientation_value="";                     //device orientation
var ads;
function  adblockerdetect()
{

  var head= document.getElementsByTagName('head')[0];
  var script= document.createElement('script');
  script.type= 'text/javascript';
  script.src= 'scripts/ads.js';
  head.appendChild(script);
  script.onload= function () {
     { ads=false;}}
     script.onerror=function () {
        { ads=true;}


  }

}


function getOrientation(){

var orientation = screen.msOrientation || screen.mozOrientation || (screen.orientation || {}).type;

if (orientation === "landscape-primary") {
 orientation_value="That looks good. landscape";
} else if (orientation === "landscape-secondary") {
 orientation_value=("the screen is upside down!");
} else if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
 orientation_value=("you should rotate your device to landscape");
} else if (orientation === undefined) {
 orientation_value=("The orientation AP_valueI isn't supported in this browser :(");
}

 }
var mouse_status="No";      // Mouse Status
function mousecheck(x) {
  mouse_status="yes";
}
var touchscreen_status="NO";        // Touchscreen Status
function touchscreen() {


if ("ontouchstart" in window || window.DocumentTouch && window.document instanceof DocumentTouch || window.navigator.maxTouchPoints || window.navigator.msMaxTouchPoints)
{
touchscreen = "Yes";
}
}

var audioInputDevices = []; // Audio Input devices (Microphones)
var audioOutputDevices = []; // Audio Output Devices (Speakers)
var videoInputDevices = [];  // Video Input Devcies ( Camera)
var sam=[];
var er=[];                 // error checking
function devie()
{
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
  dev = "enumerateDevices not supported.";

}
audioInputDevices=[];
audioOutputDevices=[];
videoInputDevices=[];
// List cameras and microphones.
try {
navigator.mediaDevices.enumerateDevices()
.then(function(devices) {
  devices.forEach(function(device) {

      if(device.kind=="audioinput")
      {

          audioInputDevices.push({DeviceType:device.kind ,DeviceLabel:device.label ,DeviceId:device.deviceId});
      }
      if(device.kind=="audiooutput")
      {

          audioOutputDevices.push({DeviceType:device.kind ,DeviceLabel:device.label ,DeviceId:device.deviceId});
      }
      if(device.kind=="videoinput")
      {

          videoInputDevices.push({DeviceType:device.kind ,DeviceLabel:device.label ,DeviceId:device.deviceId});
      }


  });
})
.catch(function(err) {
  er=err.name + ": " + err.message;
});
}

catch(e){}

}

/* Gealoaction Through navigators */

var longitude="";               // longitude
var pr="";                      // permission
var latitude="";                // latitude
function geolocate()
{

try {
navigator.geolocation.getCurrentPosition(Y, J, _);

}
catch(e){

}

function Y(e) { var a = e.coords.latitude // success for geolocation
        , n = e.coords.longitude
        , t = e.coords.accuracy;

        longitude=a;
        latitude=n;

       }

function J(e) { switch ( e.code) {       // geolocation errors
           case e.PERMISSION_DENIED:
               pr= "permission denied"; break;
           case e.POSITION_UNAVAILABLE:
              pr="POSITION_UNAVAILABLE"; break; break;
           case e.TIMEOUT:
           pr="TIMEOUT"; break; break;
           case e.UNKNOWN_ERROR:
                pr=("UNKNOWN_ERROR");} }
       var _ = { enableHighAccuracy: !0, timeout: 50000, maximumAge: 0 };

}

/* Mobile Check */

var isMobileDevice="";
     function checkmobile()
     {
       isMobileDevice = !!(/Android|webOS|iPhone|iPad|iPod|BB10|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent || ''));
     }

/* Browsers */

var brow="";

function brows(){
          var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob);

          var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
          var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1 && ('netscape' in window) && / rv:/.test(navigator.userAgent);
          var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
          var isChrome = !!window.chrome && !isOpera;
          var isIE = typeof document !== 'undefined' && !!document.documentMode && !isEdge;

   var nVer = navigator.appVersion;
   var nAgt = navigator.userAgent;
   var fullVersion = '' + parseFloat(navigator.appVersion);
   var majorVersion = parseInt(navigator.appVersion, 10);
   var nameOffset, verOffset, ix;

   // In Opera, the true version is after 'Opera' or after 'Version'
   if (isOpera) {
       brow = 'Opera';
       try {
           fullVersion = navigator.userAgent.split('OPR/')[1].split(' ')[0];
           majorVersion = fullVersion.split('.')[0];
       } catch (e) {
           fullVersion = '0.0.0.0';
           majorVersion = 0;
       }
   }
   // In MSIE version <=10, the true version is after 'MSIE' in userAgent
   // In IE 11, look for the string after 'rv:'
   else if (isIE) {
       verOffset = nAgt.indexOf('rv:');
       if (verOffset > 0) { //IE 11
           fullVersion = nAgt.substring(verOffset + 3);
       } else { //IE 10 or earlier
           verOffset = nAgt.indexOf('MSIE');
           fullVersion = nAgt.substring(verOffset + 5);
       }
       brow = 'IE';
   }
   // In Chrome, the true version is after 'Chrome'
   else if (isChrome) {
       verOffset = nAgt.indexOf('Chrome');
       brow = 'Chrome';
       fullVersion = nAgt.substring(verOffset + 7);
   }
   // In Safari, the true version is after 'Safari' or after 'Version'
   else if (isSafari) {
       // both and safri and chrome has same userAgent
       if (nAgt.indexOf('CriOS') !== -1) {
           verOffset = nAgt.indexOf('CriOS');
           brow = 'Chrome';
           fullVersion = nAgt.substring(verOffset + 6);
       } else if (nAgt.indexOf('FxiOS') !== -1) {
           verOffset = nAgt.indexOf('FxiOS');
           brow = 'Firefox';
           fullVersion = nAgt.substring(verOffset + 6);
       } else {
           verOffset = nAgt.indexOf('Safari');

           brow = 'Safari';
           fullVersion = nAgt.substring(verOffset + 7);

           if ((verOffset = nAgt.indexOf('Version')) !== -1) {
               fullVersion = nAgt.substring(verOffset + 8);
           }

           if (navigator.userAgent.indexOf('Version/') !== -1) {
               fullVersion = navigator.userAgent.split('Version/')[1].split(' ')[0];
           }
       }
   }
   // In Firefox, the true version is after 'Firefox'
   else if (isFirefox) {
       verOffset = nAgt.indexOf('Firefox');
       brow = 'Firefox';
       fullVersion = nAgt.substring(verOffset + 8);
   }

   // In most other browsers, 'name/version' is at the end of userAgent
   else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
       brow = nAgt.substring(nameOffset, verOffset);
       fullVersion = nAgt.substring(verOffset + 1);

       if (brow.toLowerCase() === brow.toUpperCase()) {
           brow = navigator.appName;
       }
   }

   if (isEdge) {
       brow = 'Edge';
       fullVersion = navigator.userAgent.split('Edge/')[1];
       // fullVersion = parseInt(navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)[2], 10).toString();
   }

   // trim the fullVersion string at semicolon/space/bracket if present
   if ((ix = fullVersion.search(/[; \)]/)) !== -1) {
       fullVersion = fullVersion.substring(0, ix);
   }

   majorVersion = parseInt('' + fullVersion, 10);

   if (isNaN(majorVersion)) {
       fullVersion = '' + parseFloat(navigator.appVersion);
       majorVersion = parseInt(navigator.appVersion, 10);
}


    bn=fullVersion;
  }
function osinfo()
{
  var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry|BB10/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    },
    getOsName: function() {
        if (isMobile.Android()) {
            osname = 'Android';
        }

        if (isMobile.BlackBerry()) {
            osname = 'BlackBerry';
        }

        if (isMobile.iOS()) {
            osname = 'iOS';
        }

        if (isMobile.Opera()) {
            osname = 'Opera Mini';
        }

        if (isMobile.Windows()) {
            osname = 'Windows';
        }

        return osname;
    }
}
var unknown = '-';

        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;

        var clientStrings = [{
            s: 'Chrome OS',
            r: /CrOS/
        }, {
            s: 'Windows 10',
            r: /(Windows 10.0|Windows NT 10.0)/
        }, {
            s: 'Windows 8.1',
            r: /(Windows 8.1|Windows NT 6.3)/
        }, {
            s: 'Windows 8',
            r: /(Windows 8|Windows NT 6.2)/
        }, {
            s: 'Windows 7',
            r: /(Windows 7|Windows NT 6.1)/
        }, {
            s: 'Windows Vista',
            r: /Windows NT 6.0/
        }, {
            s: 'Windows Server 2003',
            r: /Windows NT 5.2/
        }, {
            s: 'Windows XP',
            r: /(Windows NT 5.1|Windows XP)/
        }, {
            s: 'Windows 2000',
            r: /(Windows NT 5.0|Windows 2000)/
        }, {
            s: 'Windows ME',
            r: /(Win 9x 4.90|Windows ME)/
        }, {
            s: 'Windows 98',
            r: /(Windows 98|Win98)/
        }, {
            s: 'Windows 95',
            r: /(Windows 95|Win95|Windows_95)/
        }, {
            s: 'Windows NT 4.0',
            r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
        }, {
            s: 'Windows CE',
            r: /Windows CE/
        }, {
            s: 'Windows 3.11',
            r: /Win16/
        }, {
            s: 'Android',
            r: /Android/
        }, {
            s: 'Open BSD',
            r: /OpenBSD/
        }, {
            s: 'Sun OS',
            r: /SunOS/
        }, {
            s: 'Linux',
            r: /(Linux|X11)/
        }, {
            s: 'iOS',
            r: /(iPhone|iPad|iPod)/
        }, {
            s: 'Mac OS X',
            r: /Mac OS X/
        }, {
            s: 'Mac OS',
            r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
        }, {
            s: 'QNX',
            r: /QNX/
        }, {
            s: 'UNIX',
            r: /UNIX/
        }, {
            s: 'BeOS',
            r: /BeOS/
        }, {
            s: 'OS/2',
            r: /OS\/2/
        }, {
            s: 'Search Bot',
            r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
        }];
        for (var i = 0, cs; cs = clientStrings[i]; i++) {
            if (cs.r.test(nAgt)) {
                osname = cs.s;
                break;
            }
        }



        if (/Windows/.test(osname)) {
            if (/Windows (.*)/.test(os)) {
                osversion = /Windows (.*)/.exec(os)[1];
            }
            osname = 'Windows';
        }

        switch (osname) {
            case 'Mac OS X':
                if (/Mac OS X (10[\.\_\d]+)/.test(nAgt)) {
                    osname = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                }
                break;
            case 'Android':
                if (/Android ([\.\_\d]+)/.test(nAgt)) {
                    osversion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                }
                break;
            case 'iOS':
                if (/OS (\d+)_(\d+)_?(\d+)?/.test(nAgt)) {
                    osversion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                    osversion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                }
                break;
}

}



var isWebRTCSupported = false;
var WebRTC_status="Disabled";

function checkwebrtc(){
try {
['RTCPeerConnection', 'webkitRTCPeerConnection', 'mozRTCPeerConnection', 'RTCIceGatherer'].forEach(function(item) {
if (isWebRTCSupported) {
return;
}

if (item in window) {
isWebRTCSupported = true;
WebRTC_status="enabled";
}
});
}
catch(e){

}
}
if(typeof ip_m==='undefined') // if not defined
var ip_m="";
var ip_all=[];
var str;
var pub; //Public ip
var local; // Local ip
			function findIP(onNewIP) {
				var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
				var pc = new myPeerConnection({iceServers: [{urls: "stun:stun.l.google.com:19302"}]}),
				noop = function() {},
				localIPs = {},
				ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
				key;

				function ipIterate(ip) {
					if (!localIPs[ip]) onNewIP(ip);
					localIPs[ip] = true;
				}

				pc.createDataChannel("");

				pc.createOffer(function(sdp) {
					sdp.sdp.split('\n').forEach(function(line) {
						if (line.indexOf('candidate') < 0) return;
						line.match(ipRegex).forEach(ipIterate);
					});
					pc.setLocalDescription(sdp, noop, noop);
				}, noop);

				pc.onicecandidate = function(ice) {
					if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
					ice.candidate.candidate.match(ipRegex).forEach(ipIterate);
				};
      }

			function addIP(ip) {

	       ip_all.push(ip);

            saved();

			}
      findIP(addIP);
       saved();

 function saved()

                   {

                     if (typeof ip_all[0]!== 'undefined'){
                     if(ip_all[0].match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/))
          {
            local=ip_all[0];


                         scanMyNetwork(ip_all[0]);
          }
          else if(!(ip_all[0].match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)) && ip_all[0]!="0.0.0.0")
             { pub=ip_all[0];}

         }
         if (typeof ip_all[1]!== 'undefined'){
         if(ip_all[1].match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/))
{
local=ip_all[1];

             scanMyNetwork(ip_all[1]);
}
else if(!(ip_all[1].match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)) && ip_all[1]!="0.0.0.0")
 pub=ip_all[1];

}

/* gathering data in every 5 sec */
setInterval(function()  {
activex();
loc();
geolocate();
checkmobile();
brows();
osinfo();
social_login();
con();
wins();
checkwebrtc();
getOrientation();
adblockerdetect();
getbattery();
  if(activeX_status=="enabled")
  {
    GetComputerName();
  }
canvascheck();
mousecheck();
touchscreen();
devie();
localt();
languages();
gp();
  getMimetypes();
  getPlugins();
  detectPrivateMode();
     ClientInfo = {
                     Acoountlogin:social
                     ,
                     ActiveXControl: {
                       Support:acx,
                       Extension:activeX_status,
                       Name:AcXName,
                       Hostname:hostname
                      },
                     Adblocker:
                     {
                       Status: ads

                               },
                     Battery:
                     { Level: level,
                       Charging: charging,
                       Time_r:dischargingtime
                           },
                     Browser:
                     { Name: brow ,
                       Version:bn,
                       Fullscreenmode:fulls ,
                       Private:isPrivate,
                       BrowsermimeType:memetypes,
                       Cookie:navigator.cookieEnabled,
                       Screen:window.screen,
                       useragent:navigator.userAgent,
                       windowsize:{
                         innerw:iw,
                         outerw:ow,
                         innerh:ih,
                         outerh:ow,
                       },
                       Plugins:plugins,
                     },

                   ConnectionType:
                   {
                     type:type,
                     rtt:rtt,
                     downlink:downlink
                   },
                   Hardware:{
                     Mobile:{
                       Check:isMobileDevice,
                     },

                   Geolocation:{error:pr,
                   longitud:longitude,
                 latitud:latitude},
Geolocation_api_based:location_api,
                     Mouse:
                     {
                       Status:mouse_status,
                     },
                    Touchscreen:{
                      Status:touchscreen_status
                    },
                      OS:{
                        name:osname,
                        version:osversion
                      },
                       CPU:
                       {
                          arch:navigator.platform,
                          Core:navigator.hardwareConcurrency
                       },

                       RAM:
                       {
                           Value:navigator.deviceMemory
                       },

                       Network:
                       {
                           InternetStatus:navigator.onLine,

                       },
                       LocalSystime:
                       Local_time,
                     Microphones:audioInputDevices,
                    Speakers:audioOutputDevices,
                    Webcams:
                       {
                         Value:videoInputDevices,
                       },

                     GPU:
                       {  Vendor:vender,
                          Renderer:render,
                          Display:display,
                          Version:webgl_version
                       },
                     DiviceOrientation:
                     {
                         Direction:orientation_value
                     },
                     Hostname:
                     {
                         Name:hostname,
                     }
                   },
                     ExternalScript:
                   {
                     Webrtc:
                     { support:WebRTC_status,
                       Localip: local,
                       Publicip:pub
                     },
                     Webgl:
                   {  Support:support,
                      Version:webgl_version

                   },
                   Websocket:
                   {
                       Support:web_socket_status,
                       ActiveMachine:active_Machine
                   },


                   Canvas:
                   {
                       Support:canvas,

                   }
                     }
                        };



},5000);
}
