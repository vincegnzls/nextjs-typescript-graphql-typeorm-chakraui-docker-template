/* eslint-disable no-empty */
import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import Cors from 'micro-cors';
import type { PageConfig } from "next";
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from "../../../lib/serverless/graphql/resolvers/HelloWorldResolver";
import { AppDataSource } from "../../../lib/serverless/utils/db";
import { UserResolver } from "../../../lib/serverless/graphql/resolvers/UserResolver";
import Redis from "ioredis";

const cors = Cors();

// disable next js from handling this route
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const REDIS_URL: string = process.env.REDIS_URL || ''
const redis = new Redis(REDIS_URL)

const apolloServer = new ApolloServer({
  schema: await buildSchema({
    resolvers: [HelloWorldResolver, UserResolver],
  }),
  context: async ({ req, res }) => {
    try {
      await AppDataSource.initialize();
    } catch(_) {}
    
    return {
      req,
      res,
      redis
    };
  },
});

await apolloServer.start()

export default cors((req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  
  return apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});