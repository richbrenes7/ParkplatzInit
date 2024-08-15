const mongoose = require('mongoose');

const uri = "mongodb+srv://nbrenesl:PsgSkE5hjEZFR0LT@cluster0.evzly.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('Error connecting to MongoDB:', err));
