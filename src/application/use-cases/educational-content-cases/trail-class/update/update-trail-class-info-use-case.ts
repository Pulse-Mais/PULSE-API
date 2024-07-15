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

        const updatedTrailClass: TrailClass = new TrailClassDomainService().updateTrailClassInfo({
            trailClass,
            title: input.newTitle,
            subtitle: input.newSubtitle,
            description: input.newDescription
        })

        const savedUpdatedTrailClass: TrailClass = await this.trailClassRepository.save(updatedTrailClass);
        if (!savedUpdatedTrailClass) {
            throw new TrailClassNotSavedOnRepositoryApplicationException("create-trail-class-use-case.ts", "37");
        }

        const idTrail = savedUpdatedTrailClass.getIdTrail();
        if (!idTrail) {
            throw new InvalidTrailClassPropetyDomainException("create-trail-class-use-case.ts", "40", "idTrail");
        }

        const idTrailClass = savedUpdatedTrailClass.getId();
        if (!idTrailClass) {
            throw new InvalidTrailClassPropetyDomainException("create-trail-class-use-case.ts", "41", "idTrailClass");
        }

        const title = savedUpdatedTrailClass.getTitle();
        if (title === undefined) {
            throw new InvalidTrailClassPropetyDomainException("create-trail-class-use-case.ts", "38", "title");
        }

        const subtitle = savedUpdatedTrailClass.getSubtitle();
        if (subtitle === undefined) {
            throw new InvalidTrailClassPropetyDomainException("create-trail-class-use-case.ts", "43", "subtitle");
        }

        const description = savedUpdatedTrailClass.getDescription();
        if (description === undefined) {
            throw new InvalidTrailClassPropetyDomainException("create-trail-class-use-case.ts", "48", "description");
        }

        const output: UpdateTrailClassInfoOutputDTO = {
            idTrail,
            idTrailClass,
            title,
            subtitle,
            description,
        };

        return output
    }
}
