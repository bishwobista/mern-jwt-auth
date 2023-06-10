const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const app = express();
const port = 3000;

const authRoute = require('./routes/authRoute');

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
    
);
dotenv.config();
connectDB();

app.use(express.json());
app.use('/auth', authRoute);

app.listen(port, () => {
    console.log(`it's live at http://localhost:${port}`);
    }
);



