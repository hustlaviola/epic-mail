import express from 'express';
import router from './routes/router';
import ErrorHandler from './utils/ErrorHandler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to EPIC-mail',
  });
});

app.use('/api/v1', router);

app.all('/*', (req, res) => ErrorHandler.routeError(res));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}...`));

export default app;
