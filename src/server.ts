import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { mainRouter } from "./routes/main";

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(urlencoded({ extended: true }))
dotenv.config();

server.use("/", mainRouter);

server.listen(process.env.PORT, () => {
    console.log(`server running at ${process.env.PORT}`);
})