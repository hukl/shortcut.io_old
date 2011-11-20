if (typeof jQuery == 'undefined') {
  var jQ = document.createElement('script');
  jQ.type = 'text/javascript';
  jQ.onload=runthis;
  var protocol = (location.protocol == 'https:') ? 'https:' : 'http:';
  jQ.src = protocol + '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
  document.body.appendChild(jQ);
} else {
  runthis();
}

function runthis() {
  jQuery.noConflict();

  var pm = document.createElement('script');
  pm.type = 'text/javascript';
  pm.onload=receive;
  pm.src = 'http://smyck.net/bookmarquis/jquery.ba-postmessage.min.js';
  document.body.appendChild(pm);

  jQuery(document.body).append(
    "<iframe id='shortcut_bookmarklet' src='http://localhost:3000/bookmarklet.html?" +
    jQuery.param({"auth_token" : t, "uri" : location.href}) +"' />"
  );

  jQuery('#shortcut_bookmarklet').css({
    "z-index": "1000",
    "height": "440px",
    "width":  "460px",
    "position": "fixed",
    "top": "20px",
    "right": "20px",
    "border": "solid 2px #9b9b9b",
    "-moz-border-radius": "5px",
    "-webkit-border-radius": "5px",
    "border-radius": "5px",
    "overflow" : "hidden"
  });
}

function receive() {
  jQuery.receiveMessage(
    function(e){
      if (e.data == "close") {
        jQuery("#shortcut_bookmarklet").remove();
      } else if (e.data == "meta_data") {
        url = "http://localhost:3000/bookmarklet.html" +
              "?auth_token=" + t +
              "#" + location.href +"' />";

        jQuery.postMessage(
          "{\"page_title\" : \"" + escape(document.title) + "\", \"referrer\" : \"" + encodeURIComponent(document.referrer) + "\"}",
          url,
          jQuery('iframe#shortcut_bookmarklet').get(0).contentWindow
        )
      }
    },
   'http://localhost:3000'
  );
}

