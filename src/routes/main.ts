import { Router } from "express";
import * as PingController from "../controllers/ping";

export const mainRouter = Router();

mainRouter.get("/ping", PingController.ping)