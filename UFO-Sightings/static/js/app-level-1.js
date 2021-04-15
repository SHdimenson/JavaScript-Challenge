// from data.js
var tableData = data;

// YOUR CODE HERE!
var tbody = d3.select("tbody");

// select the user input form-field
var dateSelect = d3.select("#datetime");

// select the 'Filter Table' button
var filterButton = d3.select("#filter-btn");

// select the 'Reset Table' button
var resetButton = d3.select("#reset-btn");

// Function to reset/populate the date selection form field
function resetForm() {
    var dates = Array.from(new Set(tableData.map(sighting => sighting.datetime)));
    defaultDate = dates[0]
    dates.forEach(date => {
        var option = dateSelect.append("option");
        option.text(date);
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

    // Copy the actual data for filtering
    var filteredTableData = tableData;

    // filter table according to input-date provided
    filteredTableData = filteredTableData.filter(uSighting => uSighting.datetime == inputdate);
    
    // Clear contents of the table
    clearTable();

    // if 'filteredTableData' array is empty..
    if (filteredTableData.length == 0) {
        var row = tbody.text("No UFO sightings found for given date.");
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


