const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const dbRouter = require('./routes/dbRouter');
const loginRouter = require('./routes/loginRouter');

//WEBPACK BUILD
app.use('/build', express.static(path.join(__dirname, '../build')));


// ROUTE HANDLING
app.use('/db', dbRouter);
app.use('/login', loginRouter);

//MAIN PAGE
app.use('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

//CATCH-ALL HANDLER
app.use('*', (req, res, err) => {
  res.sendStatus(404);
});

//GLOBAL ERROR HANDLING
app.use((err, req, res, next) => {
  return res.status(400).json('Global Error');
});

//SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
