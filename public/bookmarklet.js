if (typeof jQuery == 'undefined') {
  var jQ = document.createElement('script');
  jQ.type = 'text/javascript';
  jQ.onload=runthis;
  jQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
  document.body.appendChild(jQ);
} else {
  runthis();
}

function runthis() {
  var pm = document.createElement('script');
  pm.type = 'text/javascript';
  pm.onload=receive;
  pm.src = 'http://smyck.net/bookmarquis/jquery.ba-postmessage.min.js';
  document.body.appendChild(pm);

  $(document.body).append("<iframe id='smyck_bookmarklet' src='http://nine.local:3000/bookmarklet.html?auth_token=" + t + "#" + location.href +"' />");
  $('#smyck_bookmarklet').css({
    "z-index": "1000",
    "height": "400px",
    "width":  "460px",
    "position": "fixed",
    "top": "20px",
    "right": "20px",
    "border": "solid 2px #9b9b9b",
    "-moz-border-radius": "5px",
    "-webkit-border-radius": "5px",
    "border-radius": "5px"
  });
}

function receive() {
  $.receiveMessage(
    function(e){
      if (e.data == "close") {
        $("#smyck_bookmarklet").remove();
      }
    },
   'http://nine.local:3000'
  );
}

