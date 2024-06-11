import { Trail } from "../../../../../domain/entity/trail/trail-entity";
import { ITrailRepository } from "../../../../../domain/repository/ITrail-Repository";
import { TrailDomainService } from "../../../../../domain/domain-services/trail-domain-service";
import { GenericUseCase } from "../../../gereric-use-case";
import { IStorageService } from "../../../../interfaces/IStorage-service";
import { CreateTrailInputDTO } from "./dto/create-trail-input-dto";

export class CreateTrailUseCase extends GenericUseCase {

    constructor(
        private readonly trailRepository: ITrailRepository,
        private readonly storageService: IStorageService
    ) {
        super("create-class-use-case.ts", "src/application/use-cases/create-class-use-case.ts");
    }

    async execute(input: CreateTrailInputDTO): Promise<Trail> {

        const trail = new TrailDomainService().createTrail(input);
        const trailStorageKey = trail.getStorageKey()

        if (!trailStorageKey) throw new Error("Criar exception!");

        if (!(await this.storageService.createTrailFolder(trailStorageKey))) {
          
            throw new Error("Criar exception!");
        }

        const saved = await this.trailRepository.save(trail)
        if (!saved) throw new Error("Criar exception!");
       
        return saved
    }
}
