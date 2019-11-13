const express = require('express');
const app = express();
const path = require('path');
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
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

//CATCH-ALL HANDLER
app.use('*', (req, res, err) => {
  res.sendStatus(404);
});

//GLOBAL ERROR HANDLING
app.use((err, req, res, next) => {
  console.log(err)
  return res.status(400).json('Global Error');
});

//SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
