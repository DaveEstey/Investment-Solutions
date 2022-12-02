



function showResults(resultObj) {
  var result = document.createElement('p');
  result.innerHTML = resultObj.results[1].ticker; 
  var inputData = document.querySelector("#textResult");
  inputData.append(result);
}





function cryptoApi() {
  console.log(coinGeckoApi);
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
  var coinPolygonReference = "https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&apiKey=UAmJhIVKMGMQmJfv7Tja6hKiWkViJV6z";
  var input = "Electronic" 
  coinPolygonReference = ("https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&search="+input+"&apiKey=UAmJhIVKMGMQmJfv7Tja6hKiWkViJV6z")
  console.log (coinPolygonReference)
  fetch(coinPolygonReference)
    .then(function (response) {
      console.log(response)
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data)
          showResults(data);
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

