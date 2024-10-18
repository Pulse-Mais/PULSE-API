import { IHttpContext } from "@/infra/port/http/IHttp-context";
import { CreateTrailUseCase } from "../use-cases/educational-content-cases/trail/create/create-trail-use-case";
import { ITrailRepository } from "@/domain/repository/ITrail-Repository";
import { IStorageService } from "../interfaces/IStorage-service";
import { GenericController } from "./generic-controller";


export class TrailControler extends GenericController {

    constructor(
        private readonly trailRepository: ITrailRepository,
        private readonly storageService: IStorageService

    ) {
        super();
    }

    // async createTrail(ctx: IHttpContext): Promise<void> {
    //     try {

    //         const data = ctx.getRequest().body
    //         const trail = await new CreateTrailUseCase(this.trailRepository, this.storageService).execute(data)

    //         return ctx.sendResponse(this.createSuccessResponse(trail))

    //     } catch (error) {

    //         return ctx.sendResponse(this.createErrorResponse(error))
    //     }
    // }

    async listTrails(ctx: IHttpContext) {
        try {
            const trails = await this.trailRepository.list()
            return ctx.sendResponse(this.createSuccessResponse(trails))
        } catch (error) {
            return ctx.sendResponse(this.createErrorResponse(error))
        }
    }

    async getTrailById(ctx: IHttpContext) {

        try {

            // const trail = await new CreateTrailUseCase(this.trailRepository, this.storageService).execute(data)
        } catch (error) {

        }
    }

}