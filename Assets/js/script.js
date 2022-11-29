

function searchApi(query, format) {
  var locQueryUrl = "https://api.exchange.cryptomkt.com/api/3";

  if (format) {
    locQueryUrl = "https://api.exchange.cryptomkt.com/api/3" + format + "/?fo=json";
  }

  locQueryUrl = locQueryUrl + "&q=" + query;

  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        response.json().then(function (data) {
          console.log(data)
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
      .catch(function () {
        alert('Unable to connect to GitHub');
      })
    }

searchApi()
