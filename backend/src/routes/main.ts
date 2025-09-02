import { Router } from "express";
import * as pingController from "../controllers/ping";
import * as authController from "../controllers/auth";
import * as tweetController from "../controllers/tweet";
import * as userController from "../controllers/user";
import * as feedController from "../controllers/feed";
import * as searchController from "../controllers/search";
import * as trendingController from "../controllers/trending";
import * as suggestionController from "../controllers/suggestion";
import { privateRoute } from "../middleware/privateRoute";

export const mainRouter = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     AuthSignup:
 *       type: object
 *       required: [name, email, password]
 *       properties:
 *         name:
 *           type: string
 *           example: Fulano
 *         email:
 *           type: string
 *           example: fulano@email.com
 *         password:
 *           type: string
 *           example: 123456
 *     AuthSignin:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           example: fulano@email.com
 *         password:
 *           type: string
 *           example: 123456
 *     TweetCreate:
 *       type: object
 *       required: [text]
 *       properties:
 *         text:
 *           type: string
 *           example: Meu primeiro tweet!
 *     Tweet:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         text:
 *           type: string
 *         userId:
 *           type: string
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         slug:
 *           type: string
 *     UserUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *     Trend:
 *       type: object
 *       properties:
 *         hashtag:
 *           type: string
 *         count:
 *           type: integer
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @openapi
 * /ping:
 *   get:
 *     summary: Testa se a API está online
 *     tags: [Ping]
 *     responses:
 *       200:
 *         description: Pong
 */
mainRouter.get("/ping", pingController.ping);

/**
 * @openapi
 * /privateping:
 *   get:
 *     summary: Testa rota privada
 *     tags: [Ping]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pong privado
 */
mainRouter.get("/privateping", privateRoute, pingController.privateping);

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     summary: Cria uma nova conta
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/AuthSignup"
 *     responses:
 *       201:
 *         description: Usuário criado
 */
mainRouter.post("/auth/signup", authController.signup);

/**
 * @openapi
 * /auth/signin:
 *   post:
 *     summary: Faz login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/AuthSignin"
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 */
mainRouter.post("/auth/signin", authController.signin);

/**
 * @openapi
 * /tweet:
 *   post:
 *     summary: Adiciona um tweet
 *     tags: [Tweet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TweetCreate"
 *     responses:
 *       201:
 *         description: Tweet criado
 */
mainRouter.post("/tweet", privateRoute, tweetController.addTweet);

/**
 * @openapi
 * /tweet/{id}:
 *   get:
 *     summary: Retorna um tweet pelo ID
 *     tags: [Tweet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do tweet
 *     responses:
 *       200:
 *         description: Tweet encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Tweet"
 */
mainRouter.get("/tweet/:id", privateRoute, tweetController.getTweet);

/**
 * @openapi
 * /tweet/{id}/answers:
 *   get:
 *     summary: Retorna respostas de um tweet
 *     tags: [Tweet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do tweet
 *     responses:
 *       200:
 *         description: Lista de respostas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Tweet"
 */
mainRouter.get("/tweet/:id/answers", privateRoute, tweetController.getAnswers);

/**
 * @openapi
 * /tweet/{id}/like:
 *   post:
 *     summary: Curtir/descurtir um tweet
 *     tags: [Tweet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do tweet
 *     responses:
 *       200:
 *         description: Toggle like
 */
mainRouter.post("/tweet/:id/like", privateRoute, tweetController.likeToggle);

/**
 * @openapi
 * /user/{slug}:
 *   get:
 *     summary: Retorna informações de um usuário
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug do usuário
 *     responses:
 *       200:
 *         description: Informações do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 */
mainRouter.get("/user/:slug", privateRoute, userController.getUser);

/**
 * @openapi
 * /user/{slug}/tweets:
 *   get:
 *     summary: Lista tweets de um usuário
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug do usuário
 *     responses:
 *       200:
 *         description: Lista de tweets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Tweet"
 */
mainRouter.get("/user/:slug/tweets", privateRoute, userController.getUserTweets);

/**
 * @openapi
 * /user/{slug}/follow:
 *   post:
 *     summary: Seguir/desseguir usuário
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug do usuário
 *     responses:
 *       200:
 *         description: Toggle follow
 */
mainRouter.post("/user/:slug/follow", privateRoute, userController.followToggle);

/**
 * @openapi
 * /user:
 *   put:
 *     summary: Atualiza dados do usuário
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserUpdate"
 *     responses:
 *       200:
 *         description: Usuário atualizado
 */
mainRouter.put("/user", privateRoute, userController.updateUser);

/**
 * @openapi
 * /feed:
 *   get:
 *     summary: Retorna feed do usuário
 *     tags: [Feed]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tweets do feed
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Tweet"
 */
mainRouter.get("/feed", privateRoute, feedController.getFeed);

/**
 * @openapi
 * /search:
 *   get:
 *     summary: Busca tweets
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Termo de busca
 *     responses:
 *       200:
 *         description: Resultados da busca
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Tweet"
 */
mainRouter.get("/search", privateRoute, searchController.searchTweets);

/**
 * @openapi
 * /trending:
 *   get:
 *     summary: Retorna trends
 *     tags: [Trending]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de trends
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Trend"
 */
mainRouter.get("/trending", privateRoute, trendingController.getTrends);

/**
 * @openapi
 * /suggestions:
 *   get:
 *     summary: Sugestões de usuários
 *     tags: [Suggestion]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de sugestões
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/User"
 */
mainRouter.get("/suggestions", privateRoute, suggestionController.getUserSuggestions);