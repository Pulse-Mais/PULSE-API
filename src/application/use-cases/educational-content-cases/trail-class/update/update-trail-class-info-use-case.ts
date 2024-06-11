import {
    Trail,
    TrailClass,
    TrailClassDomainService,
    ITrailClassRepository,
    ITrailRepository,
    TrailNotFoundApplicationException,
    TrailClassNotSavedOnRepositoryApplicationException,
    InvalidRequestParamsAppException,
    GenericUseCase,
    UpdateTrailClassInfoInputDTO,
    UpdateTrailClassInfoOutputDTO
} from "./index"


export class UpdateTrailClassInfoUseCase extends GenericUseCase {

    constructor(
        private readonly trailClassRepository: ITrailClassRepository,
        private readonly trailRepository: ITrailRepository
    ) {
        super("create-trail-class-use-case.ts", "src/application/use-cases/create-trail-class-use-case.ts");
    }

    async execute(input: UpdateTrailClassInfoInputDTO): Promise<UpdateTrailClassInfoOutputDTO>  {

        const trail: Trail | null = await this.trailRepository.findById(input.idTrail);
        if (!trail) throw new TrailNotFoundApplicationException(this.filename, "34");
    
        if (!input.idTrailClass) throw new InvalidRequestParamsAppException(this.filename, "36", "idTrailClass");

        const updated: TrailClass = new TrailClassDomainService().updateTrailClassInfo({
            idTrailClass: input.idTrailClass,
            title: input.newTitle,
            subtitle: input.newSubtitle,
            description: input.newDescription
        }, trail)

        const saved: TrailClass = await this.trailClassRepository.save(updated);
        if (!saved) throw new TrailClassNotSavedOnRepositoryApplicationException(this.filename, "37");
        
        const outputId = saved.getId();
        if (!outputId) throw new Error("ID is undefined");
        
        const title = saved.getTitle();
        if (title === undefined) throw new Error("Title is undefined");
        
        const subtitle = saved.getSubtitle();
        if (subtitle === undefined) throw new Error("Subtitle is undefined");
        
        const description = saved.getDescription();
        if (description === undefined) throw new Error("Description is undefined");
        
        const output: UpdateTrailClassInfoOutputDTO = {
            idTrail: outputId,
            title: title,
            subtitle: subtitle,
            description: description,
        };

        return output

    }

}