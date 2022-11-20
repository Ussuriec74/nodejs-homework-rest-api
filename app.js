const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const contactsRouter = require('./routes/api/contactsRouter');
const usersRouter = require('./routes/api/authRouter');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';



app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/public", express.static("public"));

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);


app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
})

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status).json({ message: err.message });
})

module.exports = { app };

