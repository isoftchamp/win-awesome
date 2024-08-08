const mongoose = require('mongoose');

// Create connections to multiple databases
const db1 = mongoose.createConnection('mongodb://localhost:27017/db1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db2 = mongoose.createConnection('mongodb://localhost:27017/db2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schemas for each database
const schema1 = new mongoose.Schema({
  name: String,
  age: Number,
});

const schema2 = new mongoose.Schema({
  title: String,
  content: String,
});

// Create models for each database
const Model1 = db1.model('Model1', schema1);
const Model2 = db2.model('Model2', schema2);

// Example: Insert documents into each database
const example1 = new Model1({ name: 'Alice', age: 25 });
const example2 = new Model2({ title: 'Hello World', content: 'This is a test' });

async function run() {
  await example1.save();
  await example2.save();

  console.log('Documents inserted successfully');
  
  // Query the databases
  const results1 = await Model1.find();
  const results2 = await Model2.find();

  console.log('DB1 Results:', results1);
  console.log('DB2 Results:', results2);
}

// Run the example
run().catch(error => console.error('Error:', error));
