import {
    Trail,
    ReadManyTrailsUseCaseOutputDTO,
    ReadManyTrailsUseCase,
    mockTrailRepository
} from "./index"


describe("UnitTests - ReadManyTrailsUseCase", () => {

    const defaultTrail = Trail.create({
        title: "Título de teste",
        subtitle: "Subtítulo de teste",
        description: "Descrição de teste"
    })

    const defaultTrails: Trail[] = [defaultTrail, defaultTrail]

    beforeEach(() => {
        mockTrailRepository.list = vi.fn().mockResolvedValue(defaultTrails)
    })

    it("Deve retornar uma lista de trilhas", async () => {
        const readManyTrailsUseCase = new ReadManyTrailsUseCase(mockTrailRepository)
        const output: ReadManyTrailsUseCaseOutputDTO = await readManyTrailsUseCase.execute()

        expect(output).toEqual({ trails: defaultTrails })
        expect(mockTrailRepository.list).toHaveBeenCalled()
    })

    it("Deve retornar uma lista vazia quando não há trilhas", async () => {
        mockTrailRepository.list = vi.fn().mockResolvedValue([])

        const readManyTrailsUseCase = new ReadManyTrailsUseCase(mockTrailRepository)
        const output: ReadManyTrailsUseCaseOutputDTO = await readManyTrailsUseCase.execute()

        expect(output).toEqual({ trails: [] })
        expect(mockTrailRepository.list).toHaveBeenCalled()
    })
})
