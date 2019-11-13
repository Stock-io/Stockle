const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser());

const stocksRouter = require('./routes/stocksRouter');
const usersRouter = require('./routes/userRouter');

//WEBPACK BUILD
app.use('/build', express.static(path.join(__dirname, '../build')));


// ROUTE HANDLING
app.use('/user', usersRouter);
app.use('/stocks', stocksRouter);


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
