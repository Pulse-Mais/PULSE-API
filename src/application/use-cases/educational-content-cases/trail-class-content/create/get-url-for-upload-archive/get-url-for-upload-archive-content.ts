 
import { TrailDomainService } from "@/domain/domain-services/trail/trail-domain-service";
import {
    ITrailClassRepository,
    ITrailRepository,
    TrailClassDomainService,
    IStorageService,
    TrailClassNotSavedOnRepositoryApplicationException,
    GetUrlForUploadClassArchiveInputDTO,
    GetUrlForUploadClassArchiveOutputDTO,
    TrailClassNotFoundOnTrailDomainException,
    TrailClass,
    TrailNotFoundApplicationException
} from "./index";

import { Trail } from "@/domain/entity/trail/trail-entity";
import { ContentArchiveValueObject } from "@/domain/entity/value-objects/content-archive-value-object";


export class GetUrlForUploadArchiveContent {

    constructor(
        private readonly trailRepository: ITrailRepository,
        private readonly trailClassRepository: ITrailClassRepository,
        private readonly storageService: IStorageService,
    ) { }

    async execute(input: GetUrlForUploadClassArchiveInputDTO): Promise<GetUrlForUploadClassArchiveOutputDTO> {
        const trailClassDomainService: TrailClassDomainService = new TrailClassDomainService();

        const trail: Trail | null = await this.trailRepository.findById(input.idTrail);
        if (!trail) {
            throw new TrailNotFoundApplicationException("get-url-for-upload-archive-content.ts", "33")
        }

        const trailClass: TrailClass | null = new TrailDomainService().getTrailClass({
            trail,
            idTrailClass: input.idTrailClass
        });
        
        if (!trailClass) {
            throw new TrailClassNotFoundOnTrailDomainException("get-url-for-upload-archive-content.ts", "37")
        }

        const inUploadContentArchive: ContentArchiveValueObject = trailClassDomainService.createInUploadContentArchiveValueObject(
            trailClass,
            input.archiveExtension
        );

        const endpointToUploadTrailClassContent: string = await this.storageService.getUrlForUploadArchiveContent(
            inUploadContentArchive.key
        )

        if (!endpointToUploadTrailClassContent) {
            throw new Error("Endpoint de upload não gerado pelo Storage Service")
        }

        const trailClassWithInUploadContentArchive: TrailClass = trailClassDomainService.updateContent(trailClass, inUploadContentArchive);

        const savedTrailClassWithUpdatedContent: TrailClass = await this.trailClassRepository.save(trailClassWithInUploadContentArchive);
        if (!savedTrailClassWithUpdatedContent) {
            throw new TrailClassNotSavedOnRepositoryApplicationException("get-url-for-upload-archive-content.ts", "57")
        }

        const output: GetUrlForUploadClassArchiveOutputDTO = {
            url: endpointToUploadTrailClassContent,
            content: inUploadContentArchive
        }

        return output
    }
}