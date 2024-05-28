import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

import { setupCounter } from './counter.js'
import Chart from 'chart.js/auto';

  document.addEventListener("DOMContentLoaded", function() {
    fetchDataOrder('year');
    fetchDataOmzet('year');
  });

  document.getElementById('viewSelect').addEventListener('change', function() {

    const yearSelect = document.getElementById('viewSelect');
   
    fetchDataOrder(yearSelect.value);
  });

  document.getElementById('viewSelectOmzet').addEventListener('change', function() {
 
    const yearSelect = document.getElementById('viewSelectOmzet');
   
    fetchDataOmzet(yearSelect.value);
  });

let myChart1 = null;
let myChart2 = null;


function updateChart(counts) {
  const ctx = document.getElementById('myChart').getContext('2d');
  if (myChart1) {
    myChart1.destroy(); // Destroy the old chart if it exists
  }
  myChart1 = new Chart(ctx, {
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
  if (myChart2) {
    myChart2.destroy(); // Destroy the old chart if it exists
  }
  myChart2 = new Chart(ctx, {
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

function countOrdersPerYear(data, view) {
  const counts = {};
  for (const item of data) {
    const date = new Date(item.order_date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const yearMonthKey = `${year}-${month}`;
    if (view === 'year') {
      if (counts[year]) {
        counts[year]++;
      } else {
        counts[year] = 1;
      }
    } else if (view === 'month') {
      if (counts[yearMonthKey]) {
        counts[yearMonthKey]++;
      } else {
        counts[yearMonthKey] = 1;
      }
    }
  }
  return counts;
}

function calculateRevenuePerYear(data, view) {
  const revenue = {};
  for (const item of data) {
    const date = new Date(item.TransactionDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const cost = Number(item.ActualCost);
    const yearMonthKey = `${year}-${month}`;
    if (!isNaN(cost)) {
      if (view === 'year') {
        if (revenue[year]) {
          revenue[year] += cost;
        } else {
          revenue[year] = cost;
        }
      } else if (view === 'month') {
        if (revenue[yearMonthKey]) {
          revenue[yearMonthKey] += cost;
        } else {
          revenue[yearMonthKey] = cost;
        }
      }
    }
  }
  return revenue;
}

async function fetchDataOrder(view, selectedYear) {
  try {
      const response = await fetch('http://localhost:3000/orderDate');
      const data = await response.json();
      const counts = countOrdersPerYear(data, view, selectedYear);
      updateChart(counts); // update the chart with the counts
  } catch (error) {
      console.error('Failed to fetch data:', error);
  }
}

async function fetchDataOmzet(view, selectedYear) {
  try {
    const response = await fetch('http://localhost:3000/payhistory');
    const data = await response.json();
    const revenue = calculateRevenuePerYear(data, view, selectedYear);
    updateChart2(revenue); // update the chart with the revenue
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}
