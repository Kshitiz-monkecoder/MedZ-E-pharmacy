const { Client } = require('pg');

// Create a new client instance
const client = new Client({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_password',
  port: 5432,
});

// Connect to the database
client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Connection error', err));

// Example query
client.query('SELECT * FROM your_table_name', (err, res) => {
  if (err) {
    console.error('Query error', err);
  } else {
    console.log('Query result:', res.rows);
  }
  // Close the connection
  client.end();
});
