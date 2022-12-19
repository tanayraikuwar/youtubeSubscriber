const mongoose = require('mongoose');
const subscriberModel = require('./models/subscriber');
const data = require('./data');

// Connect to DATABASE
const DATABASE_URL = "mongodb+srv://tanay:tanay@cluster0.pgziewj.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Database created...'));

const refreshAll = async () => {
    await subscriberModel.deleteMany({});
    await subscriberModel.insertMany(data);
    await mongoose.disconnect();
}

refreshAll();

module.exports = refreshAll;