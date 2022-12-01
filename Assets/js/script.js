

function cryptoApi() {
  var coinGeckoApi = "https://api.coingecko.com/api/v3/coins/categories/list";

  fetch(coinGeckoApi)
    .then(function (response) {
      if (response.ok) {
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

cryptoApi();

function stockApi() {
  var coinPolygonApi = "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2020-06-01/2020-06-17?apiKey=UAmJhIVKMGMQmJfv7Tja6hKiWkViJV6z";
  console.log (coinPolygonApi)
  fetch(coinPolygonApi)
    .then(function (response) {
      console.log(response)
      if (response.ok) {
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

stockApi();
