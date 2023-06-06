document.addEventListener("DOMContentLoaded", function() {
  // Data for California per capita GDP from 1995 to 2018
  const years = ["1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"];
  const gdpData = [28759, 30113, 32972, 34786, 37073, 39925, 39901, 40676, 42490, 44644, 47409, 50310, 52383, 53127, 51139, 52357, 53744, 55651, 57987, 60443, 63480, 65513, 69215, 73280	];

  // Get the canvas element
  const canvas = document.getElementById("chart1");

  // Create the chart
  const ctx = canvas.getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: years,
      datasets: [{
        label: "California Per Capita GDP",
        data: gdpData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Year"
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Per Capita GDP (USD)"
          }
        }
      }
    }
  });
});
