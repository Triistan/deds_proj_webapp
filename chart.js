import Chart from 'chart.js/auto';

//Hier staat code voor het maken/updaten van de grafieken ik gebruik graph.js 

let myChart1 = null;
let myChart2 = null;

function updateChart(counts) {
  const ctx = document.getElementById('myChart').getContext('2d');
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

function updateChart2(counts) {
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

export { updateChart, updateChart2 };