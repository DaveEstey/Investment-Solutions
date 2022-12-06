/////////// Defines the HTML elements /////////
var toggleEl = document.getElementById("cryptoStockToggle");
var dropDownEl = document.getElementById("dropDownCategory");
var contentEl = document.getElementById("content");
var modalTitle = document.getElementById("modal-title");
var modalText = document.getElementById("modal-text");
var modalSave = document.getElementById("modal-check");

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

function clearContent() {
  contentEl.innerHTML = "";
}

function clearDropDown() {
  dropDownEl.innerHTML = `<option disabled selected>
      Please select an option...
    </option>`;
}

function toggleModal() {
  var mainModal = document.getElementById("main-modal");

  if (mainModal.checked) !mainModal.checked;
}

var printCryptoCards = (data) => {
  clearContent();
  data.forEach((element) => {
    var card = document.createElement("div");
    card.innerHTML = `<div class="card w-64 bg-white shadow-xl m-5">
    <figure class="m-3"><img src="${element.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <p>${element.name}</p>
      <div class="card-actions justify-end">  
        <button class="btn btn-primary">See More</button>
      </div>
    </div>
  </div>`;
    contentEl.append(card);
  });
};

var printStockCards = (data) => {
  clearContent();
  data.forEach((element) => {
    var card = document.createElement("div");
    card.innerHTML = `<div class="card w-64 bg-white shadow-xl m-5">
    <div class="card-body">
      <h3 class="card-title">${element.name}</h3>
      <p>Ticker: ${element.ticker}</p>
      <div class="card-actions justify-end">  
        <label for="main-modal" class="btn btn-primary" id=${element.ticker}>open modal</label>
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
      modalTitle.innerHTML = "";
      modalText.innerHTML = "";
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);

          if (data.results.length > 0) {
            modalTitle.innerHTML = `<a href=${data.results[0].article_url} target= "_blank">${data.results[0].title}<a/>`
            modalText.innerHTML = data.results[0].description;
            saveInfo(data);
          } else {
            modalTitle.innerHTML = "No News Found";
            modalText.innerHTML = "No news found for this specific ticker";
          }
        });
      } else {
        modalTitle.innerHTML = "Error fetching news";
        modalText.innerHTML = `Code: ${response.status}`;
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
          printCryptoCards(data);
        });
      } else {
        var modalTitle = document.getElementById("modal-title");
        var modalText = document.getElementById("modal-text");
      }
    })
    .catch(function () {
      alert("Unable to connect to GitHub");
    });
}

///////// Query "value" from stock API /////////
function getStockApi(ticker) {
  coinPolygonReference = `https://api.polygon.io/v3/reference/tickers?type=${ticker}&market=stocks&active=true&apiKey=UAmJhIVKMGMQmJfv7Tja6hKiWkViJV6z`;

  fetch(coinPolygonReference)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          printStockCards(data.results);
        });
      } else {
        modalTitle.innerHTML = "Error fetching news";
        modalText.innerHTML = `Code: ${response.status}`;
      }
    })
    .catch(function () {
      alert("Unable to connect to GitHub");
    });
}

function getCryptoCatagories() {
  var coinGeckoApi = "https://api.coingecko.com/api/v3/coins/categories/list";

  fetch(coinGeckoApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
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
        alert("Error: " + response.statusText);
      }
    })
    .catch(function () {
      alert("Unable to connect to GitHub");
    });
}

///////// Add the Search button event listener /////////
dropDownEl.addEventListener("change", () => {
  if (!toggleEl.checked) getCryptoApi(dropDownEl.value);
  if (toggleEl.checked) getStockApi(dropDownEl.value);
});

getCryptoCatagories();

toggleEl.addEventListener("change", (event) => {
  isChecked = event.target.checked;

  clearContent();

  if (!isChecked) getCryptoCatagories();
  else getStockCategories();
});

/* function makeOptions(data) {
  //needs STYLING AND CHANGE TO OTHER INPUT FEILD
  var makeOption = [];
  if (toggleEl.checked) {
    for (var i = 0; i < data.results.length; i++) {
      makeOption = makeOption.concat(data.results[i].ticker);
    }
  } else {
    for (var i = 0; i < data.length; i++) {
      makeOption = makeOption.concat(data[i].name);
    }
    $(function () {
      $("#searchInput").autocomplete({
        source: makeOption,
      });
    });
  }
}
 */
/* function makeCatagories(cataData){
 for (var i = 0; i < resultObj.results.length; i++) {
    var result = document.createElement("div");
    result.innerHTML = resultObj.results[i].ticker;

    .appendChild(result);
  }
 } */

document.querySelector("#resetBtn").addEventListener("click", () => {
  window.location.reload(true);
});

contentEl.addEventListener("click", (event) => {
  console.log(event.target.id);
  getStockNews(event.target.id);
});

function saveInfo(data) {
      console.log(data);
      newItem = data.results[0].ticker
      localStorage.setItem(newItem, JSON.stringify(data));
    }