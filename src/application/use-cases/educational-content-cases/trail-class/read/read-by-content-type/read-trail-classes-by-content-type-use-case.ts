import {
    Trail,
    TrailClass,
    TrailDomainService,
    TrailNotFoundApplicationException,
    ReadTrailClassesByContentTypeUseCaseInputDTO,
    ReadTrailClassesByContentTypeUseCaseOutputDTO,
    ITrailRepository
} from "./index";


export class ReadTrailClassesByContentTypeUseCase {
    constructor(private readonly trailRepository: ITrailRepository) { }

    async execute(input: ReadTrailClassesByContentTypeUseCaseInputDTO): Promise<ReadTrailClassesByContentTypeUseCaseOutputDTO> {
        const trail: Trail | null = await this.trailRepository.findById(input.idTrail);
        if (!trail) {
            throw new TrailNotFoundApplicationException("read-trail-classes-by-content-type-use-case.ts", "13");
        }

        enum ContentType {
            archive = "ContentArchiveValueObject",
            empty = "ContentEmptyValueObject",
            video = "ContentVideoValueObject",
            article = "ContentArticleValueObject"
        }
 
        const trailClasses: TrailClass[] = new TrailDomainService().getTrailClassesByContentType({
            trail,
            contentType: ContentType[input.contentType]
        });

        const output: ReadTrailClassesByContentTypeUseCaseOutputDTO = {
            trailClasses
        }

        return output;
    }
}   
