import './style.css';
import 'chartjs-adapter-date-fns';
import { fetchDataOrder, fetchDataOmzet,fetchDataCountry, countOrdersPerYear, calculateRevenuePerYear, countTransactions, countCountries } from './data.js';

//Standaard main js bestand waar alles samen komt

let orderData;
let omzetData;
let countryData;

document.addEventListener("DOMContentLoaded", async function() {
  orderData = await fetchDataOrder();
  omzetData = await fetchDataOmzet();
  countryData = await fetchDataCountry();

  countOrdersPerYear(orderData, 'year');
  calculateRevenuePerYear(omzetData, 'year');
  countTransactions(omzetData, 'year');
  countCountries(countryData)
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
