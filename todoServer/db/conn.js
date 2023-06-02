const mongoose = require('mongoose');

const DB =  "mongodb+srv://todo:todoapp@cluster0.rl81iql.mongodb.net/tododatabase?retryWrites=true&w=majority"
// "mongodb+srv://todo:password@devconnector.jpokp.mongodb.net/tododatabase?retryWrites=true&w=majority"
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Failed to connect to MongoDB', error);
});