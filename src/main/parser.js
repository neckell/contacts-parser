import csv from 'csv-parser';
import { Readable } from 'stream'
import stripBomStream from 'strip-bom-stream';
import { writeToString } from '@fast-csv/format';
import { parseOutlookRow } from './parseOutlookRow.mjs';

export const parseContactsCSV = (buffer, countryCode) => {
  const results = [];
  const emails = new Set();

  return new Promise((resolve, reject) => {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    stream
      .pipe(stripBomStream())
      .pipe(csv())
      .on('data', (row) => {
        const data = parseOutlookRow(row, emails, countryCode)
        if (data !== null) {
          results.push(data);
        }
      })
      .on('end', () => {
        writeToString(results, { headers: true })
          .then(csvString => {
            const outputBuffer = Buffer.from(csvString);
            resolve(outputBuffer);
          })
          .catch(reject);
      });
  });
}
