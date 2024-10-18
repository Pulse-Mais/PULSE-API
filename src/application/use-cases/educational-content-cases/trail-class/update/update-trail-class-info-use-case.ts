import {
    Trail,
    TrailClass,
    TrailClassDomainService,
    ITrailClassRepository,
    ITrailRepository,
    TrailNotFoundApplicationException,
    TrailClassNotSavedOnRepositoryApplicationException,
    UpdateTrailClassInfoInputDTO,
    UpdateTrailClassInfoOutputDTO,
    TrailDomainService,
    InvalidTrailClassPropetyDomainException
} from "./index"


export class UpdateTrailClassInfoUseCase {

    constructor(
        private readonly trailRepository: ITrailRepository,
        private readonly trailClassRepository: ITrailClassRepository,
    ) { }

    async execute(input: UpdateTrailClassInfoInputDTO): Promise<UpdateTrailClassInfoOutputDTO> {
        const trail: Trail | null = await this.trailRepository.findById(input.idTrail);
        if (!trail) {
            throw new TrailNotFoundApplicationException("create-trail-class-use-case.ts", "34");
        }

        const trailClass = new TrailDomainService().getTrailClass({
            trail,
            idTrailClass: input.idTrailClass
        })

        // const updatedTrailClass: TrailClass = new TrailClassDomainService().updateTrailClassInfo({
        //     trailClass,
        //     title: input.newTitle,
        //     subtitle: input.newSubtitle,
        //     description: input.newDescription
        // })

        // const savedUpdatedTrailClass: TrailClass = await this.trailClassRepository.save(updatedTrailClass);
        // if (!savedUpdatedTrailClass) {
        //     throw new TrailClassNotSavedOnRepositoryApplicationException("create-trail-class-use-case.ts", "37");
        // }

        const idTrail = ''

        const idTrailClass = ''

        const title = ''

   

        const description = ''
        const output: UpdateTrailClassInfoOutputDTO = {
            idTrail,
            idTrailClass,
            title,
            
            description,
        };

        return output
    }
}
