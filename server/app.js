const express = require('express');
const path = require('path');
const imageRoutes = require('./routes/router');
require("./db/conn");
const cors = require('cors');

const app = express();

// Middleware for parsing JSON
app.use(express.json());
const crossOrigin = {
    origin: 'https://demo-pink-three.vercel.app',
    credentials: true
}
app.use(cors(crossOrigin));
app.use(express.urlencoded({ extended: true }));


// Serve static files (for accessing uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/images', imageRoutes);


app.listen('5000', (req, res) => {
    console.log("server listening on 5000");
    
})
