import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

import { setupCounter } from './counter.js'
import { fetchDataOrder, fetchDataOmzet, countOrdersPerYear, calculateRevenuePerYear } from './data.js';

let orderData;
let omzetData;

document.addEventListener("DOMContentLoaded", async function() {
  orderData = await fetchDataOrder();
  omzetData = await fetchDataOmzet();

  countOrdersPerYear(orderData, 'year');
  calculateRevenuePerYear(omzetData, 'year');
});

document.getElementById('viewSelect').addEventListener('change', async function() {
  const yearSelect = document.getElementById('viewSelect').value;
  countOrdersPerYear(orderData, yearSelect);
});

document.getElementById('viewSelectOmzet').addEventListener('change', async function() {
  const yearSelect = document.getElementById('viewSelectOmzet').value;
  calculateRevenuePerYear(omzetData, yearSelect);
});