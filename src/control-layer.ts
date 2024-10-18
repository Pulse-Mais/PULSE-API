import { FastifyInstance } from "fastify"
// import { InMemoryTrailClassRepository } from "../test/memory/in-memory-course-repository"
 
import { TrailClassControler } from "./application/controllers/trail-class-controller"
import { TrailControler } from "./application/controllers/trail-controller"
import { TrailRoutes } from "./application/routes/educational/trail-routes"
 
import { MuxVideoServiceAdapter } from "./infra/adapters/mux-video-service-adapter"
import { trailClassRoutes } from "./application/routes/educational/trail-class-routes"
import { MySqlTrailClassAdapter } from "./infra/database/mysql/my-sql-trail-class-adapter"
import { MySqlTrailRepository } from "./infra/database/mysql/my-sql-trail-adapter"
import { AmazonCloudFrontAdapter } from "./infra/adapters/amazon-cloudfront-adapter"
import { InMemoryTrailClassRepository } from "./infra/database/memory/in-memory-trailclass-repository"
import { InMemoryTrailRepository } from "./infra/database/memory/in-memory-trail-repository"
import { S3storageService } from "./application/services/s3-storage-service"
 
export const ControlLayer = (server: FastifyInstance) => {

 
    // bancos de dados
    const trailClassRepository = new InMemoryTrailClassRepository()
    const trailRepository = new InMemoryTrailRepository()

    // aqui são os adapters, da pra trocar entre os provedores.
    const videoService = new MuxVideoServiceAdapter()
    const storageService = new S3storageService()
    const contentDeliveryNetworkService = new AmazonCloudFrontAdapter()

    const trailClassController = new TrailClassControler(
        trailRepository, trailClassRepository, storageService, videoService, contentDeliveryNetworkService)
    const trailController = new TrailControler(trailRepository, storageService)

    TrailRoutes(server, trailController)
    trailClassRoutes(server, trailClassController)

}