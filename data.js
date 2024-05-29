import { updateOrdersChart, updateOmzetChart, updateTransactionsChart } from './chart.js';

//Hier staat code voor het fetchen en bewerken van de data uit de db
  
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
  updateOrdersChart(counts);
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
  updateOmzetChart(revenue);
}

function countTransactions(data, view) {
  const counts = {};
  for (const item of data) {
    const date = new Date(item.TransactionDate);
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
  updateTransactionsChart(counts);
}

async function fetchDataOrder() {
  try {
    const response = await fetch('http://localhost:3000/orderDate');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

async function fetchDataOmzet() {
  try {
    const response = await fetch('http://localhost:3000/payhistory');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

export { fetchDataOrder, fetchDataOmzet, countOrdersPerYear, calculateRevenuePerYear, countTransactions };
