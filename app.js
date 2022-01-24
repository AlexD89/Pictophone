const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const rooms = require("./routes/api/rooms");
const prompts = require("./routes/api/prompts");
const drawings = require("./routes/api/drawings");
const guesses = require("./routes/api/guesses");
const games = require("./routes/api/games");
const cors = require('cors')
const bodyParser = require('body-parser');
const passport = require('passport');
const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log(`Server is running on port ${port}`));
const path = require('path');
    

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}
    
// socket.io connection
    
const io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:3000", "https://pictophone.herokuapp.com/"],
        transports: ["websocket", "polling"]

    }
})
    
io.on('connection', socket => {
    socket.on('send-message',  (message, room) => {
        socket.to(room).emit('receive-message', message)
    })
    socket.on('join-room', (room) => {
        socket.join(room)
    })
    socket.on('update-count', () => {
        socket.to("lobby").emit("update-index")
    })
    socket.on('submit-chain', (room) => {
        io.in(room).emit('chain-received')
    })
    socket.on('increase-turn', (room) => {
        io.in(room).emit('increased-turn')
    })
    socket.on('start-game', room => {

        socket.to(room).emit('start-game', 'hi')
    })
    socket.on('leave-room', room => {
        socket.leave(room)
    })
    socket.on('send-drawing', (drawing, room) => {
        socket.to(room).emit('receive-drawing', drawing)
    })
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
})

// Mongoose connecting to our database
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

    

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/rooms", rooms);
app.use("/api/prompts", prompts);
app.use("/api/drawings", drawings);
app.use("/api/guesses", guesses);
app.use("/api/games", games);
app.use(cors());

