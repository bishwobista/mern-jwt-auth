const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());
const authRoute = require('./routes/authRoute');

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
    
);
dotenv.config();
connectDB();

app.use(express.json());

app.use('/auth', authRoute);

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client/build/index.html"));
    });
  }


app.listen(port, () => {
    console.log(`it's live at http://localhost:${port}`);
    }
);



