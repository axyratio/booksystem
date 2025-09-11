// app.js
const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const authRoutes = require('./routes/authroutes');
const managerRoutes = require("./routes/managerroutes")

const syncDB = require('./config/syncdb');
dotenv.config();
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use("/manager", managerRoutes)

syncDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
