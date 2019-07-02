
<!DOCTYPE html>

<html>
<!--<![endif]-->
<head>

<script src="script.js">

</script>

    <script src="scripts/network-scanner.js"></script>
    <script>


        if (window.ActiveX || "ActiveXObject" in window)
        {
        var acx="ActiveX Supported";

          if  ( window.external.msActiveXFilteringEnabled())
          {
            var satacx="disabled";

            }
          else
    {
      console.log("enabled");
      var La = [{ Name: "ADO Stream Object", ActiveXControl: "Adodb.Stream" }, { Name: "Adobe Acrobat Reader", ActiveXControl: "PDF.PdfCtrl" }, { Name: "Adobe Acrobat Reader", ActiveXControl: "AcroPDF.PDF" }, { Name: "Adobe Flash Player", ActiveXControl: "ShockwaveFlash.ShockwaveFlash" }, { Name: "DevalVR", ActiveXControl: "DevalVRXCtrl.DevalVRXCtrl.1" }, { Name: "Macromedia FlashPaper", ActiveXControl: "MacromediaFlashPaper.MacromediaFlashPaper" }, { Name: "Microsoft Shell UI Helper", ActiveXControl: "Shell.UIHelper" }, { Name: "Microsoft Silverlight", ActiveXControl: "AgControl.AgControl" }, { Name: "QuickTime", ActiveXControl: "QuickTime.QuickTime" }, { Name: "QuickTime", ActiveXControl: "QuickTimeCheckObject.QuickTimeCheck.1" }, { Name: "RealPlayer", ActiveXControl: "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)" }, { Name: "RealPlayer G2", ActiveXControl: "rmocx.RealPlayer G2 Control" }, { Name: "RealVideo", ActiveXControl: "RealVideo.RealVideo(tm) ActiveX Control (32-bit)" }, { Name: "Scripting.Dictionary", ActiveXControl: "Scripting.Dictionary" }, { Name: "Skype", ActiveXControl: "Skype.Detection" }, { Name: "Tabular Data Control", ActiveXControl: "TDCCtl.TDCCtl" }, { Name: "Windows Media Player", ActiveXControl: "WMPlayer.OCX" }, { Name: "XML DOM Document", ActiveXControl: "Msxml2.DOMDocument" }, { Name: "XMLHttpRequest", ActiveXControl: "Msxml2.XMLHTTP" }];
      var Sa='';
      var ya='';
      La.forEach(function (e)
      { try
         { Sa = new window.ActiveXObject(e.ActiveXControl), ya = ya + e.Name; console.log(ya);

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

     if (document.fullscreenchange)
    output.innerHTML = "fullscreenchange event fired!";

    document.addEventListener("mozfullscreenchange", function() {
      output.innerHTML = "mozfullscreenchange event fired!";
    });
    document.addEventListener("webkitfullscreenchange", function() {
      output.innerHTML = "webkitfullscreenchange event fired!";
    });
    document.addEventListener("msfullscreenchange", function() {
      output.innerHTML = "msfullscreenchange event fired!";
    });




//Browser Windows sizes
//inner
var iw =window.innerWidth;
var ih =window.innerHeight;
var ow=window.outerWidth;
var oh =window.outerHeight;

console.log(iw,"x",ih);
//check canvas
var ce = document.createElement("canvas")
    , de = ce.getContext("2d");
if (de)
{ var can="canvas supported";

}


//hostname
function GetComputerName() {
    try {
        var network = new ActiveXObject('WScript.Network');
        // Show a pop up if it works
        alert(network.computerName);
    }
    catch (e) { }
}

var ce = navigator.languages;
if (ce)
{
  console.log("languages:",ce);
}



function le() {
   ie = new Date;
   console.log(ie);
   // setInterval(le, 5000);
 }
 le();

function getOrientation(){


if (orientation === "landscape-primary") {
 console.log("That looks good. landscape");
} else if (orientation === "landscape-secondary") {
 console.log("the screen is upside down!");
} else if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
 console.log("you should rotate your device to landscape");
} else if (orientation === undefined) {
 console.log("The orientation API isn't supported in this browser :(");
}

 }
getOrientation();

function mousecheck(x) {
  console.log("mouse");
}

if ("ontouchstart" in window || window.DocumentTouch && window.document instanceof DocumentTouch || window.navigator.maxTouchPoints || window.navigator.msMaxTouchPoints)
{
var r = "Touchscreen";

}
//check for webrtc support


  var Se = ""; try { var ye = new RTCPeerConnection({ iceServers: [] })
            , ve = function () {};
        ye.createDataChannel("") }
        catch (e)
        { Se = !1, Ae = !0 }
        !1 !== Se && (ye.createOffer(ye.setLocalDescription.bind(ye), ve), ye.onicecandidate = function (e) { if (e && e.candidate && e.candidate.candidate) { var a = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(e.candidate.candidate)[1];

a.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/) && (Ae = !0, ye.onicecandidate = ve) } })
        , function ()
        {   var i = [], o = [], r = [], s = [];
navigator.mediaDevices && navigator.mediaDevices.enumerateDevices && (navigator.enumerateDevices = function (e) { var a = navigator.mediaDevices.enumerateDevices();
a && a.then ? navigator.mediaDevices.enumerateDevices().then(e).catch(function () { e([]) }) : e([]) });
var e = !1; "undefined" != typeof MediaStreamTrack && "getSources" in MediaStreamTrack ? e = !0 : navigator.mediaDevices && navigator.mediaDevices.enumerateDevices
&& (e = !0);
 var l = !1, c = !1, d = !1, D = !1, u = !1;

//media device enumerate
            function a(a) { if (e)
                        if (!navigator.enumerateDevices && window.MediaStreamTrack && window.MediaStreamTrack.getSources && (navigator.enumerateDevices = window.MediaStreamTrack.getSources.bind(window.MediaStreamTrack)), !navigator.enumerateDevices && navigator.enumerateDevices && (navigator.enumerateDevices = navigator.enumerateDevices.bind(navigator)), navigator.enumerateDevices) { i = [], o = [], r = [], u = D = d = c = l = !(s = []); var t = {};
                        navigator.enumerateDevices(function (e) { e.forEach(function (e) { var a = {}; for (var n in e) try { "function" != typeof e[n] && (a[n] = e[n]) } catch (e) {} t[a.deviceId + a.label + a.kind] ||
                        ("audio" === a.kind && (a.kind = "audioinput"), "video" === a.kind &&
                        (a.kind ="videoinput"), a.deviceId || (a.deviceId = a.id), a.id || (a.id = a.deviceId), a.label ? ("videoinput" !== a.kind || u || (u = !0),
                        "audioinput" !== a.kind || D || (D = !0)) : (a.isCustomLabel = !0, "videoinput" === a.kind ? a.label = "Camera " + (s.length + 1) : "audioinput" === a.kind ? a.label = "Microphone " + (o.length + 1) :
                        "audiooutput" === a.kind ? a.label = "Speaker " + (r.length + 1) : a.label = '&#9642; <span class="tkiyy">Unknown. Grant media permissions to detect.</span>', void 0 === p || "Chrome" !== m || 1 != N(g, ">=", "47") || /^(https:|chrome-extension:)$/g.test(location.protocol || "")
                        || "undefined" != typeof document && "string" == typeof document.domain && document.domain.search && -1 === document.domain.search(/localhost|127.0./g) && (a.label = "Unknown. HTTPS is required for this browser to detect device labels.")), "audioinput" === a.kind && (l = !0, -1 === o.indexOf(a) && o.push(a)), "audiooutput" === a.kind && (c = !0, -
                          1 === r.indexOf(a) && r.push(a)), "videoinput" === a.kind && (d = !0, -1 === s.indexOf(a) && s.push(a)), i.push(a), t[a.deviceId + a.label + a.kind] = a) }), void 0 !== p && (p.czeuj = i, p.dlxjn = l, p.aokkd = c, p.ovtta = d, p.qecpr = u, p.aitwv = D, p.ofgmq = o, p.onnqt = r, p.vbywi = s), a && a() }) } else a && a();
                else a && a() }
                 var p = window.fnocc || {};
                 browser='chrome';

            navigator.getUserMedia || navigator.mediaDevices && navigator.mediaDevices.getUserMedia, "Chrome" !== browser || 1 != N(g, ">=", "47") || /^(https:|chrome-extension:)$/g.test(location.protocol || "") || "undefined" != typeof document && "string" == typeof document.domain && document.domain.search && document.domain.search(/localhost|127.0./g), p.load = function (e) { a(e = e || function () {}) }, p.czeuj = void 0 !== i ? i : [], p.dlxjn = l, p.aokkd = c, p.ovtta = d, p.qecpr = u, p.aitwv = D, p.ofgmq = o, p.onnqt = r, p.vbywi = s, void 0 === p && (window.fnocc = {}); var n = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
            p.RTCPeerConnection = void 0 !== n && Object.keys(n.prototype), window.fnocc = p, "undefined" != typeof module && (module.exports = p), "function" == typeof define && define.amd && define("fnocc", [], function () { return p }) }(); var we = ""
        , fe = []
        , Ce = ""
        , Be = "";


navigator.geolocation.getCurrentPosition(Y, J, _);
function Y(e) { var a = e.coords.latitude // success for geolocation
        , n = e.coords.longitude
        , t = e.coords.accuracy;

        console.log("longitude:",a);
        console.log("latitude",n);
    t <= "999" ? "1" != t ? t = Math.round(1e3 * t) / 1e3 + " meters" : t += " meter" : "1" != t ? t = Math.round(1e3 * t) / 1e3 / 1e3 + " kilometers" : t += " kilometer", ID("xaudn")

       }
       function xnzpu() {  var ad='';
               setTimeout(function () { var e = document.createElement("img");
                       e.src = "https://googleads.g.doubleclick.net/favicon.ico?" + (new Date)
                           .getTime(), e.onload = function () {
                                   ad= "None detected" }, e.onerror = function () { e.src = "https://www.media.net/favicon.ico?" + (new Date)
                                   .getTime(), e.onerror = function () {ad = "Detected" },
                                    e.onload = function () {

                                     ad= "None detected" } } }, 25);
                                     return ad;
                                    }

                                    console.log("ad-blocker:",xnzpu());

function J(e) { switch ( e.code) {
           case e.PERMISSION_DENIED:
               console.log("permission denied"); break;
           case e.POSITION_UNAVAILABLE:
              console.log("POSITION_UNAVAILABLE"); break; break;
           case e.TIMEOUT:
          console.log("TIMEOUT"); break; break;
           case e.UNKNOWN_ERROR:
                console.log("UNKNOWN_ERROR")} }
       var _ = { enableHighAccuracy: !0, timeout: 50000, maximumAge: 0 };

       var isMobileDevice = !!(/Android|webOS|iPhone|iPad|iPod|BB10|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent || ''));

          var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob);

          var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
          var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1 && ('netscape' in window) && / rv:/.test(navigator.userAgent);
          var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
          var isChrome = !!window.chrome && !isOpera;
          var isIE = typeof document !== 'undefined' && !!document.documentMode && !isEdge;
          var brow="";
          if (isEdge)
          var brow= "Egde";
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
                function checkinternet() {
                  ae = document.createElement("img"),
                  setTimeout(function () { ae.src = "https://www.pool.ntp.org/static/images/favicon.ico?" + (new Date)
                                .getTime(), ae.onload = function () {

                                        internet = "Yes" },
                  ae.onerror = function () {
              ae.src = "https://github.com/favicon.ico?" + (new Date)
                                        .getTime(), ae.onload = function () {
                                                internet ="Yes" },
                  ae.onerror = function () { internet = "No" } },
                   setTimeout(function () { }, 25) }, 25); }
                   checkinternet();

                   if (window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection, !window.RTCPeerConnection) { var O = RTCPeerConnectionIFrame.contentWindow;
                                                   window.RTCPeerConnection = O.RTCPeerConnection || O.mozRTCPeerConnection || O.webkitRTCPeerConnection } window.RTCPeerConnection ? A = "Enabled" :
                                             (A = "Disabled, or blocked by browser setting(s)/extension(s).", R = !0), x = !1

                                             { A = "Not supported, or blocked by browser setting(s)/extension(s).", x = !0 }

</script>

<script>
var ip_all=[];
var ipt;
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
   	                        console.log('got ip: ', ip);
				var li = document.createElement('li');

				li.textContent = ip;
				document.getElementById("IPLeak").appendChild(li);
				saved(ip);

			}
			findIP(addIP);
 function saved(ip)
                   {

                    //scanMyNetwork(ip_all[0]);


                   }


                   var fin = {
                     Acoountlogin:social
                     ,
                     ActiveXControl: {
                       Support:acx,
                       Extension:satacx,
                       Name:ya
                      },
                     Adblocker:
                     {
                       Status: ""

                               },
                     Battery:
                     { Level: level,
                       Charging: charging,
                       Time_r:dischargingtime
                           },
                     Browser:
                     { Name: browser ,
                       Version:"",
                       Fullscreenmode:"" ,
                       BrowsermimeType:aa,


                     Plugins:a,
                     },

                   ConnectionType:
                   {
                     type:navigator.connection.effectiveType,
                     rtt:navigator.connection.rtt,
                     downlonk:navigator.connection.downlink
                   },
                   Hardware:{
                       CPU:
                       {
                         Arch:"",
                         Core:navigator.hardwareConcurrency
                       },

                       RAM:
                       {
                           Value:navigator.deviceMemory
                       },

                       Network:
                       {
                           Status:navigator.onLine,
                           Internet:internet
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

                     Graphics:
                       {
                          Driver:""
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
                     {
                       Localip: ip_all[0],
                       Publicip:ip_all[1]
                     },
                     Webgl:
                   {
                       Version:"",
                       Extension:""
                   },
                   Websocket:
                   {
                       Support:"",
                       ActiveMachine:networksc
                   },


                   Canvas:
                   {
                       Support:can,
                       Fingerprinting:""
                   }
                     }
                         };

                         var str = fin;


                          var xmlhttp = new XMLHttpRequest();
                               xmlhttp.onreadystatechange = function() {
                                       if (this.readyState == 4 && this.status == 200) {
                                               document.getElementById("main").innerHTML = this.responseText;
                                       }
                               };
                               xmlhttp.open("GET", "search.php?id="+str, true);
                              xmlhttp.send();

                  }



</script>

</head>

<body onmouseover="mousecheck(this)" class="mdl-demo mdl-color--grey-100 mdl-color-text--grey-700 mdl-base">
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header class="mdl-layout__header mdl-layout__header--scroll mdl-color--primary">
            <div class="mdl-layout--large-screen-only mdl-layout__header-row">
            </div>
            <div class="mdl-layout--large-screen-only mdl-layout__header-row">
                <h3>What C3i know about you :)</h3>
            </div>
            <div class="mdl-layout--large-screen-only mdl-layout__header-row">
            </div>
        </header>


        </div>

        <div class="mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text"><i class="material-icons" role="presentation">save</i>&nbsp;&nbsp;Software</h2></div>
            <div class="mdl-card__supporting-text">
                <b>Operating System</b>
                <div id="os"></div>
                <br>
                <b>Browser</b>
                <div id="browser"></div>
                <br>
                <b>Browser Plugins</b>
                <div id="plugins">No plugins detected.</div>
            </div>

        </div>

        <div id='socialMedia'></div>



        <div class="mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text"><i class="material-icons" role="presentation">computer</i>&nbsp;&nbsp;Hardware</h2></div>
            <div class="mdl-card__supporting-text">
                <div id="device"></div>
                <br>
                <div id="display"></div>
                <br>
                <div id="gpu"></div>
                <br>
                <div id="battery">
                    <div id="charging"></div>
                    <div id="level"></div>
                    <div id="dischargingTime"></div>
                </div>
                <div id="ambient"></div>
                <canvas id="glcanvas" width="1" height="1"></canvas>
            </div>
        </div>
        <div class="mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text"><i class="material-icons" role="presentation">wifi_tethering</i>&nbsp;&nbsp;Connection</h2></div>
            <div class="mdl-card__supporting-text">
                <div id="referrer"></div>
                <div id="connection"></div>
                <br>
                <div id="isp"></div>
                <p>
                <div id='vpn'></div>
<br>
<strong>Web RTC:</strong>
<ul id="IPLeak"></ul>
</p>


                <br>
                <div id="networkType"></div>
                <div id="speed">Performing speedtest, please wait...</div>
            </div>

        </div>
        <div class="mdl-card mdl-shadow--2dp" id="ads1">
            <div class="mdl-card__supporting-text" style="text-align: center;">




        <div class="mdl-card mdl-shadow--2dp" id="scanner">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text"><i class="material-icons" role="presentation">leak_add</i>&nbsp;&nbsp;Network Scan</h2></div>
            <div id="networkscan" class="mdl-card__supporting-text">
                Any webpage can scan your local network for devices.
                <br>
                <button onclick="scanMyNetwork(ip); document.querySelector('#progress').hidden=false;">Scan my Network</button> (A malicious website could do that without consent.)
                <br>
                <span id="progress" hidden>Scanning Network, please wait...</span>
                <br><b>Devices in your local network:</b>
                <br>
            </div>

        </div>



    <script src="scripts/iso639.js"></script>
    <script src="scripts/google-geolocation.js"></script>
    <script src="scripts/ua-parser.js"></script>
    <script src="scripts/device.js"></script>

    <script src="scripts/ip.js"></script>
    <script src="scripts/social-media.js"></script>








</body>

</html>
