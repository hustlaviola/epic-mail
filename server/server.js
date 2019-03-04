import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import ErrorHandler from './utils/ErrorHandler';
import router from './routes/router';

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', router);

app.all('/*', (req, res) => ErrorHandler.routeError(res));

const PORT = process.env.PORT || 5000;
app.listen(PORT);

export default app;
