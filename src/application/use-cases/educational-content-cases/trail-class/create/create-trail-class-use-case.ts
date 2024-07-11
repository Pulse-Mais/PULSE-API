import { InvalidTrailPropetyDomainException } from "@/domain/domain-exception/invalid-trail-propety-domain-exception";
import {
    Trail,
    TrailClass,
    TrailClassDomainService,
    ITrailClassRepository,
    ITrailRepository,
    TrailNotFoundApplicationException,
    TrailFolderNotAvaibilityApplicationException,
    TrailClassStorageKeyEmptyApplicationException,
    TrailClassPartionNotCreatedApplicationException,
    TrailClassNotSavedOnRepositoryApplicationException,
    CreateTrailClassInputDTO,
    CreateTrailClassOutputDTO
} from "./index";


export class CreateTrailClassUseCase {

    constructor(
        private readonly trailClassRepository: ITrailClassRepository,
        private readonly trailRepository: ITrailRepository,
    ) { }

    async execute(input: CreateTrailClassInputDTO): Promise<CreateTrailClassOutputDTO> {

        const trail: Trail | null = await this.trailRepository.findById(input.idTrail);
        if (!trail) {
            throw new TrailNotFoundApplicationException("create-trail-class-use-case", "36");
        }

        const idTrail: string | undefined = trail.getId()
        if (!idTrail) {
            throw new InvalidTrailPropetyDomainException("create-trail-class-use-case", "36", "idTrail")
        }


        const trailClass: TrailClass = new TrailClassDomainService().createTrailClass({
            idTrail,
            title: input.title,
            subtitle: input.subtitle,
            description: input.description,
            duration: input.duration
        });


        const saved = await this.trailClassRepository.save(trailClass);
        if (!saved) throw new TrailClassNotSavedOnRepositoryApplicationException("aaaaaaaaaaaaaa", "58");

        const outputId = saved.getId();
        if (!outputId) throw new Error("ID is undefined");

        const status = saved.getStatus();
        if (status === undefined) throw new Error("Status is undefined");

        const title = saved.getTitle();
        if (title === undefined) throw new Error("Title is undefined");

        const subtitle = saved.getSubtitle();
        if (subtitle === undefined) throw new Error("Subtitle is undefined");

        const description = saved.getDescription();
        if (description === undefined) throw new Error("Description is undefined");

        const output: CreateTrailClassOutputDTO = {
            idTrail: outputId,
            status: status,
            title: title,
            subtitle: subtitle,
            description: description,
        };

        return output
    }

}



