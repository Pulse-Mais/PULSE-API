import {
    TrailClassNotFoundApplicationException,
    TrailNotFoundApplicationException,
    GenericUseCase,
    TrailClass,
    ITrailClassRepository,
    ITrailRepository,
    DeleteTrailClassInputDTO,
    DeleteTrailClassOutputDTO
} from "./index";

export class DeleteTrailClassUseCase extends GenericUseCase {

    constructor(
        private readonly trailClassRepository: ITrailClassRepository,
        private trailRepository: ITrailRepository
    ) {
        super("delete-trail-class-use-case.ts", "use-cases/educational-content-cases/trail/trail-class/delete-trail-class-use-case.ts");
    }

    async execute(input: DeleteTrailClassInputDTO): Promise<DeleteTrailClassOutputDTO> {

        const trail = await this.trailRepository.findById(input.idTrail)
        if (!trail) throw new TrailNotFoundApplicationException(this.filename, "26");

        const trailClass: TrailClass | null = trail.getTrailClassById(input.idTrailClass)
        if (!trailClass) throw new TrailClassNotFoundApplicationException(this.filename, "29");

        // TODO adicionar mail-service. No futuro, adicionar a remoção de todas as entidades do tipo progresso associadas a aula.

        const deletedTrailClass = await this.trailClassRepository.delete(trailClass)
        if (!deletedTrailClass) throw new Error("Criar exception. TrailClass not deleted on repository.")

        const output: DeleteTrailClassOutputDTO = {
            isDeleted: deletedTrailClass
        }
        return output
    }

}