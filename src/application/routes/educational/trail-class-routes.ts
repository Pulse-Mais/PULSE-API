import { CreateTrailInputDTO } from './../../use-cases/educational-content-cases/trail/create/dto/create-trail-input-dto';
import { FastifyAdapter } from "@/infra/adapters/fastify-adapter";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { TrailClassControler } from "@/application/controllers/trail-class-controller";

export const trailClassRoutes = (server: FastifyInstance, trailClassController: TrailClassControler) => {

    /**   
        * * CRIAR UMA AULA

        * @description Cria uma aula dentro da trilha específicada. 
        * @endpoint /create-trail-class/:idTrail
        * @method POST
        * @param {CreateTrailInputDTO: CreateTrailInputDTO} 
        * @returns {Promise<CreateTrailClassOutputDTO>}  
    */

    server.post("/create-trail-class/:idTrail", async (request: FastifyRequest, reply: FastifyReply) => {
        const fastifyAdapter = new FastifyAdapter(request, reply);

        return await trailClassController.createTrailClass(fastifyAdapter);
    });


    /** 
        * * ATUALIZAR INFORMAÇÕES DE UMA AULA
     
        * @description Atualiza uma aula dentro da trilha específicada. 
        * @endpoint /update-trail-class/:idTrail
        * @method POST
        * @returns {Promise<void>}  
    */

    server.put("/update-trail-class/:idTrail/:idTrailClass", async (request: FastifyRequest, reply: FastifyReply) => {
        const fastifyAdapter = new FastifyAdapter(request, reply);

        return await trailClassController.updateTrailClassInfo(fastifyAdapter);
    });

    /** PUBLICAR UMA AULA
  
        * @description Publica uma aula da trilha. 
        * @endpoint /publish-trail-class/:idTrail
        * @method POST
        * @returns {Promise<void>}  
    */

    server.put("/publish-trail-class/:idTrail/:idTrailClass", async (request: FastifyRequest, reply: FastifyReply) => {
        const fastifyAdapter = new FastifyAdapter(request, reply);

        return await trailClassController.publishTrailClass(fastifyAdapter);
    });

    /** LIBERAR UMA AULA
  
        * @description Libera uma aula publicada na trilha. 
        * @endpoint /update-trail-class/:idTrail
        * @method POST
        * @returns {Promise<void>}  
    */

    server.put("/unlock-trail-class/:idTrail/:idTrailClass", async (request: FastifyRequest, reply: FastifyReply) => {
        const fastifyAdapter = new FastifyAdapter(request, reply);

        return await trailClassController.unlockTrailClass(fastifyAdapter);
    });

    /** APAGAR UMA AULA
 
        * @description Apaga uma aula da trilha. 
        * @endpoint /update-trail-class/:idTrail
        * @method POST
        * @returns {Promise<void>}  
    */

    server.put("/delete-trail-class/:idTrail/:idTrailClass", async (request: FastifyRequest, reply: FastifyReply) => {
        const fastifyAdapter = new FastifyAdapter(request, reply);

        return await trailClassController.deleteTrailClass(fastifyAdapter);
    });


    /** CRIAR CONTEÚDO DO TIPO ARCHIVE
 
       * @description Cria um endpoint pra upload direto de um conteúdo do tipo arquivo, em qualquer formato, 
       e retorna para frontend. Ao criar o endpoint, também já atualiza o conteúdo para o status "waiting",
       enquanto o upload não é realizado. 
       * @endpoint /update-trail-class/:idTrail
       * @method POST
       * @returns {Promise<void>}  
   */

    server.post("/create-trail-class-content/archive/:idTrail/:idTrailClass", async (request: FastifyRequest, reply: FastifyReply) => {
        const fastifyAdapter = new FastifyAdapter(request, reply);

        return await trailClassController.getUrlForUploadArchiveContent(fastifyAdapter);
    });

    /** SINALIZAR QUE O CONTEÚDO DO TIPO ARCHIVE FOI CRIADO  
     
        * @description Recebe uma requisição por parte do provedor de cloud (que pode ser qualquer um), 
          sinalizando que um novo objeto foi inserido no storage na partição da aula. Dessa forma, o endpoint 
          serve para atualizar o conteúdo da aula para "filled" (preenchido), o que o tornará visível ao admin 
          e permitirá que ele possa publicar a aula, visto que o conteúdo é válido. 
        * @endpoint /create-trail-class/:idTrail
        * @method POST
        * @returns {Promise<void>} 
        
    */

    server.post("/archive-created", async (request: FastifyRequest, reply: FastifyReply) => {
        const fastifyAdapter = new FastifyAdapter(request, reply);
        return await trailClassController.archiveContentCreated(fastifyAdapter);
    });


    /** CRIAR CONTEÚDO DO TIPO VIDEO
 
        * @description Atualiza uma aula dentro da trilha específicada. 
        * @endpoint /update-trail-class/:idTrail
        * @method POST
        * @returns {Promise<void>}  
    */

    server.post("/create-class-content/video/:idtrail/:idTrailClass", async (request: FastifyRequest, reply: FastifyReply) => {
        const fastifyAdapter = new FastifyAdapter(request, reply);

        return await trailClassController.getUrlForUploadVideoContent(fastifyAdapter);
    });


    /** SINALIZAR QUE O CONTEÚDO DO TIPO VIDEO FOI CRIADO  
     
        * @description Recebe uma requisição por parte do provedor de cloud (que pode ser qualquer um), 
          sinalizando que um novo objeto foi inserido no storage na partição da aula. Dessa forma, o endpoint 
          serve para atualizar o conteúdo da aula para "filled" (preenchido), o que o tornará visível ao admin 
          e permitirá que ele possa publicar a aula, visto que o conteúdo é válido. 

        * @endpoint /create-trail-class/:idTrail
        * @method POST
        * @param {string} idTrail - O id da Trilha onde a aula será criada. 
        
        * @param {FastifyRequest} request - O objeto de solicitação Fastify
        * @param {FastifyReply} reply - O objeto de resposta Fastify
        * @returns {Promise<void>} 
        
    */

    server.get("/trail/:idTrail/trail-classs/ ", async (request: FastifyRequest, reply: FastifyReply) => {
        const fastifyAdapter = new FastifyAdapter(request, reply);

        return await trailClassController.videoContentCreated(fastifyAdapter)
    })

    server.get("/trail/:idTrail/trail-classes", async (request: FastifyRequest, reply: FastifyReply) => {
        const fastifyAdapter = new FastifyAdapter(request, reply);

        return await trailClassController.listTrailClasses(fastifyAdapter)
    })

}