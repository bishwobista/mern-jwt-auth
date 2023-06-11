const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const port = 3000;

const authRoute = require('./routes/authRoute');

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
    
);
dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());
app.use('/auth', authRoute);
// app.post('/auth/register', (req, res) => {
//     console.log(req.body);
//     res.send('Hello World!');
// })

app.listen(port, () => {
    console.log(`it's live at http://localhost:${port}`);
    }
);



