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
(function() {
    if (parser.getDevice() && parser.getDevice().name) {
      bro=parser.getDevice().name;
    }

    if (parser.getCPU() && parser.getCPU().name) {

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
