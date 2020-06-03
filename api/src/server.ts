import express from 'express';

const app = express();

app.get('/', (req,res) => {
  return res.json({message: 'Ecoleta'});
});

const port = process.env.SERVER_PORT || 3339;
app.listen(port, () => {
  console.log(`Server initialized, running in ${process.env.NODE_ENV} mode on port ${port}`);
});