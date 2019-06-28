var networksc=[];
var social=[];
var a =  [];
var aa = [];
var charging='';
var dischargingtime='';
var level="";
var internet="";
var bro="";
var web_s;
var orientation = screen.msOrientation || screen.mozOrientation || (screen.orientation || {}).type;

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
      networksc=[];
        networkScanner.scan(subnet, function(ip, alive, i) {
            progress= 'Scanning ' + subnet + (i + 1)+' - 255';

            if (alive) {

                networksc.push(ip);
            }
        }, function() {
            progress.style.display = 'none';
        }, 5000);
    })
}

var bn;
var parser = new UAParser();
var o_s;
var o_v;
var ven;
var render;
var ve_r;
var dis;
var ip_check;
var sp;
var isPrivate=false;
var gl;
var arch;


(function() {
    if (parser.getDevice() && parser.getDevice().name) {
      bro=parser.getDevice().name;
    }

    if (parser.getCPU() && parser.getCPU().name) {

  }
function getarch()
{
var a=navigator.platform
arch=a;
}
setInterval(function(){
    bn=parser.getBrowser().version;
    o_s=parser.getOS().name;
    o_v=parser.getOS().version; gp();
  getMimetypes();
getPlugins(); detectPrivateMode(); },60000);

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
var tr;
if(navigator.getBattery){
  tr=true;
}

 if(tr){    navigator.getBattery().then(function(battery) {
        // Update the battery status initially when the promise resolves ...
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
            sp="supported";
            ven=gl.getParameter(extension.UNMASKED_VENDOR_WEBGL);
            render=gl.getParameter(extension.UNMASKED_RENDERER_WEBGL);
        } else {
            ven = gl.getParameter(gl.VENDOR);
            render = gl.getParameter(gl.RENDERER);
                  ve_r= gl.getParameter(gl.VERSION);
                }
         //gpu.innerHTML += "Shading language: " + gl.getParameter(gl.SHADING_LANGUAGE_VERSION) + '<br/>';

        //gpu.innerHTML += "Extensions: " + gl.getSupportedExtensions();

    }

dis=window.screen.width + ' x ' + window.screen.height + ' - ' + window.screen.colorDepth + 'bits/pixel';
    /* Plugins */
}
    function getPlugins() {

        try {
            for (var i = 0; i < navigator.plugins.length; i++) {

                sa = {   Name:navigator.plugins[i].name,
                     Description:navigator.plugins[i].description,
                     Filename:navigator.plugins[i].filename
                 }
                 a.push(sa);
             }
            return a;
        } catch (e) {
            return null;
        }
    }

        function getMimetypes() {

            try {
                for (var i = 0; i < navigator.mimeTypes.length; i++) {

                    saa = {   Type:navigator.mimeTypes[i].type,
                         suffixes:navigator.mimeTypes[i].suffixes,
                         Description:navigator.mimeTypes[i].description
                     }
                     aa.push(saa);
                 }
                return aa;
            } catch (e) {
                return null;

            }
}

}())

(function(){
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



  setInterval( function(){ networks.forEach(function(network) {
        var img = document.createElement('img');
        img.src = network.url;
        social=[];
        img.onload = function() {


          social.push(network.name);
        };
        img.onerror = function() {


           // print(network.name + ': not logged in');
        };
    });},60000);
}());
</script>
<script type="application/javascript">
  function getIP(json) {
  ip_check=json.ip;
  }

var typ;
var rtt;
var link;
var acx="";
var satacx="";
var ya="";
//Active x
function activex()
    {  if (window.ActiveX || "ActiveXObject" in window)
      {
      acx="ActiveX Supported";

        if  ( window.external.msActiveXFilteringEnabled())
        {
          satacx="disabled";

          }
        else
  { satacx="enabled"
    var La = [{ Name: "ADO Stream Object", ActiveXControl: "Adodb.Stream" }, { Name: "Adobe Acrobat Reader", ActiveXControl: "PDF.PdfCtrl" }, { Name: "Adobe Acrobat Reader", ActiveXControl: "AcroPDF.PDF" }, { Name: "Adobe Flash Player", ActiveXControl: "ShockwaveFlash.ShockwaveFlash" }, { Name: "DevalVR", ActiveXControl: "DevalVRXCtrl.DevalVRXCtrl.1" }, { Name: "Macromedia FlashPaper", ActiveXControl: "MacromediaFlashPaper.MacromediaFlashPaper" }, { Name: "Microsoft Shell UI Helper", ActiveXControl: "Shell.UIHelper" }, { Name: "Microsoft Silverlight", ActiveXControl: "AgControl.AgControl" }, { Name: "QuickTime", ActiveXControl: "QuickTime.QuickTime" }, { Name: "QuickTime", ActiveXControl: "QuickTimeCheckObject.QuickTimeCheck.1" }, { Name: "RealPlayer", ActiveXControl: "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)" }, { Name: "RealPlayer G2", ActiveXControl: "rmocx.RealPlayer G2 Control" }, { Name: "RealVideo", ActiveXControl: "RealVideo.RealVideo(tm) ActiveX Control (32-bit)" }, { Name: "Scripting.Dictionary", ActiveXControl: "Scripting.Dictionary" }, { Name: "Skype", ActiveXControl: "Skype.Detection" }, { Name: "Tabular Data Control", ActiveXControl: "TDCCtl.TDCCtl" }, { Name: "Windows Media Player", ActiveXControl: "WMPlayer.OCX" }, { Name: "XML DOM Document", ActiveXControl: "Msxml2.DOMDocument" }, { Name: "XMLHttpRequest", ActiveXControl: "Msxml2.XMLHTTP" }];
    var Sa='';
    ya='';
    La.forEach(function (e)
    { try
       { Sa = new window.ActiveXObject(e.ActiveXControl), ya = ya + e.Name;

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
var fulls="";
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
       function con()
       {
         if(navigator.connection)
         {
           typ=navigator.connection.effectiveType;
                  rtt=navigator.connection.rtt;
           link=navigator.connection.downlink;

         }
       }

var iw ="";
var ih ="";
var ow="";
var oh ="";
function wins(){
//Browser Windows sizes
//inner
iw =window.innerWidth;
ih =window.innerHeight;
ow=window.outerWidth;
oh =window.outerHeight;


}
//check canvas
var can="";
function canvascheck()

{
var ce = document.createElement("canvas")
  , de = ce.getContext("2d");
if (de)
{
can="canvas supported";
}
}
var loc;
function loc() {

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {

    if (xhttp.readyState == 4 && xhttp.status == 200) {
        var geolocation = JSON.parse(xhttp.responseText).location;
        loc = geolocation.lat + ',' + geolocation.lng;



    }

};



var key=  'AIzaSyBdS4niOVhS9SHFBNh3VhYg-XdGwqSuwrA';

xhttp.open("POST", "https://www.googleapis.com/geolocation/v1/geolocate?key=" + key, true);
xhttp.send();


}

loc();

var host1="";
function GetComputerName() {
  try {
      var network = new ActiveXObject('WScript.Network');
      // Show a pop up if it works
      host1=network.computerName;
  }
  catch (e) { host1="can not enamurate"}
}


var ce="";
//languages
function languages()
{
ce = navigator.languages;
}


var ie="";
function localt() {
 ie = new Date;

}

var or="";
//
if(document.getElementById('tHUAfsKIkGno')){
ads=false;
} else {
ads=true;
}

function getOrientation(){

var orientation = screen.msOrientation || screen.mozOrientation || (screen.orientation || {}).type;

if (orientation === "landscape-primary") {
or="That looks good. landscape";
} else if (orientation === "landscape-secondary") {
or=("the screen is upside down!");
} else if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
or=("you should rotate your device to landscape");
} else if (orientation === undefined) {
or=("The orientation API isn't supported in this browser :(");
}

}
var ms="";
function mousecheck(x) {
ms="mouse";
}
var r="";
function touchscreen() {


if ("ontouchstart" in window || window.DocumentTouch && window.document instanceof DocumentTouch || window.navigator.maxTouchPoints || window.navigator.msMaxTouchPoints)
{
r = "Touchscreen";

}
}



var longitude="";
var pr="";
var latitude="";
navigator.geolocation.getCurrentPosition(Y, J, _);
function Y(e) { var a = e.coords.latitude // success for geolocation
      , n = e.coords.longitude
      , t = e.coords.accuracy;

      longitude=a;
      latitude=n;

     }

function J(e) { switch ( e.code) {
         case e.PERMISSION_DENIED:
             pr= "permission denied"; break;
         case e.POSITION_UNAVAILABLE:
            pr="POSITION_UNAVAILABLE"; break; break;
         case e.TIMEOUT:
         pr="TIMEOUT"; break; break;
         case e.UNKNOWN_ERROR:
              pr=("UNKNOWN_ERROR");} }
     var _ = { enableHighAccuracy: !0, timeout: 50000, maximumAge: 0 };
var isMobileDevice="";
   function checkmobile()
   {
     isMobileDevice = !!(/Android|webOS|iPhone|iPad|iPod|BB10|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent || ''));
}

var brow="";

function brows(){
        var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob);

        var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1 && ('netscape' in window) && / rv:/.test(navigator.userAgent);
        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        var isChrome = !!window.chrome && !isOpera;
        var isIE = typeof document !== 'undefined' && !!document.documentMode && !isEdge;

        if (isEdge)
         brow= "Egde";
      else  if (isOpera)
         brow= "Opera";
        else  if (isFirefox)
          brow= "Firefox";
          else  if (isSafari)
            brow= "Safari";
            else  if (isChrome)
              brow= "Chrome";
            else  if (isIE)
              brow= "Internet Explorer";
            }


                 var A="";
                 var isWebRTCSupported = false;


function checkwebrtc(){
['RTCPeerConnection', 'webkitRTCPeerConnection', 'mozRTCPeerConnection', 'RTCIceGatherer'].forEach(function(item) {
if (isWebRTCSupported) {
return;
}

if (item in window) {
isWebRTCSupported = true;
A="enabled";
}
});

}
checkwebrtc();

var ip_all=[];
var ipt;
var fin;
var str;
    function findIP(onNewIP) {
      var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      var pc = new myPeerConnection({iceServers: [{urls: "stun:172.17.232.40:3478"}]}),
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

function saved()

                 {
                   if(ip_all.length==2){

          if(ip_all[0].match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/))
{
               //scanMyNetwork(ip_all[0]);
}
else  if(ip_all[1].match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/))
{

//scanMyNetwork(ip_all[1]);
}
}

setInterval(function()  {
activex();
navigator.geolocation.getCurrentPosition(Y, J, _);
checkmobile();
brows();
con();
wins();
getOrientation();
if(satacx=="enabled")
{
  GetComputerName();
}

canvascheck();
mousecheck();
touchscreen();
localt();
languages();

   fin = {
                   Acoountlogin:social
                   ,
                   ActiveXControl: {
                     Support:acx,
                     Extension:satacx,
                     Name:ya
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
                     BrowsermimeType:aa,
                     Cookie:navigator.cookieEnabled,
                     Screen:window.screen,
                     useragent:navigator.userAgent,
                     windowsize:{
                       innerw:iw,
                       outerw:ow,
                       innerh:ih,
                       outerh:ow,
                     },
                     Plugins:a,
                   },

                 ConnectionType:
                 {
                   type:typ,
                   rtt:rtt,
                   downlonk:link
                 },
                 Hardware:{
                   Mobile:{
                     Check:isMobileDevice,
                   },
                  Ip_may:ip_check,
                   Geolocation:{error:pr,
                 longitud:longitude,
               latitud:latitude},
val:loc,
                   Mouse:
                   {
                     Status:ms
                   },
                  Touchscreen:{
                    Status:r
                  },
                    OS:{
                      name:o_s,
                      version:o_v
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
                     ie,
                   Microphones:
                   [
                     {
                       Numberof:"",
                       Permission:"",
                       Label1:"",
                       Label2:""
                     }
                   ],
                  Speakers:
                  [
                    {
                      Numberof:"",
                      Permission:"",
                      Label1:"",
                      Label2:""
                    }
                  ],
                  Webcams:
                     {
                       Status:""
                     },

                   GPU:
                     {  Vendor:ven,
                        Renderer:render,
                        Display:dis,
                        Version:ve_r
                     },
                   DiviceOrientation:
                   {
                       Direction:orientation
                   },
                   Hostname:
                   {
                       Name:""
                   }
                 },
                   ExternalScript:
                 {
                   Webrtc:
                   { support:A,
                     Localip: ip_all[0],
                     Publicip:ip_all[1]
                   },
                   Webgl:
                 {  Support:sp,
                    Version:ve_r

                 },
                 Websocket:
                 {
                     Support:web_s,
                     ActiveMachine:networksc
                 },


                 Canvas:
                 {
                     Support:can,

                 }
                   }
                      };

                   str = JSON.stringify(fin);


                        var xmlhttp = new XMLHttpRequest();
                             xmlhttp.onreadystatechange = function() {
                                     if (this.readyState == 4 && this.status == 200) {
                                             document.getElementById("main").innerHTML = this.responseText;
                                     }
                             };
                             xmlhttp.open("GET", "search.php?id="+str, true);
                            xmlhttp.send();
},5000);
}
