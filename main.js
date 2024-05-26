import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

import { setupCounter } from './counter.js'
import Chart from 'chart.js/auto';



document.addEventListener("DOMContentLoaded", function() {
   fetchData();
});


function updateChart(counts) {
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: Object.keys(counts),
          datasets: [{
              label: 'Orders per year',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: Object.values(counts)
          }]
      },
      options: {}
  });
}

function updateChart2(counts) {
  const ctx = document.getElementById('omzetpjaar').getContext('2d');
  const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: Object.keys(counts),
          datasets: [{
              label: 'Omzet per jaar',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: Object.values(counts)
          }]
      },
      options: {}
  });
}

function countOrdersPerYear(data) {
  const counts = {};
  for (const item of data) {
      const year = new Date(item.order_date).getFullYear(); // changed from item.orderDate
      if (counts[year]) {
          counts[year]++;
      } else {
          counts[year] = 1;
      }
  }
  return counts;
}

function calculateRevenuePerYear(data) {
  const revenue = {};
  for (const item of data) {
    const year = new Date(item.TransactionDate).getFullYear();
    const cost = Number(item.ActualCost);
    if (!isNaN(cost)) {
      if (revenue[year]) {
        revenue[year] += cost;
      } else {
        revenue[year] = cost;
      }
    }
  }
  return revenue;
}

async function fetchData() {
  try {
      const response = await fetch('http://localhost:3000/orderDate');
      const data = await response.json();
      const counts = countOrdersPerYear(data);
      updateChart(counts); // update the chart with the counts
  } catch (error) {
      console.error('Failed to fetch data:', error);
  }
  try {
    const response = await fetch('http://localhost:3000/payhistory');
    const data = await response.json();
    const revenue = calculateRevenuePerYear(data);
    updateChart2(revenue); // update the chart with the revenue
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

// fetchData()


