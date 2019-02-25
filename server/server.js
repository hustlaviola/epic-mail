import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to EPIC-mail' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}...`));

export default app;
