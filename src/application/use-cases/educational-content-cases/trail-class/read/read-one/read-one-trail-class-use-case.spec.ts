 
import {
    Trail,
    TrailNotFoundApplicationException,
    ReadOneTraillClassUseCase,
    ReadOneTraillClassUseCaseInputDTO,
    ReadOneTraillClassUseCaseOutputDTO,
    mockTrailRepository,
    generateFilledTrailClassToTests,
    TrailClassNotFoundOnTrailDomainException
} from "./index"


describe("ReadOneTraillClassUseCase", () => {
    const defaultTrailInput = {
        title: "Válido Title",
        subtitle: "Trail Subtitle",
        description: "Trail Description"
    }
    
    const defaultTrail = Trail.create(defaultTrailInput)
    const defaultTrailClass = generateFilledTrailClassToTests(defaultTrail.getId()!)

    defaultTrail.setTrailClasses([defaultTrailClass])

    beforeEach(() => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(defaultTrail)
    })

    it("Deve retornar uma aula de trilha específica com sucesso", async () => {
        const readOneTraillClassUseCase = new ReadOneTraillClassUseCase(mockTrailRepository)

        const inputDTO: ReadOneTraillClassUseCaseInputDTO = {
            idTrail: defaultTrail.getId()!,
            idTrailClass: defaultTrailClass.getId()!,
        }

        const output: ReadOneTraillClassUseCaseOutputDTO = await readOneTraillClassUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.trailClass).toEqual(defaultTrailClass)
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(defaultTrail.getId()!)
    })

    it("Deve lançar uma exceção quando a trilha não é encontrada", async () => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(null)
        const readOneTraillClassUseCase = new ReadOneTraillClassUseCase(mockTrailRepository)

        const inputDTO: ReadOneTraillClassUseCaseInputDTO = {
            idTrail: "invalid-id",
            idTrailClass: "invalid-class-id"
        }

        await expect(readOneTraillClassUseCase.execute(inputDTO)).rejects.toThrow(
            new TrailNotFoundApplicationException("read-one-traill-class-use-case", "36")
        )
        expect(mockTrailRepository.findById).toHaveBeenCalledWith("invalid-id")
    })

    it("Deve lançar uma exceção quando a aula não é encontrada na trilha", async () => {
        const trailWithoutClasses = Trail.create(defaultTrailInput)
        trailWithoutClasses.setId(defaultTrail.getId()!)
        mockTrailRepository.findById = vi.fn().mockResolvedValue(trailWithoutClasses)
        

        const readOneTraillClassUseCase = new ReadOneTraillClassUseCase(mockTrailRepository)

        const inputDTO: ReadOneTraillClassUseCaseInputDTO = {
            idTrail: trailWithoutClasses.getId()!,
            idTrailClass: "invalid-class-id"
        }

        await expect(readOneTraillClassUseCase.execute(inputDTO)).rejects.toThrow(
            new TrailClassNotFoundOnTrailDomainException("read-one-traill-class-use-case", "36")
        )
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(trailWithoutClasses.getId()!)
    })
})
