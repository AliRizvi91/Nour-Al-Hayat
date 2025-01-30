// app.js (Server-side)

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const port = process.env.PORT;
const localhost = process.env.LOCALHOST;
const ConnectDatabase = require('./Connect_DB/Connect_DB.js');
const { addbasedata } = require('./Data/util_data.js');
const app = express();
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');

const server = http.createServer(app);

// _____----- Router -----_____
const Booking_R = require('./Routes/Booking_R.js');
const City_R = require('./Routes/City_R.js');
const Message_R = require('./Routes/Message_R.js');
const Chat_R = require('./Routes/Chat_R.js');
const CityArea_R = require('./Routes/CityArea_R.js');
const Contact_R = require('./Routes/Contact_R.js');
const Country_R = require('./Routes/Country.js');
const Hotel_R = require('./Routes/Hotel_R.js');
const Gallery_R = require('./Routes/Gallery_R.js');
const giftPackage_R = require('./Routes/giftPackage_R.js');
const Event_R = require('./Routes/Event_R.js');
const Feedback_R = require('./Routes/Feedback_R.js');
const Feature_R = require('./Routes/Feature_R.js');
const Province_R = require('./Routes/Province_R.js');
const Role_R = require('./Routes/Role_R.js');
const Room_R = require('./Routes/Room_R.js');
const Status_R = require('./Routes/Status_R.js');
const User_R = require('./Routes/User_R.js');

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const corsOptions = {
  origin: process.env.FRONTENDURL, // Replace with your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify any headers if needed
};

app.use(cors(corsOptions));

// _____----- API -----_____
app.use('/api/ARZ/booking', Booking_R);
app.use('/api/ARZ/city', City_R);
app.use('/api/ARZ/message', Message_R);
app.use('/api/ARZ/chat', Chat_R);
app.use('/api/ARZ/cityarea', CityArea_R);
app.use('/api/ARZ/contact', Contact_R);
app.use('/api/ARZ/country', Country_R);
app.use('/api/ARZ/gallery', Gallery_R);
app.use('/api/ARZ/giftcard', giftPackage_R);
app.use('/api/ARZ/event', Event_R);
app.use('/api/ARZ/hotel', Hotel_R);
app.use('/api/ARZ/feature', Feature_R);
app.use('/api/ARZ/feedback', Feedback_R);
app.use('/api/ARZ/province', Province_R);
app.use('/api/ARZ/role', Role_R);
app.use('/api/ARZ/room', Room_R);
app.use('/api/ARZ/status', Status_R);
app.use('/api/ARZ/user', User_R);

app.all('*', (req, res) => {
  return res.status(500).send('Not Found');
});

ConnectDatabase().then(() => {
  addbasedata();
  server.listen(port, () => {
    console.log(`Example app listening on port ${localhost}:${port}`);
  });
});


