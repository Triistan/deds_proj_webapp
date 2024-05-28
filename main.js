import './style.css';
import 'chartjs-adapter-date-fns';
import { fetchDataOrder, fetchDataOmzet, countOrdersPerYear, calculateRevenuePerYear, countTransactions } from './data.js';

//Standaard main js bestand waar alles samen komt

let orderData;
let omzetData;

document.addEventListener("DOMContentLoaded", async function() {
  orderData = await fetchDataOrder();
  omzetData = await fetchDataOmzet();

  countOrdersPerYear(orderData, 'year');
  calculateRevenuePerYear(omzetData, 'year');
  countTransactions(omzetData, 'year');
});

document.getElementById('viewSelect').addEventListener('change', async function() {
  const yearSelect = document.getElementById('viewSelect').value;
  countOrdersPerYear(orderData, yearSelect);
});

document.getElementById('viewSelectOmzet').addEventListener('change', async function() {
  const yearSelect = document.getElementById('viewSelectOmzet').value;
  calculateRevenuePerYear(omzetData, yearSelect);
});

document.getElementById('viewSelectTransactions').addEventListener('change', async function() {
  const yearSelect = document.getElementById('viewSelectTransactions').value;
  countTransactions(omzetData, yearSelect);
});
