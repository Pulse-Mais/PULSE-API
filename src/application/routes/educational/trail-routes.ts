import { TrailControler } from "@/application/controllers/trail-controller";
import { FastifyAdapter } from "@/infra/adapters/fastify-adapter";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";


export const TrailRoutes = (server: FastifyInstance, trailController: TrailControler) => {
    // server.post("/create-trail", async (request: FastifyRequest, reply: FastifyReply) => {
    //     const fastifyAdapter = new FastifyAdapter(request, reply);

    //     return await trailController.createTrail(fastifyAdapter);
    // });

    server.get("/trails", async (request: FastifyRequest, reply: FastifyReply) => {
        const fastifyAdapter = new FastifyAdapter<boolean>(request, reply);

        return await trailController.listTrails(fastifyAdapter)
    });

    

 

}