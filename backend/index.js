import dotenv from "dotenv";
import morgan from 'morgan';
import cors from 'cors';
import express from "express";
import db from "./models/db.js";
import route from "./routes/index.js";

dotenv.config();
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));

db.connect();

route(app);

app.get('/err', function (req, res) {
    throw new Error('Error!');
})

app.use(function (req, res) {
    res.status(404).json({
        error: 'Endpoint not found.'
    });
});

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).json({
        error: 'Something wrong!'
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});