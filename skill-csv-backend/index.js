const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors');
const winston = require('winston');

const app = express();
const PORT = 3001;

app.use(cors());

// Setup Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' }),
  ],
});

// Read and parse CSV
function readCSV(callback) {
  const results = [];
  logger.info('Starting to read CSV');

  fs.createReadStream('skills.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      logger.info(`Finished reading CSV with ${results.length} records`);
      callback(results);
    })
    .on('error', (err) => {
      logger.error(`Error reading CSV: ${err.message}`);
      callback([]);
    });
}

// Endpoint to get CSV data
app.get('/api/skills', (req, res) => {
  readCSV((data) => {
    res.json(data);
  });
});

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
