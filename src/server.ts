import 'tsconfig-paths/register';
import 'dotenv/config';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { ControlLayer } from './control-layer';
 
const server = fastify();

server.register(cors, { 
  origin: true  
});

ControlLayer(server);

server.listen({ port: 3333 }, (error, address) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(`Servidor rodando: ${address}`);
});
