import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

import { setupCounter } from './counter.js'
import { fetchDataOrder, fetchDataOmzet, countOrdersPerYear, calculateRevenuePerYear } from './data.js';

document.addEventListener("DOMContentLoaded", async function() {
  const orderData = await fetchDataOrder();
  const omzetData = await fetchDataOmzet();

  countOrdersPerYear(orderData, 'year');
  calculateRevenuePerYear(omzetData, 'year');
});

document.getElementById('viewSelect').addEventListener('change', async function() {
  const yearSelect = document.getElementById('viewSelect').value;
  const orderData = await fetchDataOrder();
  countOrdersPerYear(orderData, yearSelect);
});

document.getElementById('viewSelectOmzet').addEventListener('change', async function() {
  const yearSelect = document.getElementById('viewSelectOmzet').value;
  const omzetData = await fetchDataOmzet();
  calculateRevenuePerYear(omzetData, yearSelect);
});