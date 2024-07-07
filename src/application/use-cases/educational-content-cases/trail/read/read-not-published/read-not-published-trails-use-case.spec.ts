import {
    Trail,
    ReadNotPublishedTrailsUseCaseOutputDTO,
    mockTrailRepository,
    ReadNotPublishedTrailsUseCase,
} from "./index"


describe("UnitTests - ReadNotPublishedTrailsUseCase", () => {

    const notPublishedTrail1 = Trail.create({
        title: "Título de teste 1",
        subtitle: "Subtítulo de teste 1",
        description: "Descrição de teste 1"
    })

    const notPublishedTrail2 = Trail.create({
        title: "Título de teste 2",
        subtitle: "Subtítulo de teste 2",
        description: "Descrição de teste 2"
    })

    const notPublishedTrails: Trail[] = [notPublishedTrail1, notPublishedTrail2]

    beforeEach(() => {
        mockTrailRepository.listNotPublished = vi.fn().mockResolvedValue(notPublishedTrails)
    })

    it("Deve retornar uma lista de trilhas não publicadas", async () => {
        const readNotPublishedTrailsUseCase = new ReadNotPublishedTrailsUseCase(mockTrailRepository)
        const output: ReadNotPublishedTrailsUseCaseOutputDTO = await readNotPublishedTrailsUseCase.execute()

        expect(output).toEqual({ trails: notPublishedTrails })
        expect(mockTrailRepository.listNotPublished).toHaveBeenCalled()
    })

    it("Deve retornar uma lista vazia quando não há trilhas não publicadas", async () => {
        mockTrailRepository.listNotPublished = vi.fn().mockResolvedValue([])

        const readNotPublishedTrailsUseCase = new ReadNotPublishedTrailsUseCase(mockTrailRepository)
        const output: ReadNotPublishedTrailsUseCaseOutputDTO = await readNotPublishedTrailsUseCase.execute()

        expect(output).toEqual({ trails: [] })
        expect(mockTrailRepository.listNotPublished).toHaveBeenCalled()
    })
})
