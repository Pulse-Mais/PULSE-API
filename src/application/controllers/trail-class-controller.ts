import { GetUrlForUploadClassArchiveInputDTO } from '@/application/use-cases/educational-content-cases/trail-class-content/get-url-for-upload-archive/dto/get-url-for-upload-archive-content-input-dto';
import { UpdateTrailClassArchiveContentUseCase } from './../use-cases/educational-content-cases/trail-class-content/update-archive-content/update-course-archive-content-use-case';
import { GetUrlForUploadClassArchiveOutputDTO } from './../use-cases/educational-content-cases/trail-class-content/get-url-for-upload-archive/dto/get-url-for-upload-archive-content-output-dto';

import { UnlockTrailClassInputDTO } from '../use-cases/educational-content-cases/trail-class/unlock/dto/unlock-trail-class-input-dto';
import { IHttpContext } from "@/infra/port/http/IHttp-context";
import { ITrailClassRepository } from "@/domain/repository/ITrail-class-Repository";
import { ITrailRepository } from "@/domain/repository/ITrail-Repository";
import { IHttpResponse } from "@/infra/port/http/IHttp-response";
import { CreateTrailClassUseCase } from "../use-cases/educational-content-cases/trail-class/create/create-trail-class-use-case";
import { GenericController } from "./generic-controller";
import { TrailClass } from "@/domain/entity/trail-class/trail-class-entity";
import { IStorageService } from "../interfaces/IStorage-service";
import { GetUrlForUploadArchiveContent } from "../use-cases/educational-content-cases/trail-class-content/get-url-for-upload-archive/get-url-for-upload-archive-content";
import { TrailClassDomainService } from "../../domain/domain-services/trail-class-domain-service"
import { GetUrlForUploadVideoContent } from "@/application/use-cases/educational-content-cases/trail-class-content/get-url-for-upload-video/get-url-for-upload-video-content";
import { IVideoService } from "../interfaces/IVideo-service";

import { InvalidRequestParamsAppException } from "../application-exceptions/invalid-request-params-app-exception";
import { UpdateTrailClassInfoUseCase } from "../use-cases/educational-content-cases/trail-class/update/update-trail-class-info-use-case";
import { PublishTrailClassUseCase } from "../use-cases/educational-content-cases/trail-class/publish/publish-trail-class-use-case";
import { UnlockTrailClassUseCase } from "../use-cases/educational-content-cases/trail-class/unlock/unlock-trail-class-use-case";
import { DeleteTrailClassUseCase } from "../use-cases/educational-content-cases/trail-class/delete/delete-trail-class-use-case";
import { UpdateTrailClassVideoContentUseCase } from "@/application/use-cases/educational-content-cases/trail-class-content/update-video-content/update-course-video-content-use-case";
import { CreateTrailClassOutputDTO } from "../use-cases/educational-content-cases/trail-class/create/dto/create-trail-class-output-dto";
import { CreateTrailClassInputDTO } from "../use-cases/educational-content-cases/trail-class/create/dto/create-trail-class-input-dto";
import { UpdateTrailClassInfoInputDTO, UpdateTrailClassInfoOutputDTO } from "../use-cases/educational-content-cases/trail-class/update";
import { UnlockTrailClassOutputDTO } from "../use-cases/educational-content-cases/trail-class/unlock";
import { DeleteTrailClassInputDTO, DeleteTrailClassOutputDTO } from '../use-cases/educational-content-cases/trail-class/delete';
import { UpdateTrailClassArchiveContentInputDTO, UpdateTrailClassArchiveContentOutputDTO } from '../use-cases/educational-content-cases/trail-class-content/update-archive-content';
import { GetUrlForUploadClassVideoContentOutputDTO } from '../use-cases/educational-content-cases/trail-class-content/get-url-for-upload-video/dto/get-url-for-upload-video-content-output-dto';
import { GetUrlForUploadTrailClassVideoContentInputDTO } from '../use-cases/educational-content-cases/trail-class-content/get-url-for-upload-video/dto/get-url-for-upload-video-content-input-dto';
import { UpdateTrailClassVideoContentOutputDTO } from '../use-cases/educational-content-cases/trail-class-content/update-video-content/dto/update-trail-class-video-content-output-dto';
import { ListTrailClassesInputDTO } from '../use-cases/educational-content-cases/trail-class/read/list-trail-classes-use-case/dto/list-trail-classes-input-DTO';
import { ListTrailClassesOutputDTO } from '../use-cases/educational-content-cases/trail-class/read/list-trail-classes-use-case/dto/list-trail-classes-output-DTO';
import { ListTrailClassesUseCase } from '../use-cases/educational-content-cases/trail-class/read/list-trail-classes-use-case/list-trail-classes-use-case';
import { PublishTrailClassOutputDTO } from '../use-cases/educational-content-cases/trail-class/publish/dto/publish-trail-class-output-dto';
import { PublishTrailClassInputDTO } from '../use-cases/educational-content-cases/trail-class/publish/dto/publish-trail-class-input-dto';
import { UpdateTrailClassVideoContentInputDTO } from '../use-cases/educational-content-cases/trail-class-content/update-video-content/dto/update-trail-class-video-content-input-dto';
import { GetTrailClassOutputDTO } from '../use-cases/educational-content-cases/trail-class/read/get-trail-class-use-case/dto/get-trail-class-output-DTO';
import { GetTrailClassInputDTO } from '../use-cases/educational-content-cases/trail-class/read/get-trail-class-use-case/dto/get-trail-class-input-DTO';
import { GetTrailClassUseCase } from '../use-cases/educational-content-cases/trail-class/read/get-trail-class-use-case/get-trail-class-use-case';

export class TrailClassControler extends GenericController {

    constructor(
        private readonly trailRepository: ITrailRepository,
        private readonly trailClassRepository: ITrailClassRepository,
        private readonly storageService: IStorageService,
        private readonly videoService: IVideoService
    ) {
        super();
    }

    async createTrailClass(ctx: IHttpContext): Promise<IHttpResponse<CreateTrailClassOutputDTO>> {

        try {

            const data = ctx.getRequest().body
            const { idTrail } = ctx.getRequest().params
            if (!idTrail) throw new InvalidRequestParamsAppException("trail-class-controller", "36", "idTrail");

            const input: CreateTrailClassInputDTO = {
                idTrail,
                title: data.title,
                subtitle: data.subtitle,
                description: data.description,
                trailStorageKey: data.trailStorageKey
            }

            const output: CreateTrailClassOutputDTO = await new CreateTrailClassUseCase(this.trailClassRepository, this.trailRepository, this.storageService).execute(input)

            return ctx.sendResponse(this.createSuccessResponse(output))

        } catch (error) {
            return ctx.sendResponse(this.createErrorResponse(error))
        }
    }

    async getTrailClass(ctx: IHttpContext): Promise<IHttpResponse<GetTrailClassOutputDTO>> {

        try {

            const { idTrail, idTrailClass } = ctx.getRequest().params
            if (!idTrail) throw new InvalidRequestParamsAppException("trail-class-controller", "36", "idTrail");
            if (!idTrailClass) throw new InvalidRequestParamsAppException("trail-class-controller", "36", "idTrailClass");

            const input: GetTrailClassInputDTO = {
                idTrail,
                idTrailClass
            }

            const output: GetTrailClassOutputDTO = await new GetTrailClassUseCase(this.trailRepository).execute(input)

            return ctx.sendResponse(this.createSuccessResponse(output))

        } catch (error) {
            return ctx.sendResponse(this.createErrorResponse(error))
        }
    }

    async updateTrailClassInfo(ctx: IHttpContext): Promise<IHttpResponse<UpdateTrailClassInfoOutputDTO>> {

        try {
            const data = ctx.getRequest().body
            const { idTrail, idTrailClass } = ctx.getRequest().params

            if (!idTrail) throw new InvalidRequestParamsAppException("trail-class-controller", "61", "idTrail");
            if (!idTrailClass) throw new InvalidRequestParamsAppException("trail-class-controller", "62", "idTrailClass");

            const input: UpdateTrailClassInfoInputDTO = {
                idTrail,
                idTrailClass,
                newTitle: data.newTitle,
                newSubtitle: data.newSubtitle,
                newDescription: data.newDescription
            }

            const output: UpdateTrailClassInfoOutputDTO = await new UpdateTrailClassInfoUseCase(this.trailClassRepository, this.trailRepository).execute(input)

            return ctx.sendResponse(this.createSuccessResponse(output))

        } catch (error) {
            return ctx.sendResponse(this.createErrorResponse(error))
        }
    }

    async publishTrailClass(ctx: IHttpContext): Promise<IHttpResponse<PublishTrailClassOutputDTO>> {
        try {
            const { idTrail, idTrailClass } = ctx.getRequest().params
            const unlockDate = ctx.getRequest().body.unlockDate

            if (!idTrail) throw new InvalidRequestParamsAppException("trail-class-controller", "61", "idTrail");
            if (!idTrailClass) throw new InvalidRequestParamsAppException("trail-class-controller", "62", "idTrailClass");
            if (!unlockDate) throw new InvalidRequestParamsAppException("trail-class-controller", "63", "unlockDate");

            const input: PublishTrailClassInputDTO = {
                idTrail,
                idTrailClass,
                unlockDate
            }

            const output: PublishTrailClassOutputDTO = await new PublishTrailClassUseCase(this.trailRepository, this.trailClassRepository,).execute(input)

            return ctx.sendResponse(this.createSuccessResponse(output))

        } catch (error) {
            return ctx.sendResponse(this.createErrorResponse(error))
        }

    }

    async unlockTrailClass(ctx: IHttpContext): Promise<IHttpResponse<UnlockTrailClassOutputDTO>> {
        try {
            const { idTrail, idTrailClass } = ctx.getRequest().params

            if (!idTrail) throw new InvalidRequestParamsAppException("trail-class-controller", "61", "idTrail");
            if (!idTrailClass) throw new InvalidRequestParamsAppException("trail-class-controller", "62", "idTrailClass");

            const input: UnlockTrailClassInputDTO = {
                idTrail,
                idTrailClass
            }

            const output: UnlockTrailClassOutputDTO = await new UnlockTrailClassUseCase(this.trailRepository, this.trailClassRepository,).execute(input)

            return ctx.sendResponse(this.createSuccessResponse(output))

        } catch (error) {
            return ctx.sendResponse(this.createErrorResponse(error))
        }
    }


    async deleteTrailClass(ctx: IHttpContext): Promise<IHttpResponse<DeleteTrailClassOutputDTO>> {
        try {
            const { idTrail, idTrailClass } = ctx.getRequest().params

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

    async getUrlForUploadArchiveContent(ctx: IHttpContext): Promise<IHttpResponse<GetUrlForUploadClassArchiveOutputDTO>> {

        const { trailClassRepository, trailRepository, createSuccessResponse, createErrorResponse } = this;

        try {

            const { idTrail, idTrailClass } = ctx.getRequest().params;
            const { archiveExtension, format, type } = ctx.getRequest().body

            const input: GetUrlForUploadClassArchiveInputDTO = {
                idTrailClass,
                idTrail,
                archiveExtension: archiveExtension,
                format: format,
                type: type
            }

            const output: GetUrlForUploadClassArchiveOutputDTO = await new GetUrlForUploadArchiveContent(trailClassRepository, trailRepository, this.storageService, new TrailClassDomainService()).execute(input);

            return ctx.sendResponse(createSuccessResponse(output));

        } catch (error) {
            return ctx.sendResponse(createErrorResponse(error));
        }
    }

    async archiveContentCreated(ctx: IHttpContext): Promise<IHttpResponse<UpdateTrailClassArchiveContentOutputDTO>> {

        try {

            const data = ctx.getRequest().body
            const idTrailClass = data.idTrailClass
            const idTrail = data.idTrail

            if (!idTrail) throw new InvalidRequestParamsAppException("trail-class-controller", "180", "idTrail");
            if (!idTrailClass) throw new InvalidRequestParamsAppException("trail-class-controller", "181", "idTrailClass");

            const input: UpdateTrailClassArchiveContentInputDTO = {
                idTrail,
                idTrailClass
            }

            console.log()

            const output: UpdateTrailClassArchiveContentOutputDTO = await new UpdateTrailClassArchiveContentUseCase(this.trailRepository, this.trailClassRepository, new TrailClassDomainService()).execute(input)

            return ctx.sendResponse(this.createSuccessResponse(output))
        } catch (error) {
            return ctx.sendResponse(this.createErrorResponse(error))
        }

    }

    async getUrlForUploadVideoContent(ctx: IHttpContext): Promise<IHttpResponse<GetUrlForUploadClassVideoContentOutputDTO>> {


        try {
            const { idTrail, idTrailClass } = ctx.getRequest().params

            if (!idTrail) throw new InvalidRequestParamsAppException("trail-class-controller", "180", "idTrail");
            if (!idTrailClass) throw new InvalidRequestParamsAppException("trail-class-controller", "181", "idTrailClass");

            const input: GetUrlForUploadTrailClassVideoContentInputDTO = {
                idTrail,
                idTrailClass,
            }
            const output: GetUrlForUploadClassVideoContentOutputDTO = await new GetUrlForUploadVideoContent(this.trailRepository, this.trailClassRepository, this.videoService, new TrailClassDomainService).execute(input);

            return ctx.sendResponse(this.createSuccessResponse(output));

        } catch (error) {
            return ctx.sendResponse(this.createErrorResponse(error));
        }
    }

    async videoContentCreated(ctx: IHttpContext) {
        try {
            const data = ctx.getRequest().body

            const idTrailClassContentUpload = data.idContentUpload
            if (!idTrailClassContentUpload) throw new InvalidRequestParamsAppException("trail-class-controller", "219", "idContentUpload")

            const newKey = data.newKey
            if (!newKey) throw new InvalidRequestParamsAppException("trail-class-controller", "222", "newKey")

            const input: UpdateTrailClassVideoContentInputDTO = {
                idTrailClassContentUpload,
                newKey
            }

            const output: UpdateTrailClassVideoContentOutputDTO = await new UpdateTrailClassVideoContentUseCase(this.trailRepository, this.trailClassRepository, new TrailClassDomainService()).execute(input)

            return ctx.sendResponse(this.createSuccessResponse(output))
        } catch (error) {
            return ctx.sendResponse(this.createErrorResponse(error))
        }
    }


    async listTrailClasses(ctx: IHttpContext): Promise<TrailClass[]> {
        try {
            const { idTrail } = ctx.getRequest().params

            if (!idTrail) throw new InvalidRequestParamsAppException("trail-class-controller", "61", "idTrail");

            const input: ListTrailClassesInputDTO = {
                idTrail
            }

            const output: ListTrailClassesOutputDTO = await new ListTrailClassesUseCase(this.trailRepository).execute(input)

            return ctx.sendResponse(this.createSuccessResponse(output))

        } catch (error) {
            return ctx.sendResponse(this.createErrorResponse(error))
        }
    }

    getClass(ctx: IHttpContext) {

        const { idTrail, idTrailClass } = ctx.getRequest().params()



    }

}