// index.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
const PORT = process.env.PORT || 3000;

import {connectDB} from './config/db.js';

dotenv.config();
// create express app and http server
const app = express();
const server = http.createServer(app);

app.use(helmet());
app.use(cors({
    origin : '*',
    credentials : true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Rate Limiting
const limiter = rateLimit({
    windowMs : 15*60*1000,
    max: 100
});

app.use('/api/', limiter);

//Routes
app.use('/api/auth', authRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Hello from Node.js on Vercel 🚀");
});

// JSON route
app.get("/api", (req, res) => {
  res.json({ message: "This is an API response!" });
});

// //Health Checks
// app.get('/health', (req, res) => {
//     res.json({
//         status: 'OK',
//         timestamp: new Date().toISOString(),
//         environment: process.env.NODE_ENV
//     })
// });

// // Root route for Vercel 
// app.get('/', (req, res) => {
//     res.json({
//         message: 'Speech-to text notes API',
//         status: 'Running',
//         endpoints: {
//             health: '/health',
//             auth: '/api/auth',
//         }
//     })
// })

// // error handling
// app.use((err, req, res, next)=> {
//     console.error(err.stack);
//     res.status(500).json({
//         error : 'Something went wrong!',
//         message: process.env.NODE_ENV === 'development' ? err.message : undefined
//     });
// });


// 404 handler 

// app.use((req, res) => {
//     res.status(404).json({
//         error: 'Not Found'
//     })
// });


// MongoDB connection
// let isConnected = false;

// const ensureDbConnection = async () => {
//     if(!isConnected){
//         try {
//             await connectDB();
//             isConnected = true;
//             console.log('MongoDB connected');
//         } catch (error) {
//             console.error('MongoDB connection error:', error);
//         }
//     }
// }

// connect to MongoDB
await connectDB();

if(process.env.NODE_ENV !== 'production'){
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
}

// ✅ Export the app for Vercel
export default server;