// data homework starter.js
var hwtable = data;

// table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // clear data
  tbody.html("");

  // loop through each object in the data
  // append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    var row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      var cell = row.append("td");
      cell.text(val);
    });
  });
}

// Keep Track of all filters
var filters = {};

function updateFilters() {

  // Save the element, value, and id of the filter that was changed
  var changedElement = d3.select(this).select("input");
  var elementValue = changedElement.property("value");
  var filterId = changedElement.attr("id");

  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object
  if (elementValue) {
    filters[filterId] = elementValue;
  }
  else {
    delete filters[filterId];
  }

  // Rebuild and show table
  filterTable();

}

function filterTable() {

  // Set the filteredData to the tableData
  let filteredData = hwtable;

  // Loop through all of the filters and keep any data and
  // match the filter values
  Object.entries(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  });

  // Rebulid table for changes made
  buildTable(filteredData);
}

// change filter for change tasks
d3.selectAll(".filter").on("change", updateFilters);

// Build the table when the page loads
buildTable(hwtable);
