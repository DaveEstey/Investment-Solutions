function takeInput() {
  var userInput = document.querySelector("#input");
  var formatType = document.querySelector("#format-input-type");
  var formatCategory = document.querySelector("#format-input-category");
}

function searchData() { }

function showStockResults(resultObj) {
  var contentEl = document.getElementById("content");
  contentEl.innerHTML = `<textarea class="textarea h-full w-full" placeholder="Bio">${JSON.stringify(
    resultObj
  )}</textarea>`;

  /*   for (var i = 0; i < resultObj.results.length; i++) {
    var result = document.createElement("div");
    result.innerHTML = resultObj.results[i].ticker;

    .appendChild(result);
  } */
}
function showCryptoResults(resultObj) {
  var inputData = document.querySelector("#textResult");
  inputData.innerHTML = "";

  for (var i = 0; i < resultObj.length; i++) {
    var result = document.createElement("div");
    result.innerHTML = resultObj[i].name;

    inputData.appendChild(result);
  }
}

function cryptoApi() {
  var input = "music";
  var coinGeckoApi =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=" +
    input +
    "&order=market_cap_desc&per_page=10&page=1&sparkline=false";

  fetch(coinGeckoApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          showCryptoResults(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function () {
      alert("Unable to connect to GitHub");
    });
}

// cryptoApi();

function stockApi() {
  var coinPolygonReference =
    "https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&apiKey=UAmJhIVKMGMQmJfv7Tja6hKiWkViJV6z";
  var input = "Electronic";
  coinPolygonReference =
    "https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&search=" +
    input +
    "&apiKey=UAmJhIVKMGMQmJfv7Tja6hKiWkViJV6z";
  console.log(coinPolygonReference);
  fetch(coinPolygonReference)
    .then(function (response) {
      console.log(response);
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          showStockResults(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function () {
      alert("Unable to connect to GitHub");
    });
}

function getCryptoApi(value) {
  var coinGeckoApi = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=${value}&order=market_cap_desc&per_page=10&page=1&sparkline=false`;

  fetch(coinGeckoApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          showStockResults(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function () {
      alert("Unable to connect to GitHub");
    });
}

///////// Query "value" from stock API /////////
function getStockApi(value) {
  coinPolygonReference = `https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&search=${value}&apiKey=UAmJhIVKMGMQmJfv7Tja6hKiWkViJV6z`;

  fetch(coinPolygonReference)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          showStockResults(data);
          makeOptions(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function () {
      alert("Unable to connect to GitHub");
    });
}

///////// Defines the HTML elements /////////
var toggleEl = document.getElementById("cryptoStockToggle");
var searchEl = document.getElementById("searchBtn");
var searchInputEl = document.getElementById("searchInput");

///////// Add the Search button event listener /////////
searchEl.addEventListener("click", () => {
  if (toggleEl.checked) getStockApi(searchInputEl.value);
  if (!toggleEl.checked) getCryptoApi(searchInputEl.value);
});


function makeOptions(data) { //needs STYLING AND CHANGE TO OTHER INPUT FEILD
  var makeOption = [];
  for (var i = 0; i < data.results.length; i++) {
   makeOption = makeOption.concat(data.results[i].ticker);
  }
  $(function () {
    $("#searchInput").autocomplete({
      source: makeOption
    });
  });
}


document.querySelector('#resetBtn').addEventListener('click', () => {
  window.location.reload(true);
  });


