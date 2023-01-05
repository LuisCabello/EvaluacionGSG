import { readFile } from 'fs/promises'
import express from 'express';
import cors from 'cors';


const app = express();

// we read the file using top-level await and with
// codificación utf-8
const file1 = await readFile('./data/historical.json', 'utf-8');
const file2 = await readFile('./data/symbols.json', 'utf-8');

// we transform the content into a JSON
const jsonHistorical = JSON.parse(file1);
const jsonSymbols = JSON.parse(file2);

const port = 9090;

// Corse configuration
app.use(express.urlencoded({extended:true}));
app.use(express.json({type: "*/*"}));
app.use(cors());


app.get('/', function(req, res) {
    res.send('Saludos desde Express');
});

app.get('/historical', function(req, res) {
  res.send(jsonHistorical);
});
 
//We get the data from the historical file with filters
app.get( '/historical/:symbol' , function(req, res) {
  // We filter the json with the parameter obtained
  res.send(Object.values(jsonHistorical['historicalStockList']).filter(data => data.symbol === req.params.symbol.toUpperCase()));
});

//Get the data from the Symbols file
app.get( '/symbols' , function(req, res) {
  res.send(jsonSymbols);
});

//We get the data from the symbols file with filters
app.get( '/symbols/:symbol' , function(req, res) {
  //  We filter the json with the parameter obtained
  res.send(Object.values(jsonSymbols['symbolsList']).filter(data => data.symbol === req.params.symbol.toUpperCase()));
});

app.listen(port, () => {
  console.log('El servidor se esta ejecutando en http://localhost:'+ port);
});