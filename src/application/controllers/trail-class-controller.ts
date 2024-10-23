import { TrailClass } from "@/domain/domain-services/trail";
import { TrailClassDomainService } from "@/domain/domain-services/trail-class/trail-class-domain-service";
import { ITrailClassRepository } from "@/domain/repository/ITrail-class-Repository";
import { ITrailRepository } from "@/domain/repository/ITrail-Repository";
import { IHttpContext } from "@/infra/port/http/IHttp-context";
import { IHttpResponse } from "@/infra/port/http/IHttp-response";
import { InvalidRequestParamsAppException } from "../application-exceptions/controllers-application-exceptions/invalid-request-params-app-exception";
import { IContentDeliveryNetworkingService } from "../interfaces/IContent-delivery-networking-service";
import { IStorageService } from "../interfaces/IStorage-service";
import { IVideoService } from "../interfaces/IVideo-service";

import { CreateTrailClassOutputDTO, CreateTrailClassInputDTO, CreateTrailClassUseCase } from "../use-cases/educational-content-cases/trail-class/create";
import { DeleteTrailClassOutputDTO, DeleteTrailClassInputDTO, DeleteTrailClassUseCase } from "../use-cases/educational-content-cases/trail-class/delete";
import { PublishTrailClassOutputDTO, PublishTrailClassInputDTO, PublishTrailClassUseCase } from "../use-cases/educational-content-cases/trail-class/publish";
import { UpdateTrailClassInfoOutputDTO, UpdateTrailClassInfoInputDTO, UpdateTrailClassInfoUseCase } from "../use-cases/educational-content-cases/trail-class/update";
import { GenericController } from "./generic-controller";


export class TrailClassControler extends GenericController {

    constructor(
        private readonly trailRepository: ITrailRepository,
        private readonly trailClassRepository: ITrailClassRepository,
        private readonly storageService: IStorageService,
        private readonly videoService: IVideoService,
        private readonly contentDeliveryService: IContentDeliveryNetworkingService
    ) {
        super();
    }

    async createTrailClass(ctx: IHttpContext): Promise<IHttpResponse<CreateTrailClassOutputDTO>> {

        try {
            const req = await ctx.getRequest()

            const idTrail = req.params.idTrail
            if (!idTrail) throw new InvalidRequestParamsAppException("trail-class-controller", "42", "idTrail");

            const output: CreateTrailClassOutputDTO = await new CreateTrailClassUseCase(
                this.storageService,
                this.videoService,
                this.trailClassRepository, this.trailRepository
            ).execute(idTrail, req.parts)

            return ctx.sendResponse(this.createSuccessResponse({ 'output': output }))

        } catch (error) {
            return ctx.sendResponse(this.createErrorResponse(error))
        }
    }

    // async getTrailClass(ctx: IHttpContext): Promise<IHttpResponse<GetTrailClassOutputDTO>> {

    //     try {

    //         const { idTrail, idTrailClass } = ctx.getRequest().params
    //         if (!idTrail) throw new InvalidRequestParamsAppException("trail-class-controller", "36", "idTrail");
    //         if (!idTrailClass) throw new InvalidRequestParamsAppException("trail-class-controller", "36", "idTrailClass");

    //         const input: GetTrailClassInputDTO = {
    //             idTrail,
    //             idTrailClass
    //         }

    //         const output: GetTrailClassOutputDTO = await new GetTrailClassUseCase(this.trailRepository, this.contentDeliveryService).execute(input)

    //         return ctx.sendResponse(this.createSuccessResponse(output))

    //     } catch (error) {
    //         return ctx.sendResponse(this.createErrorResponse(error))
    //     }
    // }

    // async updateTrailClassInfo(ctx: IHttpContext): Promise<IHttpResponse<UpdateTrailClassInfoOutputDTO>> {

    //     try {
    //         const data = ctx.getRequest().body
    //         const { idTrail, idTrailClass } = ctx.getRequest().params

    //         if (!idTrail) throw new InvalidRequestParamsAppException("trail-class-controller", "61", "idTrail");
    //         if (!idTrailClass) throw new InvalidRequestParamsAppException("trail-class-controller", "62", "idTrailClass");

    //         const input: UpdateTrailClassInfoInputDTO = {
    //             idTrail,
    //             idTrailClass,
    //             newTitle: data.newTitle,
    //             newSubtitle: data.newSubtitle,
    //             newDescription: data.newDescription
    //         }

    //         const output: UpdateTrailClassInfoOutputDTO = await new UpdateTrailClassInfoUseCase(this.trailClassRepository, this.trailRepository).execute(input)

    //         return ctx.sendResponse(this.createSuccessResponse(output))

    //     } catch (error) {
    //         return ctx.sendResponse(this.createErrorResponse(error))
    //     }
    // }

    // async publishTrailClass(ctx: IHttpContext): Promise<IHttpResponse<PublishTrailClassOutputDTO>> {
    //     try {
    //         const { idTrail, idTrailClass } = ctx.getRequest().params
    //         const unlockDate = ctx.getRequest().body.unlockDate

    //         if (!idTrail) throw new InvalidRequestParamsAppException("trail-class-controller", "61", "idTrail");
    //         if (!idTrailClass) throw new InvalidRequestParamsAppException("trail-class-controller", "62", "idTrailClass");
    //         if (!unlockDate) throw new InvalidRequestParamsAppException("trail-class-controller", "63", "unlockDate");

    //         const input: PublishTrailClassInputDTO = {
    //             idTrail,
    //             idTrailClass,
    //             unlockDate
    //         }

    //         const output: PublishTrailClassOutputDTO = await new PublishTrailClassUseCase(this.trailRepository, this.trailClassRepository,).execute(input)

    //         return ctx.sendResponse(this.createSuccessResponse(output))

    //     } catch (error) {
    //         return ctx.sendResponse(this.createErrorResponse(error))
    //     }

    // }

    // async unlockTrailClass(ctx: IHttpContext): Promise<IHttpResponse<UnlockTrailClassOutputDTO>> {
    //     try {
    //         const { idTrail, idTrailClass } = ctx.getRequest().params

    //         if (!idTrail) throw new InvalidRequestParamsAppException("trail-class-controller", "61", "idTrail");
    //         if (!idTrailClass) throw new InvalidRequestParamsAppException("trail-class-controller", "62", "idTrailClass");

    //         const input: UnlockTrailClassInputDTO = {
    //             idTrail,
    //             idTrailClass
    //         }

    //         const output: UnlockTrailClassOutputDTO = await new UnlockTrailClassUseCase(this.trailRepository, this.trailClassRepository,).execute(input)

    //         return ctx.sendResponse(this.createSuccessResponse(output))

    //     } catch (error) {
    //         return ctx.sendResponse(this.createErrorResponse(error))
    //     }
    // }


    async deleteTrailClass(ctx: IHttpContext): Promise<IHttpResponse<DeleteTrailClassOutputDTO>> {
        try {
            const req = await ctx.getRequest()
            const { idTrail, idTrailClass } = req.params

            if (!idTrail) throw new InvalidRequestParamsAppException("trail-class-controller", "61", "idTrail");
            if (!idTrailClass) throw new InvalidRequestParamsAppException("trail-class-controller", "62", "idTrailClass");

            const input: DeleteTrailClassInputDTO = {
                idTrail,
                idTrailClass
            }

            const output: DeleteTrailClassOutputDTO = await new DeleteTrailClassUseCase(this.trailClassRepository, this.trailRepository).execute(input)

            return ctx.sendResponse(this.createSuccessResponse(output))

        } catch (error) {
            return ctx.sendResponse(this.createErrorResponse(error))
        }
    }



    // async listTrailClasses(ctx: IHttpContext): Promise<TrailClass[]> {
    //     try {
    //         const { idTrail } = ctx.getRequest().params

    //         if (!idTrail) throw new InvalidRequestParamsAppException("trail-class-controller", "61", "idTrail");

    //         const input: ListTrailClassesInputDTO = {
    //             idTrail
    //         }

    //         const output: ListTrailClassesOutputDTO = await new ListTrailClassesUseCase(this.trailRepository).execute(input)

    //         return ctx.sendResponse(this.createSuccessResponse(output))

    //     } catch (error) {
    //         return ctx.sendResponse(this.createErrorResponse(error))
    //     }
    // }

    // getClass(ctx: IHttpContext) {

    //     const { idTrail, idTrailClass } = ctx.getRequest().params()



    // }

}