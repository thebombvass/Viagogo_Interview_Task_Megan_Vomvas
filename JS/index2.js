$(document).ready(function() {
  //leave this here until you're done so you have it
  console.log(json.Items);

  //** Global Variable Declarations */

  //I'd just rather cut to the chase here and work with an array
  const eventData = json.Items;

  // ** Function Declarations */

  //function to convert prices in pounds to prices in dollars
  //Accepts string of price in pounds and returns string of price in dollars
  function poundsToDollars(poundsPrice, conversionRate) {
    dollarAmount = (parseInt(poundsPrice.slice(1)) * conversionRate).toFixed(2);

    return "$" + dollarAmount.toString();
  }

  //function to iterate through the event data and using string interpolation to create html for a list of events
  //accepts array of event data from Viagogo API
  function fillEventData(data, conversionRate) {
    //filling in table of data
    let listFiller = "";

    data.forEach(elem => {
      //ternary conditional is used to add promotional messages if applicable. This avoids having multiple if statements with repetitive code
      listFiller += `<li class="list-group-item hidden m-3 eventItem ${
        elem.VenueCity
      }"><div class="row">
                  <div class="col-3"><h6>${elem.Date}</h6><p>${elem.Day} | ${
        elem.Time
      }</p></div>
                  <div class="col-6">
                      <h5>${
                        elem.EventName
                      } at <u data-toggle="popover" title="Location: ${
        elem.VenueCity
      }" data-content="Description: ${elem.VenueDescription}">${
        elem.VenueName
      }</u></h5>
                      <p>${elem.VenueCity}, ${elem.VenueCountryCode}</p>
                      <p id="alertMessages">${
                        elem.IsCheapestCity
                          ? '<i class="fas fa-search-dollar"></i> ' +
                            elem.IsCheapestCityContent +
                            "<br>"
                          : ""
                      } ${
        elem.IsLastDateInCity
          ? '<i class="fas fa-exclamation-circle"></i> Last Day in City!'
          : ""
      }</p>
                  </div>
                  <div class="col-3"><button class="btn btn-dark">Get Tickets Now<br>starting at ${poundsToDollars(
                    elem.MinPrice,
                    conversionRate
                  )}</button><p id="lowStockMessage">${
        elem.HeadingTowardsLimitedStockMessage
          ? "<br>" + elem.HeadingTowardsLimitedStockMessage
          : " "
      }</p></div>
              </div></li>`;
    });

    return listFiller;
  }

  //function to fill the dropdown of Cities in City Filter
  function createCityDropDown(data) {
    let results = `<a class="dropdown-item cityChosen" id="All">All</a>`;
    data.forEach(elem => {
      results += `<a class="dropdown-item cityChosen" id=${elem.VenueCity}>${elem.VenueCity}</a>`;
    });
    return results;
  }

  //function to filter results by city
  function FilterResults(city) {
    if (city == "All") {
      $(".eventItem").show();
    } else {
      $(".eventItem").hide();
      $(`.${city}`).show();
    }
  }

  //** Function Calls */

  //filling the cities dropdown filter
  $("#cityDropDown").html(createCityDropDown(eventData));

  // Getting current converstion rate for pounds to dollars using https://exchangeratesapi.io/ API from European Central Bank.
  $.get("https://api.exchangeratesapi.io/latest?base=GBP", function(data) {
    multiplier = data.rates.USD;
    //injecting list of events html created about into the ul element
    $("#eventList").html(fillEventData(eventData, multiplier));

    //initializing popovers on venue title
    $(function() {
      $('[data-toggle="popover"]').popover();
    });

    //filling in the dropdown filter with cities
    createCityDropDown(eventData);

    //adding an event listener to each of our dropdown items that will trigger the function to filter our results by location
    $(".cityChosen").click(function() {
      city = $(this).attr("id");
      FilterResults(city);
    });
  });

  //jQuery doc end - don't write below this
});
