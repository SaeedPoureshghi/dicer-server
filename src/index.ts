import Express from 'express';
import  apiRouter  from './routes/api';
import cors from 'cors';

const app = Express();

app.use(Express.json());

app.use(cors({
    origin: 'http://localhost:5173'
}))


app.use('/api/v1', apiRouter);

app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
    });

app.listen(3000, () => {    
  console.log('Server is running on port 3000');
});