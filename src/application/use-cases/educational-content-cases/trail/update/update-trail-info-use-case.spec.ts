import {
    Trail,
    UpdateTrailInfoUseCaseInputDTO,
    UpdateTrailInfoUseCaseOutputDTO,
    TrailNotFoundApplicationException,
    mockTrailRepository,
    UpdateTrailInfoUseCase,
} from "./index"


describe("UnitTests - UpdateTrailInfoUseCase", () => {

    const defaultTrail = Trail.create({
        title: "Título de teste",
        subtitle: "Subtítulo de teste",
        description: "Descrição de teste"
    })

    beforeEach(() => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(defaultTrail)
        mockTrailRepository.save = vi.fn().mockImplementation(async (trail) => trail)
    })

    it("Deve atualizar as informações da trilha", async () => {
        const updateTrailInfoUseCase = new UpdateTrailInfoUseCase(mockTrailRepository)
        const inputDTO: UpdateTrailInfoUseCaseInputDTO = {
            idTrail: `${defaultTrail.getId()}`,
            newTitle: 'Novo Título',
            newSubtitle: 'Novo Subtítulo',
            newDescription: 'Nova Descrição'
        }

        const output: UpdateTrailInfoUseCaseOutputDTO = await updateTrailInfoUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.updatedTrail).toBeTruthy()

        const trail = output.updatedTrail   
        expect(trail.getTitle()).toBe("Novo Título")
        expect(trail.getSubtitle()).toBe("Novo Subtítulo")
        expect(trail.getDescription()).toBe("Nova Descrição")

        expect(mockTrailRepository.findById).toHaveBeenCalledWith(`${defaultTrail.getId()}`)
        expect(mockTrailRepository.save).toHaveBeenCalledWith(trail)
    })

    it("Deve atualizar somente o título, caso só ele seja informado", async () => {
        const updateTrailInfoUseCase = new UpdateTrailInfoUseCase(mockTrailRepository)

        const trailWithTitleUpdated = Trail.create({
            title: "Título de teste",
            subtitle: "Subtítulo de teste",
            description: "Descrição de teste"
        })

        mockTrailRepository.findById = vi.fn().mockResolvedValue(trailWithTitleUpdated)
        mockTrailRepository.save = vi.fn().mockResolvedValue(trailWithTitleUpdated)

        const inputDTO: UpdateTrailInfoUseCaseInputDTO = {
            idTrail: `${trailWithTitleUpdated.getId()}`,
            newTitle: 'Novo Título 2',
        }

        const output: UpdateTrailInfoUseCaseOutputDTO = await updateTrailInfoUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.updatedTrail).toBeTruthy()

        const trail = output.updatedTrail   
        expect(trail.getTitle()).toBe("Novo Título 2")
        expect(trail.getSubtitle()).toBe("Subtítulo de teste")
        expect(trail.getDescription()).toBe("Descrição de teste")

        expect(mockTrailRepository.findById).toHaveBeenCalledWith(`${trailWithTitleUpdated.getId()}`)
        expect(mockTrailRepository.save).toHaveBeenCalledWith(trail)
    })

    it("Deve atualizar somente o subtítulo, caso só ele seja informado", async () => {
        const updateTrailInfoUseCase = new UpdateTrailInfoUseCase(mockTrailRepository)

        const trailWithSubtitleUpdated = Trail.create({
            title: "Título de teste",
            subtitle: "Subtítulo de teste",
            description: "Descrição de teste"
        })

        mockTrailRepository.findById = vi.fn().mockResolvedValue(trailWithSubtitleUpdated)

        const inputDTO: UpdateTrailInfoUseCaseInputDTO = {
            idTrail: `${trailWithSubtitleUpdated.getId()}`,
            newSubtitle: 'Novo Subtítulo 2',
        }

        const output: UpdateTrailInfoUseCaseOutputDTO = await updateTrailInfoUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.updatedTrail).toBeTruthy()

        const trail = output.updatedTrail   
        expect(trail.getTitle()).toBe("Título de teste")
        expect(trail.getSubtitle()).toBe("Novo Subtítulo 2")
        expect(trail.getDescription()).toBe("Descrição de teste")

        expect(mockTrailRepository.findById).toHaveBeenCalledWith(`${trailWithSubtitleUpdated.getId()}`)
        expect(mockTrailRepository.save).toHaveBeenCalledWith(trail)
    })

    it("Deve atualizar somente a descrição, caso só ela seja informada", async () => {
        const updateTrailInfoUseCase = new UpdateTrailInfoUseCase(mockTrailRepository)

        const trailWithDescriptionUpdated = Trail.create({
            title: "Título de teste",
            subtitle: "Subtítulo de teste",
            description: "Descrição de teste"
        })

        mockTrailRepository.findById = vi.fn().mockResolvedValue(trailWithDescriptionUpdated)

        const inputDTO: UpdateTrailInfoUseCaseInputDTO = {
            idTrail: `${defaultTrail.getId()}`,
            newDescription: 'Nova Descrição 2',
        }

        const output: UpdateTrailInfoUseCaseOutputDTO = await updateTrailInfoUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.updatedTrail).toBeTruthy()

        const trail = output.updatedTrail   
        expect(trail.getTitle()).toBe("Título de teste")
        expect(trail.getSubtitle()).toBe("Subtítulo de teste")
        expect(trail.getDescription()).toBe("Nova Descrição 2")

        expect(mockTrailRepository.findById).toHaveBeenCalledWith(`${defaultTrail.getId()}`)
        expect(mockTrailRepository.save).toHaveBeenCalledWith(trail)
    })

    it("Deve lançar uma exceção quando a trilha não é encontrada", async () => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(null)

        const updateTrailInfoUseCase = new UpdateTrailInfoUseCase(mockTrailRepository)
        const inputDTO: UpdateTrailInfoUseCaseInputDTO = {
            idTrail: '1',
            newTitle: 'Novo Título',
            newSubtitle: 'Novo Subtítulo',
            newDescription: 'Nova Descrição'
        }

        await expect(updateTrailInfoUseCase.execute(inputDTO)).rejects.toThrow(
            new TrailNotFoundApplicationException(
                "update-trail-info-use-case.ts",
                "13"
            )
        )
        expect(mockTrailRepository.findById).toHaveBeenCalledWith('1')
    })
})
