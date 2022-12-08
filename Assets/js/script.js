////////// Defines the HTML elements //////////
var toggleEl = document.getElementById("cryptoStockToggle");
var dropDownEl = document.getElementById("dropDownCategory");
var contentEl = document.getElementById("content");
var mainModal = document.getElementById("main-modal");
var modalTitle = document.getElementById("modal-title");
var modalText = document.getElementById("modal-text");
var modalSave = document.getElementById("modal-check");
var searchCol = document.getElementById("search-col");
var myList = document.getElementById("myList");

////////// Basic functions //////////
function clearContent() {
  contentEl.innerHTML = "";
}

function clearDropDown() {
  dropDownEl.innerHTML = `<option disabled selected>
      Please select an option...
    </option>`;
}

function updateModal(title, text) {
  modalTitle.innerHTML = title ? title : "";
  modalText.innerHTML = text ? text : "";
  mainModal.checked = true;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function toCurrency(value, decimals = 2) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
  }).format(value);
}

//////////  ///////////
function showStockResults(resultObj) {
  clearDropDown();
  resultObj.forEach((element) => {
    var result = document.createElement("option");
    result.innerHTML = element.description;
    result.setAttribute("value", element.code);

    dropDownEl.appendChild(result);
  });
}

function showCryptoResults(resultObj) {
  clearDropDown();
  for (var i = 0; i < resultObj.length; i++) {
    var result = document.createElement("option");
    result.innerHTML = resultObj[i].name;
    result.setAttribute("value", resultObj[i].category_id);

    dropDownEl.appendChild(result);
  }
}

var printCryptoCards = (data) => {
  clearContent();
  data.slice(0, 20).forEach((element) => {
    var card = document.createElement("div");
    card.innerHTML = `
      <div class="card w-64 bg-white shadow-xl m-5">
        <figure class="m-3">
          <img class="w-48" src="${element.image}" alt="Shoes" />
        </figure>
        <div class="card-body">
          <p>${element.name}</p>
          <div class="card-actions justify-end">  
            <label for="main-modal" class="btn btn-primary w-full" id=${element.id}>See More</label>
            <input
              type="checkbox"
              id="card-save"
              class="btn btn-sm btn-circle absolute right-4 bottom-3"
            />
          </div>
        </div>
      </div>
  `;
    contentEl.append(card);
    
  });
  
  var saveBtns = document.getElementById("card-save")
  
  saveBtns.addEventListener("click", (event) => {
    saveCrypto(event.target.parentElement.id(""));
  });
};

var printStockCards = (data) => {
  clearContent();
  data.slice(0, 20).forEach((element) => {
    var card = document.createElement("div");
    card.innerHTML = `
    <div class="card w-64 bg-white shadow-xl m-5">
      <div class="card-body">
        <h3 class="card-title">${element.name}</h3>
        <p>Ticker: ${element.ticker}</p>
        <div class="card-actions justify-end">  
          <label for="main-modal" class="btn btn-primary w-full" id=${element.ticker}>See More</label>
        </div>
      </div>
    </div>`;
    contentEl.append(card);
  });
};

function getStockNews(ticker) {
  var getNewsApi = `https://api.polygon.io/v2/reference/news?ticker=${ticker}&apiKey=UAmJhIVKMGMQmJfv7Tja6hKiWkViJV6z`;

  fetch(getNewsApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          if (data.results.length > 0) {
            updateModal(
              `<a href=${data.results[0].article_url} target= "_blank">${data.results[0].title}<a/>`,
              data.results[0].description
            );
            saveInfo(data);
          } else {
            updateModal("No News Found", "No news found for this specific ticker.");
          }
        });
      } else {
        updateModal("Error fetching news", `Code: ${response.status}`);
      }
    })
    .catch(function () {
      updateModal("Unable To Fetch API");
    });
}

function getCryptoInfo(ticker) {
  var getCryptoInfoApi = `https://api.coingecko.com/api/v3/simple/price?ids=${ticker}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`;

  fetch(getCryptoInfoApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          var dataArr = Object.keys(data)[0];
          const price = data[dataArr].usd;
          const marketCap = data[dataArr].usd_market_cap;
          const changeIn24 = data[dataArr].usd_24h_change;
          const volumeIn24 = data[dataArr].usd_24h_vol;

          updateModal(
            `<p> ${capitalize(ticker)}</p>`,
            `<p> Price: USD ${toCurrency(price, 4)}</p>
            <p>Market Cap: ${toCurrency(marketCap)}</p>
            <p>24h Change: <span class=${changeIn24 >= 0 ? "text-green-600" : "text-red-600"
            }>${toCurrency(changeIn24, 5)}</span></p>
            <p>24h Volume: ${toCurrency(volumeIn24)}</p>`
          );
        });
      } else {
        updateModal("Error Fetching News", `Code: ${response.status}`);
      }
    })
    .catch(function () {
      updateModal("Unable to connect to GitHub");
    });
}

function getCryptoApi(value) {
  var coinGeckoApi = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=${value}&order=market_cap_desc&per_page=10&page=1&sparkline=false`;

  fetch(coinGeckoApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          printCryptoCards(data);
        });
      } else {
      }
    })
    .catch(function () {
      updateModal("Unable to connect to GitHub");
    });
}

///////// Query "value" from stock API /////////
function getStockApi(ticker) {
  coinPolygonReference = `https://api.polygon.io/v3/reference/tickers?type=${ticker}&market=stocks&active=true&apiKey=UAmJhIVKMGMQmJfv7Tja6hKiWkViJV6z`;

  fetch(coinPolygonReference)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          printStockCards(data.results);
        });
      } else {
        updateModal("Error Fetching News", `Code: ${response.status}`);
      }
    })
    .catch(function () {
      updateModal("Unable to connect to GitHub");
    });
}

function getCryptoCategories() {
  var coinGeckoApi = "https://api.coingecko.com/api/v3/coins/categories/list";

  fetch(coinGeckoApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          showCryptoResults(data);
        });
      } else {
        updateModal("Error Fetching News", `Code: ${response.status}`);
      }
    })
    .catch(function () {
      updateModal("Unable to connect to GitHub");
    });
}

///////// Query "value" from stock API /////////
function getStockCategories() {
  polygonReference = `https://api.polygon.io/v3/reference/tickers/types?asset_class=stocks&locale=us&apiKey=UAmJhIVKMGMQmJfv7Tja6hKiWkViJV6z`;

  fetch(polygonReference)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          showStockResults(data.results);
        });
      } else {
        updateModal("Error Fetching News", `Code: ${response.status}`);
      }
    })
    .catch(function () {
      updateModal("Unable to connect to GitHub");
    });
}

///////// Add the Search button event listener /////////
dropDownEl.addEventListener("change", () => {
  if (!toggleEl.checked) getCryptoApi(dropDownEl.value);
  if (toggleEl.checked) getStockApi(dropDownEl.value);
});

toggleEl.addEventListener("change", (event) => {
  isChecked = event.target.checked;

  clearContent();

  if (!isChecked) getCryptoCategories();
  else getStockCategories();
});

document.querySelector("#resetBtn").addEventListener("click", () => {
  window.location.reload(true);
});
// NEED TO ADD CLASS TO EVERYTHING TO BE CLICKED INSTEAD OF CONTENT

contentEl.addEventListener("click", (event) => {
  if (!toggleEl.checked) getCryptoInfo(event.target.id);
  if (toggleEl.checked) getStockNews(event.target.id);

});


function saveCrypto(storeCrypto) {
  if (storeCrypto) {
    localStorage.setItem(storeCrypto, storeCrypto);
    addListItem(storeCrypto);
  }

}

function addListItem(storeCrypto) {
  var listEl = document.createElement("div");
      listEl.innerHTML = `<button class = btn btn-primary w-full  id=${storeCrypto}> ${capitalize(storeCrypto)} </button>`;
      myList.appendChild(listEl);
}

function getMyList() {

  if (localStorage) {
    var keys = Object.keys(localStorage);
    var i = keys.length;

    while (i--) {
      var listEl = document.createElement("div");
      listEl.innerHTML = `<button class = btn btn-primary w-full  id=${(localStorage.getItem(keys[i]))}> ${capitalize(localStorage.getItem(keys[i]))} </button>`;
      myList.appendChild(listEl);
    }
    myList.addEventListener("click", function (event) {
      getCryptoInfo(event.target.id)
    });
  }
}








////////// Starts the application by loading crypto categories //////////
getCryptoCategories();
getMyList()
