const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('banco.db');

db.serialize(() => {
  db.each("SELECT name, sql FROM sqlite_master WHERE type='table' ORDER BY name", (err, row) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('TABLE', row.name);
    console.log(row.sql);
  });
});

db.close();
