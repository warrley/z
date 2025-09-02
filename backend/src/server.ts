import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { mainRouter } from "./routes/main";

const server = express();
dotenv.config();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(urlencoded({ extended: true }));

export const swaggerSchemas = {
  AuthSignup: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: { type: "string", example: "Fulano" },
      email: { type: "string", example: "fulano@email.com" },
      password: { type: "string", example: "123456" },
    },
  },
  AuthSignin: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", example: "fulano@email.com" },
      password: { type: "string", example: "123456" },
    },
  },
};

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Minha API", version: "1.0.0" },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: swaggerSchemas,
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts"],
};


const swaggerSpec = swaggerJSDoc(swaggerOptions as any);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.use("/", mainRouter);

server.listen(process.env.PORT, () => {
  console.log(`server running at ${process.env.PORT}`);
});