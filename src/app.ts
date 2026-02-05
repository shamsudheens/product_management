import express from 'express';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import reportRoutes from './routes/reportRoutes';
import { errorHandler } from './middleware/errorMiddleware';
import { requestLogger } from './middleware/loggerMiddleware';
import logger from './utils/logger';

const app = express();


app.use(cors());

app.use(express.json());
app.use(requestLogger);

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.static(path.join(__dirname, '../src/views')));

// Root Redirect
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// API Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/reports', reportRoutes);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3006;


if (require.main === module) {
    app.listen(PORT, () => {
        logger.info(`Server is running on port http://localhost:${PORT}`);
    });
}

export default app;
