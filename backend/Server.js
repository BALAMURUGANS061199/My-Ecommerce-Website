const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const DB = require('./Connection');
const User = require('./Router/UserRoute');
const Product = require('./Router/ProductRoute');
const Image = require('./Router/ImageRoutes');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3000;  
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: '*',
    }
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', User);
app.use('/product', Product);
app.use('/image', Image);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
