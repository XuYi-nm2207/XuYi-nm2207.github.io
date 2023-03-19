fetch('Final project data.xlsx')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => {
    // Convert the Excel file to an array of objects with "x" and "y" properties
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, {type: 'array'});
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet, {header: 1});
    const scatterData = json.map(row => ({x: row[0], y: row[1]}));
    
    // Use the scatterData to create a scatter chart
    createScatterChart(scatterData);
  });

function createScatterChart(scatterData) {
  const ctx = document.getElementById('figure2').getContext('2d');
  const scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Scatter Chart',
        data: scatterData,
        backgroundColor: 'blue'
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Scatter Chart'
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'X-axis'
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Y-axis'
          }
        }]
      },
      elements: {
        point: {
          radius: 5
        }
      }
    }
  });
}

// Get a reference to the button and input field
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

// Add a click event listener to the button
searchBtn.addEventListener('click', () => {
  // Get the value of the search input field
  const searchValue = searchInput.value;

  // Loop through the data array to find the matching country and get the corresponding number
  let number = null;
  for (let i = 0; i < data.length; i++) {
    if (data[i].country === searchValue) {
      number = data[i].number;
      break;
    }
  }

  // If a number was found, display it. Otherwise, show an error message.
  if (number) {
    alert(`The number for ${searchValue} is ${number}`);
  } else {
    alert(`Sorry, we could not find a number for ${searchValue}`);
  }
});