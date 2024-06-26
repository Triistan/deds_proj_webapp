import express from 'express';
import sql from 'mssql';
import cors from 'cors'; 
const app = express();
const port = 3000;
import { config } from 'dotenv';
config();

//Node JS back-end bestand

const dbconfig = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVERNAME,
    database: process.env.DB_NAME,
};

app.use(cors()); 
app.use(cors({
    origin: ['http://localhost:5174', 'http://localhost:5173']
}));

app.get('/orderDate', async (req, res) => {
    try {
        let pool = await sql.connect(dbconfig);
        let result = await pool.request().query('SELECT order_date FROM OrderData');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching data');
    }
});

app.get('/payhistory', async (req, res) => {
    try {
        let pool = await sql.connect(dbconfig);
        let result = await pool.request().query('SELECT TransactionDate , ActualCost from Payhistory WHERE ActualCost <> 0');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching data');
    }
});

app.get('/country', async (req, res) => {
    try {
        let pool = await sql.connect(dbconfig);
        let result = await pool.request().query('SELECT Country FROM AddressInfo');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching data');
    }
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});