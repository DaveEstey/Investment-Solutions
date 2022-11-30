

function searchApi() {
  var locQueryUrl = "https://api.coingecko.com/api/v3/coins/categories/list";

  fetch(locQueryUrl)
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

searchApi();
