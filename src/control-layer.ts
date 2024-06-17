import { FastifyInstance } from "fastify"
// import { InMemoryTrailClassRepository } from "../test/memory/in-memory-course-repository"
import { InMemoryTrailRepository } from "../test/memory/in-memory-trail-repository"
import { TrailClassControler } from "./application/controllers/trail-class-controller"
import { TrailControler } from "./application/controllers/trail-controller"
import { TrailRoutes } from "./application/routes/educational/trail-routes"
import { AmazonS3Adapter } from "./infra/adapters/amazon-s3-adapter"
import { MuxVideoServiceAdapter } from "./infra/adapters/mux-video-service-adapter"
import { trailClassRoutes } from "./application/routes/educational/trail-class-routes"
import { MySqlTrailClassAdapter } from "./infra/database/mysql/my-sql-trail-class-adapter"
import { MySqlTrailRepository } from "./infra/database/mysql/my-sql-trail-adapter"
import { AmazonCloudFrontAdapter } from "./infra/adapters/amazon-cloudfront-adapter"
 
export const ControlLayer = (server: FastifyInstance) => {

 
    // bancos de dados
    const trailClassRepository = new MySqlTrailClassAdapter()
    const trailRepository = new MySqlTrailRepository(trailClassRepository)

    // aqui são os adapters, da pra trocar entre os provedores.
    const videoService = new MuxVideoServiceAdapter()
    const storageService = new AmazonS3Adapter()
    const contentDeliveryNetworkService = new AmazonCloudFrontAdapter()

    const trailClassController = new TrailClassControler(trailRepository, trailClassRepository, storageService, videoService, contentDeliveryNetworkService)
    const trailController = new TrailControler(trailRepository, storageService)

    TrailRoutes(server, trailController)
    trailClassRoutes(server, trailClassController)

}