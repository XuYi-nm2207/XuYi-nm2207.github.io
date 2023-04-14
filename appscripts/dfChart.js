// get the data from the CSV file
fetch('https://2207-resources.s3.ap-southeast-1.amazonaws.com/Final+project+data.csv')
  .then(response => response.text())
  .then(data => {
    
    // parse the data into arrays (line chart)
    const rows = data.trim().split('\r\n');
    const column6 = [];
    const column7 = [];
    const labels = [];
    rows.forEach(row => {
      const values = row.split(',');
      if (values[5] !== '' && values[6] !== '') { // skip blank data
        column6.push(parseFloat(values[5]));
        column7.push(parseFloat(values[6]));
        labels.push(values[0]);
      }
    });

    // create the line chart
    const ctx = document.getElementById('Line Chart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Line Chart',
          data: column7,
          backgroundColor: 'rgba(95, 127, 178, 0.2)',
          borderColor: 'rgba(95, 127, 178, 1)',
          borderWidth: 1,
          pointRadius: 2,
          pointHoverRadius: 7,
          pointStyle: 'circle',
          pointBackgroundColor: 'rgba(95, 127, 178, 1)',
          pointBorderColor: 'rgba(95, 127, 178, 1)',
          pointBorderWidth: 2,
          pointHoverBackgroundColor: 'rgba(95, 127, 178, 1)',
          pointHoverBorderColor: 'rgba(95, 127, 178, 1)',
          pointHoverBorderWidth: 2,
          fill: false
        }]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Health expenditure per capita',
              fontSize: 16
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Total tests per thousand',
              fontSize: 16
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            }
          }
        }
      }
      
    });
});




//part 1 the scarterchart not finished cuz dont how to get data from local excel file 
// get the data from the CSV file
fetch('https://2207-resources.s3.ap-southeast-1.amazonaws.com/Final+project+data.csv')
  .then(response => response.text())
  .then(data => {
    
    // parse the data into arrays (scatter chart)
    const rows = data.trim().split('\r\n');
    const horizons = [];
    const verticals = [];
    const labels = [];
    rows.forEach(row => {
      const values = row.split(',');
      horizons.push(parseFloat(values[4]));
      verticals.push(parseFloat(values[7]));
      labels.push(values[0]);
    });

    // create the scatter chart
    const ctx = document.getElementById('Scatter Chart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Scatter Chart',
          data: horizons.map((value, index) => ({ x: value, y: verticals[index], label: labels[index] })),
          backgroundColor: 'rgba(95, 127, 178, 0.2)',
          borderColor: 'rgba(95, 127, 178, 1)',
          borderWidth: 1,
          pointRadius: 2,
          pointHoverRadius: 7,
          pointStyle: 'circle',
          pointBackgroundColor: 'rgba(95, 127, 178, 1)',
          pointBorderColor: 'rgba(95, 127, 178, 1)',
          pointBorderWidth: 2,
          pointHoverBackgroundColor: 'rgba(95, 127, 178, 1)',
          pointHoverBorderColor: 'rgba(95, 127, 178, 1)',
          pointHoverBorderWidth: 2,
          showLine: false
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            scaleLabel: {
              display: true,
              labelString: 'Health expenditure per capita (Logged)',
              fontSize: 16
            }
          }],
          yAxes: [{
            type: 'linear',
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: 'Total tests per thousand (Logged)',
              fontSize: 16
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].label;
            }
          }
        }
      }
      
    });



    // part2---button function, which will show the testing number from my excel datasets when user type in the name of the country  

        const button = document.getElementById('searchBtn');
        button.addEventListener('click', () => {
          // get the search term from the input field
          const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
          // search for the term in the second column of the CSV file
          let found = false;
          let expenditure = null;
          for (let i = 1; i < rows.length; i++) {
            const values = rows[i].split(',');
            const country = values[1].trim().toLowerCase();
            //console.log('Country:', country);
            //console.log('Search Term:', searchTerm);
            if (country === searchTerm) {
              expenditure = parseFloat(values[5]);
              found = true;
              break;
            }
          }

          // display the search result
          const result = document.getElementById('search-result');
          if (found) {
            result.textContent = `Health Expenditure per capita for ${searchTerm}: ${expenditure}`;
          } else {
            result.textContent = `No data found for ${searchTerm}`;
          }
        });
  });


