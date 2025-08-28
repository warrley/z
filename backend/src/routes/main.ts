import { Router } from "express";
import * as PingController from "../controllers/ping";

export const mainRouter = Router();

mainRouter.get("/ping", PingController.ping);
// mainRouter.get("/privateping");

mainRouter.post("/auth/signup");
mainRouter.post("/auth/signin");

mainRouter.post("/tweet");
mainRouter.get("tweet/:id"); // tweet/123
mainRouter.get("/tweet/:id/answers");
mainRouter.post("/tweet/:id/like");

mainRouter.get("/user/:slug");
mainRouter.get("/user/:slug/tweets");
mainRouter.post("/user/:slug/follow");
mainRouter.put("/user");
mainRouter.put("/user/avatar");
mainRouter.put("/user/cover");

mainRouter.get("/feed");
mainRouter.get("/search");
mainRouter.get("/trending");
mainRouter.get("/suggestions");
