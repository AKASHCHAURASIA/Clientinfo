<html>
<head>
<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>

<script>
// ip look up for public ip infomation
function ipLookUp () {
  $.ajax('http://ip-api.com/json')
  .then(
      function success(response) {
          ip_m=response.query;

      },

      function fail(data, status) {
        ip_m="can't enumerate";
      }
  );
}
ipLookUp();
</script>

<script src="client.js" >
//includes clientInfojs module
</script>


</head>
</html>
