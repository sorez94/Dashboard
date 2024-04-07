/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

function configs(labels, datasets) {
  return {
    data: {
      labels,
      datasets: [
        {
          label: datasets.label,
          tension: 0,
          pointRadius: 5,
          pointBorderColor: "transparent",
          pointBackgroundColor: "rgba(7,7,7,0.8)",
          borderColor: "rgba(7,7,7,0.8)",
          borderWidth: 4,
          backgroundColor: "transparent",
          fill: true,
          data: datasets.data,
          maxBarThickness: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
            color: "rgba(124,120,120,0.6)",
          },
          ticks: {
            display: true,
            color: "#0a0a0a",
            padding: 10,
            font: {
              size: 14,
              weight: 300,
              family: "Vazirmatn",
              style: "normal",
              lineHeight: 1.5,
            },
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            color: "#090909",
            padding: 10,
            font: {
              size: 12,
              family: "Vazirmatn",
              style: "bold",
              lineHeight: 2,
            },
          },
        },
      },
    },
  };
}

export default configs;
