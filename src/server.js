import express from 'express';
import cors from 'cors';
import momRouter from "./routes/mom.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

var corsOptions = {
	origin: process.env.CORS 
	//|| "https://www.niftykicksfactory.link"
}

console.log(corsOptions) 

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/mom/", momRouter);

app.get('/', (req, res) => {
	res.send("app works");
});

app.listen(process.env.PORT || 3001, () => console.log('Up and running... 🚀'));
