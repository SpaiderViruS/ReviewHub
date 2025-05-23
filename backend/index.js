const express = require('express');
const cors = require('cors');
const multer = require('multer');

const logger = require('./middleware/log.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

const itemRouter = require('./routes/item.router');
const dictRouter = require('./routes/dictionary.router');

const upload = multer();

app.use(express.json());
app.use(upload.single('file'));

// const allowedOrigins = [
//   '', // Прод
//   '' // локал
// ];
// app.use(cors({
//   origin: (origin, callback) => {
//   if (!origin || allowedOrigins.includes(origin)) {
//     return callback(null, true);
//   }
//   return callback(new Error('Not allowed by CORS'));
//   },
//   credentials: true,
// }));

app.use(cors());

app.use(logger);

app.use('/item', itemRouter);
app.use('/dictionary', dictRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});