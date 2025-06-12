const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const logger = require('./middleware/log.middleware');
const authMiddleware = require('./middleware/auth.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

const itemRouter = require('./routes/item.router');
const dictRouter = require('./routes/dictionary.router');
const userRouter = require('./routes/users.router');
const reviewRouter = require('./routes/reviews.router');
const statsRouter = require('./routes/statistic.router')

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
app.use('/users', userRouter);
app.use('/reviews', reviewRouter);
app.use('/stats', statsRouter)

// app.use('/test', authMiddleware, rotuer)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});