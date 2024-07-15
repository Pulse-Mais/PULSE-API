import {
    ReadAllTrailClassesUseCaseInputDTO,
    ReadAllTrailClassesUseCaseOutputDTO,
    Trail,
    TrailDomainService,
    TrailNotFoundApplicationException,
    ReadAllTrailClassesUseCase,
    mockTrailRepository,
    generateFilledTrailClassToTests
} from "./index"


describe("UnitTest - ReadAllTrailClassesUseCase", () => {
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
        vi.spyOn(TrailDomainService.prototype, 'getTrailClasses').mockReturnValue([defaultTrailClass])
    })

    it("Deve retornar todas as aulas de uma trilha com sucesso", async () => {
        const readAllTrailClassesUseCase = new ReadAllTrailClassesUseCase(mockTrailRepository)

        const inputDTO: ReadAllTrailClassesUseCaseInputDTO = {
            idTrail: defaultTrail.getId()!,
        }

        const output: ReadAllTrailClassesUseCaseOutputDTO = await readAllTrailClassesUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.idTrail).toBe(defaultTrail.getId())
        expect(output.trailClasses).toEqual([defaultTrailClass])
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(defaultTrail.getId()!)
    })

    it("Deve lançar uma exceção quando a trilha não é encontrada", async () => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(null)

        const readAllTrailClassesUseCase = new ReadAllTrailClassesUseCase(mockTrailRepository)

        const inputDTO: ReadAllTrailClassesUseCaseInputDTO = {
            idTrail: "invalid-id",
        }

        await expect(readAllTrailClassesUseCase.execute(inputDTO)).rejects.toThrow(
            new TrailNotFoundApplicationException("read-all-trail-classes-use-case", "16")
        )
        expect(mockTrailRepository.findById).toHaveBeenCalledWith("invalid-id")
    })

    it("Deve retornar uma lista vazia se a trilha não tiver aulas", async () => {
        const trailWithoutClasses = Trail.create(defaultTrailInput)
  
        mockTrailRepository.findById = vi.fn().mockResolvedValue(trailWithoutClasses)
        vi.spyOn(TrailDomainService.prototype, 'getTrailClasses').mockReturnValue([])

        const readAllTrailClassesUseCase = new ReadAllTrailClassesUseCase(mockTrailRepository)

        const inputDTO: ReadAllTrailClassesUseCaseInputDTO = {
            idTrail: trailWithoutClasses.getId()!,
        }

        const output: ReadAllTrailClassesUseCaseOutputDTO = await readAllTrailClassesUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.idTrail).toBe(trailWithoutClasses.getId()!)
        expect(output.trailClasses).toEqual([])
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(trailWithoutClasses.getId()!)
    })
})
