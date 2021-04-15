// from data.js
var tableData = data;

// YOUR CODE HERE!
var tbody = d3.select("tbody");

// sSelect the user-input field for date
var dateSelect = d3.select("#datetime");

// select the 'Filter Table' button
var filterButton = d3.select("#filter-btn");

// select the 'Reset Table' button
var resetButton = d3.select("#reset-btn");

// Select the user-input field for city
var citySelect = d3.select("#city");

// Select the user-input field for state
var stateSelect = d3.select("#state");

// Select the user-input field for country
var countrySelect = d3.select("#country");

// Select the user-input field for shape
var shapeSelect = d3.select("#shape");


// Function to reset/populate the date selection form field
function resetForm() {
    var dates = Array.from(new Set(tableData.map(sighting => sighting.datetime)));
    var cities = Array.from(new Set(tableData.map(sighting => sighting.city))).sort(d3.ascending);
    var states = Array.from(new Set(tableData.map(sighting => sighting.state))).sort(d3.ascending);
    var countries = Array.from(new Set(tableData.map(sighting => sighting.country))).sort(d3.ascending);
    var shapes = Array.from(new Set(tableData.map(sighting => sighting.shape))).sort(d3.asending);
    
    // loop over the array to populate the form-input dropdown fields
    defaultDate = dates[0]
    dates.forEach(date => {
        var option = dateSelect.append("option");
        option.text(date);
    });

    defaultCity = cities[0]
    cities.forEach(city => {
        var option = citySelect.append("option");
        option.text(city);
    });

    defaultState = states[0]
    states.forEach(state => {
        var option = stateSelect.append("option");
        option.text(state);
    });

    defaultCountry = countries[0]
    countries.forEach(country => {
        var option = countrySelect.append("option");
        option.text(country);
    });

    defaultShape = shapes[0]
    shapes.forEach(shape => {
        var option = shapeSelect.append("option");
        option.text(shape);
    });
};


// Function to populate/reset the table to default values
function resetTable() {

    // if existing clear the current data
    clearTable();
    resetForm();
        
    // use forEach and Object.values to populate/reset the initial table-data
    tableData.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.values(sighting).forEach(value => {
            var cell = row.append("td");
            cell.text(value);
            cell.attr("class", "table-style");
        });
    });
}; //End Function

// Function to filter table-data according to user-input
function filterTable() {
    // Prevent page from refreshing
    d3.event.preventDefault();

    // capture user-input Date provided
    var inputdate = dateSelect.property("value")
    var inputcity = citySelect.property("value");
    var inputstate = stateSelect.property("value");
    var inputcountry = countrySelect.property("value");
    var inputshape = shapeSelect.property("value");

    // Copy the given data for filtering
    var filteredTableData = tableData;

    // filter table according to input-date provided
    filteredTableData = filteredTableData.filter(uSighting => uSighting.datetime == inputdate);
    filteredTableData = filteredTableData.filter(uSighting => uSighting.city == inputcity);
    filteredTableData = filteredTableData.filter(uSighting => uSighting.state == inputstate);
    filteredTableData = filteredTableData.filter(uSighting => uSighting.country == inputcountry);
    filteredTableData = filteredTableData.filter(uSighting => uSighting.shape == inputshape);
    
    // Clear contents of the table
    clearTable();

    // if 'filteredTableData' array is empty..
    if (filteredTableData.length == 0) {
        var row = tbody.text("No UFO sightings found for the selections.");
    }

    // use forEach and Object.values to populate the tbody with filtered data
    filteredTableData.forEach((sighting) => {

        // create a new row for every sighting(data-row) object
        var row = tbody.append("tr");

        // iterate through each sightings's(data-row) values to populate cells
        Object.values(sighting).forEach(value => {

            // Create new cell and append each sighting-value
            var cell = row.append("td");

            // populate the td text with the value
            cell.text(value);
            cell.attr("class", "table-style");
        });
    }); 
}; // End function


// Clear the table-contents for new data
function clearTable() {
    tbody.html("");
};

// Call the functions defined above
resetTable();
filterButton.on("click", filterTable);
resetButton.on("click", resetTable);