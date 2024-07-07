import {
    Trail,
    ReadPublishedTrailsUseCaseOutputDTO,
    mockTrailRepository,
    ReadPublishedTrailsUseCase,
} from "./index"


describe("UnitTests - ReadPublishedTrailsUseCase", () => {

    const publishedTrail1 = Trail.create({
        title: "Título de teste 1",
        subtitle: "Subtítulo de teste 1",
        description: "Descrição de teste 1"
    })

    const publishedTrail2 = Trail.create({
        title: "Título de teste 2",
        subtitle: "Subtítulo de teste 2",
        description: "Descrição de teste 2"
    })

    const publishedTrails: Trail[] = [publishedTrail1, publishedTrail2]

    beforeEach(() => {
        mockTrailRepository.listPublished = vi.fn().mockResolvedValue(publishedTrails)
    })

    it("Deve retornar uma lista de trilhas publicadas", async () => {
        const readPublishedTrailsUseCase = new ReadPublishedTrailsUseCase(mockTrailRepository)
        const output: ReadPublishedTrailsUseCaseOutputDTO = await readPublishedTrailsUseCase.execute()

        expect(output).toEqual({ trails: publishedTrails })
        expect(mockTrailRepository.listPublished).toHaveBeenCalled()
    })

    it("Deve retornar uma lista vazia quando não há trilhas publicadas", async () => {
        mockTrailRepository.listPublished = vi.fn().mockResolvedValue([])

        const readPublishedTrailsUseCase = new ReadPublishedTrailsUseCase(mockTrailRepository)
        const output: ReadPublishedTrailsUseCaseOutputDTO = await readPublishedTrailsUseCase.execute()

        expect(output).toEqual({ trails: [] })
        expect(mockTrailRepository.listPublished).toHaveBeenCalled()
    })
})
