document.addEventListener("DOMContentLoaded", function() {
  // Data for California per capita GDP from 1995 to 2018
  const years = ["1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"];
  const wasteData = [0.819264, 0.816117, 0.863644, 0.890916, 0.867828, 0.881186, 0.899346, 0.902766, 0.983344, 0.984560, 1.030070, 1.011261, 0.951962, 0.855896, 0.746973, 0.751967, 0.773099, 0.701883, 0.712172, 0.714546, 0.788888, 0.857989, 0.907319, 0.923701];
  const sentiement = [0.697764,  0.559282, 0.881500,0.122234,0.767431, 0.573759,0.581724,0.406345,0.946060,0.511331,0.481692,1.000000,0.986791,0.838156,0.000000,0.464852,0.249012,0.263609,0.484394,0.366912,0.127425,0.521385, 0.468074,0.718447];
  // Get the canvas element
  const canvas = document.getElementById("chart2");

  // Create the chart
  const ctx = canvas.getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: years,
      datasets: [{
        label: "California Per Capita Waste",
        data: wasteData,
        fill: false,
        borderColor: "rgb(75, 75, 150)",
        tension: 0.1
      },
      {
          label: 'Normalized Sentiement Score',
          data: sentiement,
          borderColor: "rgb(75, 150, 75)",
          fill: false
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
          suggestedMin: 0,
          display: true,
          title: {
            display: true,
            text: "Tonns of Waste / Normized Sentiment Score"
          }
        }
      }
    }
  });
});
