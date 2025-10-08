import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import swaggerUi from 'swagger-ui-express';
import gql from 'graphql-tag';

// Importa las definiciones y resolvers de GraphQL
import { typeDefs } from '../graphql/typeDefs';
import { resolvers } from '../graphql/resolvers';
// Importa el documento de Swagger
import * as swaggerDocument from '../swagger.json';

const prisma = new PrismaClient();

export class Server {
  private static instance: Server;
  public readonly app: Application;

  private constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRestRoutes();
    // Inicia la configuración de GraphQL y Swagger
    this.setupGraphQL();
    this.setupSwagger();
  }

  public static getInstance(): Server {
    if (!Server.instance) {
      Server.instance = new Server();
    }
    return Server.instance;
  }

  private setupMiddleware(): void {
    const corsOptions = {
      origin: 'http://example.com',
    };
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
  }

  private setupRestRoutes(): void {
    this.app.get('/users/:id', async (req: Request, res: Response) => {
      const { id } = req.params;
      try {
        const user = await prisma.user.findUnique({
          where: { id: parseInt(id, 10) },
        });
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ error: 'Usuario no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al consultar la base de datos' });
      }
    });
  }

  // Método para configurar GraphQL
  private async setupGraphQL(): Promise<void> {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    await server.start();
    this.app.use('/graphql', expressMiddleware(server));
    console.log(" gql  Endpoint GraphQL configurado en /graphql.");
  }

  // Método para configurar Swagger
  private setupSwagger(): void {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log(" docs  Documentación Swagger disponible en /api-docs.");
  }

  // Modificado a 'async' para esperar a Apollo Server
  public async start(port: number): Promise<void> {
    this.app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  }
}