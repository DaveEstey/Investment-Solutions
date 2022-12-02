function takeInput(){
  var userInput = document.querySelector("#input");
  var formatType = document.querySelector("#format-input-type")
  var formatCategory = document.querySelector("#format-input-category")



}

function searchData(){

}


function showStockResults(resultObj) {

  var inputData = document.querySelector("#textResult");
  inputData.innerHTML = ""
  
  for (var i = 0; (i < resultObj.results.length); i++) {
    var result = document.createElement("div");
    result.innerHTML = resultObj.results[i].ticker;

    inputData.appendChild(result);
  }





}
function showCryptoResults(resultObj) {

  var inputData = document.querySelector("#textResult");
  inputData.innerHTML = ""
  
  for (var i = 0; (i < resultObj.length); i++) {
    var result = document.createElement("div");
    result.innerHTML = resultObj[i].name;

    inputData.appendChild(result);
  }





}








function cryptoApi() {
  console.log(coinGeckoApi);
  var coinGeckoApi = "https://api.coingecko.com/api/v3/coins/categories/list";

  fetch(coinGeckoApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data)
          showCryptoResults(data);
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
  coinPolygonReference = ("https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&search=" + input + "&apiKey=UAmJhIVKMGMQmJfv7Tja6hKiWkViJV6z")
  console.log(coinPolygonReference)
  fetch(coinPolygonReference)
    .then(function (response) {
      console.log(response)
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data)
          showStockResults(data);
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

