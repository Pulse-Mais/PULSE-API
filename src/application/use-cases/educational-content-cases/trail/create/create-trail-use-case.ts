import {
    Trail,
    ITrailRepository,
    TrailDomainService,
    GenericUseCase,
    IStorageService,
    CreateTrailInputDTO
} from "./index"

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

        if (!trailStorageKey) throw new Error("Storage Key is undefined");

        if (!(await this.storageService.createTrailFolder(trailStorageKey))) {
            throw new Error("Não criou a partição da trilha no storage!");
        }

        const saved = await this.trailRepository.save(trail)
        if (!saved) throw new Error("Não salvou no banco!");

        return saved
    }
}
