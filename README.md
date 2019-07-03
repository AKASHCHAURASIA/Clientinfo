# Clientinfo
It is a tiny library to obtain client side data.

If you want to fingerprint browsers, you are probably also interested in other client-based information, such as screen resolution, operating system, browser type, device type, and much more.

Below are some features that make ClientInfoJS different from other fingerprinting libraries:

    It's pure native JavaScript
    It's decently lightweight at ~30 KB


## Installation

To use ClientInfoJS, simply include client.js into your website. It will generate a JavaScript Object variable (ClientInfo) which contains all the Client Side info.

![](https://github.com/AKASHCHAURASIA/Clientinfo/blob/master/Images/full.png)


## Fingerprinting

Digital fingerprints are based on device/browser settings. They allow you to make an "educated guess" about the identify of a new or returning visitor. By taking multiple data points, combining them, and representing them as a object, you can be surprisingly accurate at recognizing not only browsers and devices, but also individual users.

This is useful for identifying users or devices without cookies or sessions. It is not a full proof technique, but it has been shown to be statistically significant at accurately identifying devices. 


## Fingerprinting using Navigators

The Navigator interface represents the state and the identity of the user agent. It allows scripts to query it and to register themselves to carry on some activities.A Navigator object can be retrieved using the read-only window.navigator property.The navigator object contains information about the browser. There is no public standard that applies to the navigator object, but all major browsers support it. following are the properties of the Navigators that used to identify user hardware level info like battery info, Operating System info Etc.

### Battery Info


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

#### Result

![](https://github.com/AKASHCHAURASIA/Clientinfo/blob/master/Images/Battery.png)




### Geloaction API based




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

    var key=  ''; //use your key here


    xhttp.open("POST", "https://www.googleapis.com/geolocation/v1/geolocate?key=" + key, true);
    xhttp.send();


    }  
#### Result

![](https://github.com/AKASHCHAURASIA/Clientinfo/blob/master/Images/Geolocation2.png)

### UserMedia Devices

  	var audioInputDevices = []; // Audio Input devices (Microphones)
 	 var audioOutputDevices = []; // Audio Output Devices (Speakers)
  	var videoInputDevices = [];  // Video Input Devcies ( Camera)
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
#### Result

![](https://github.com/AKASHCHAURASIA/Clientinfo/blob/master/Images/Microphones.png)

### Gealoaction using navigator 

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
#### Result

![](https://github.com/AKASHCHAURASIA/Clientinfo/blob/master/Images/Geolocation1.png)



### Mobile Check 

  	var isMobileDevice="";
       	function checkmobile()
       {
         isMobileDevice = !!(/Android|webOS|iPhone|iPad|iPod|BB10|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent || ''));
       }
     
#### Result

![](https://github.com/AKASHCHAURASIA/Clientinfo/blob/master/Images/Mobile.png)

     

### Browser Info 

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
    
#### Result

![](https://github.com/AKASHCHAURASIA/Clientinfo/blob/master/Images/Browser.png)


 ### Operating System Info

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

#### Result

![](https://github.com/AKASHCHAURASIA/Clientinfo/blob/master/Images/OS.png)



## SOCIAL MEDIA FINGERPRINT
We used favico.ico to find the social media accounts that the client has logged into. The
<img> tag's property:
Logged in:
receives the favicon image, will load it successfully, and the onLoad
callback will be fired.
Logged out: receives the HTML of the login screen, will fail to load it as an image, and
the onError callback will be fired.
This leads to the final exploit.


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
      
### Result
If you are login on any social media using that browser then result will be,

![](https://github.com/AKASHCHAURASIA/Clientinfo/blob/master/Images/social.png)




## IP address Leaks using WebRTC

WebRTC discovers IPs via the Interactive Connectivity Establishment (ICE) protocol.
This protocol specifies several techniques for discovering IPs. The problem with
WebRTC is that it uses techniques to discover your IP addresses that are more
advanced than those used in “standard” IP detection.


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



			}
      findIP(addIP);

### Result:

ip_all array consist users Private ans Public IP addresses

![](https://github.com/AKASHCHAURASIA/Clientinfo/blob/master/Images/Webrtc.png)



 ## Local Area Network Scanning using Web-Socket

 we made use of WebRTC to extract client’s crucial information like IP address, both public and local. With the help of the local ip we can scan the local network using Websocket. WebSocket is a computer communications protocol, providing full-duplex communication channels over a single TCP connection.An example which implements the above is shown below:


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

### Result

activex_Machine array consist of all active machine on port 80 (default websocket port)

![](https://github.com/AKASHCHAURASIA/Clientinfo/blob/master/Images/Websocket.png)


## Example Usages:

User Identification and detection using this ClientInfoJS Madule

 
git clone https://github.com/AKASHCHAURASIA/Clientinfo.git
cd Clientinfo
cp -r Clientinfo /var/www/html

Go to Any Web Browser

Open the Website
http://localhost/Clientinfo/index.php

This website consist of our client js module and gathering all possible data and send it to server side and create JSON file according to USER detection. For sending server infomation to server side following peice code is used.

 	str = JSON.stringify(ClientInfo);
                     var xmlhttp = new XMLHttpRequest();
                          xmlhttp.onreadystatechange = function() {
                                  if (this.readyState == 4 && this.status == 200) {
                                          document.getElementById("main").innerHTML = this.responseText;
                                  }
                          };
                          xmlhttp.open("POST", "search.php?id="+str, true);
                         xmlhttp.send();
There is Search file which is responsible to saved the data on client side as all.json file.

search.php

	<?php

	$ip_add=$_REQUEST['id'];
  	 if(!file_exists('all_user.json'))

  	 {  file_put_contents("all_user.json","[".PHP_EOL,FILE_APPEND);}

   		file_put_contents("all_user.json",$ip_add.",".PHP_EOL,FILE_APPEND);
   
	   
	?>
		<html>
	<div> Hi this is a HoneyPot :)</div>
	</html>


#### User detection using all.josn file


There is index.php which is responsible to create Desktop.json(Normal desktop user logs),Mobile.json (Normal Mobile user Logs),Tor.json (Tor User Logs) and Proxy_VPN.json(Proxy and VPN user Logs).


index.php
		
		<?php
			$strJson = file_get_contents("../all_user.json");
	$v=rtrim(trim($strJson), ',');
	$v=$v."]";

	shell_exec('rm ../all.json');
	shell_exec('rm ../Desktop.json');
	shell_exec('rm ../Mobile.json');	
	shell_exec('rm ../Tor.json');
	shell_exec('rm ../Proxy_VPN.json');
	shell_exec('rm ../Unknown-Desktop.json');
	shell_exec('rm ../Unknown-Mobile.json');
	
	file_put_contents("../all.json",$v,FILE_APPEND);
	//Decode the JSON and convert it into an associative array.	
	$jsonDecoded = json_decode($v, true);

	$mob=0;
	$des=0;
	$vpn=0;
	$tor=0;	
	$str = file_get_contents("https://check.torproject.org/cgi-bin/TorBulkExitList.py?ip=1.1.1.1");
	preg_match_all('/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/', $str, $ip_matches);

	for($i=0; $i<count($jsonDecoded);$i++)
	{
	if(!array_key_exists("Ip_may",$jsonDecoded[$i]["Hardware"]) || !array_key_exists("Publicip",$jsonDecoded[$i]["ExternalScript"]["Webrtc"]))
	{
		if($jsonDecoded[$i]["Hardware"]["Mobile"]["Check"])
	{ $jsonencoded=json_encode($jsonDecoded[$i], true);
		JSON_create("../Unknown-Mobile.json",$jsonencoded);
	 $mob++;
	}

	else
	{
	$des++;
	$jsonencoded=json_encode($jsonDecoded[$i], true);
	JSON_create("../Unknown-Desktop.json",$jsonencoded);
		}
	}
	else if($jsonDecoded[$i]["Hardware"]["Ip_may"] == $jsonDecoded[$i]["ExternalScript"]["Webrtc"]["Publicip"])
	{if($jsonDecoded[$i]["Hardware"]["Mobile"]["Check"])
  	{
		$jsonencoded=json_encode($jsonDecoded[$i], true);
		JSON_create("../Mobile.json",$jsonencoded);
    $mob++;
  	}
	else
	{
	$des++;
	$jsonencoded=json_encode($jsonDecoded[$i], true);
	JSON_create("../Desktop.json",$jsonencoded);
	}
	}

  	else if(($jsonDecoded[$i]["Hardware"]["Ip_may"] !== $jsonDecoded[$i]["ExternalScript"]["Webrtc"]["Publicip"]))
	{
  	for($j=0;$j<count($ip_matches[0]);$j++)
  	{  if(($jsonDecoded[$i]["Hardware"]["Ip_may"]==$ip_matches[0][$i]))
         { $jsonencoded=json_encode($jsonDecoded[$i], true);
					 JSON_create("../Tor.json",$jsonencoded);
         $tor++;
			 }
		 }
	 }
	if(($jsonDecoded[$i]["Hardware"]["Ip_may"] !== $jsonDecoded[$i]["ExternalScript"]["Webrtc"]["Publicip"])) {

		 	$jsonencoded=json_encode($jsonDecoded[$i], true);
		 	JSON_create("../Proxy_VPN.json",$jsonencoded);
		   $vpn++;
		 }

 	}


	function JSON_create($fn,$jsonen){

	if(!file_exists($fn))

	{  file_put_contents($fn,"[".PHP_EOL,FILE_APPEND);}

	file_put_contents($fn,$jsonen.",".PHP_EOL,FILE_APPEND);



	}

	?>
	.... some html for front-end


There is web portal to Monitor user Json file and Log count.

open the Web portal

http://localhost/Clientinfo/Examples/index.php

here you can see the result
![](https://github.com/AKASHCHAURASIA/Clientinfo/blob/master/Images/website.png)



## LICENSE

This project is using the MIT LICENSE Version. It is included in the project source code.

