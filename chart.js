import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

//Hier staat code voor het maken/updaten van de grafieken ik gebruik graph.js 

let myChart1 = null;
let myChart2 = null;
let myChart3 = null;
let myChart4 = null;

function updateOrdersChart(counts) {
  const ctx = document.getElementById('ordersChart').getContext('2d');
  if (myChart1) {
    myChart1.destroy();
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

function updateOmzetChart(counts) {
  const ctx = document.getElementById('omzetpjaar').getContext('2d');
  if (myChart2) {
    myChart2.destroy();
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

function updateTransactionsChart(counts) {
  const ctx = document.getElementById('transactionsChart').getContext('2d');
  if (myChart3) {
    myChart3.destroy();
  }
  const sortedKeys = Object.keys(counts).sort((a, b) => {
    const [yearA, monthA] = a.split('-').map(Number);
    const [yearB, monthB] = b.split('-').map(Number);
    return yearA - yearB || monthA - monthB;
  });  
  myChart3 = new Chart(ctx, {
    type: 'line',
    data: {
      labels: sortedKeys,
      datasets: [{
        label: 'Transacties per jaar',
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgb(54, 162, 235)',
        data: sortedKeys.map(key => counts[key]),
        fill: false
      }]
    },
    options: {}
  });
}

function updateCountryChart(counts) {
  const ctx = document.getElementById('countryChart').getContext('2d');
  if (myChart4) {
    myChart4.destroy();
  }
  myChart4 = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(counts),
      datasets: [{
        label: 'Orders per year',
        backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"],
        borderColor: '#000000',
        data: Object.values(counts)
      }]
    },
    options: {}
  });
}


export { updateOrdersChart, updateOmzetChart, updateTransactionsChart, updateCountryChart };
