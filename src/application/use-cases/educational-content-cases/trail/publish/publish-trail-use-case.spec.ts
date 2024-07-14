import { generatePublishedTrailClass } from "@/utils/generate-published-trail-class-tests"
import {
    Trail,
    PublishTrailUseCaseInputDTO,
    PublishTrailUseCaseOutputDTO,
    TrailNotFoundApplicationException,
    mockTrailRepository,
    PublishTrailUseCase,
    TrailClass,
    CreateTrailClassInput,
    ContentArchiveValueObject
} from "./index"


describe("UnitTests - PublishTrailUseCase", () => {

    beforeEach(() => {
        mockTrailRepository.save = vi.fn().mockImplementation(async (trail) => trail)
    })

    it("Deve publicar a trilha", async () => {
        const publishTrailUseCase = new PublishTrailUseCase(mockTrailRepository)

        const defaultTrail = Trail.create({
            title: "Título de teste",
            subtitle: "Subtítulo de teste",
            description: "Descrição de teste"
        })

        defaultTrail.setTrailClasses([
            generatePublishedTrailClass(defaultTrail.getId()!)
        ])

        mockTrailRepository.findById = vi.fn().mockResolvedValue(defaultTrail)

        const inputDTO: PublishTrailUseCaseInputDTO = {
            idTrail: `${defaultTrail.getId()}`
        }

        const output: PublishTrailUseCaseOutputDTO = await publishTrailUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.publishedTrail).toBeTruthy()

        const trail = output.publishedTrail
        expect(trail.getStatus()).toBe('published')

        expect(mockTrailRepository.findById).toHaveBeenCalledWith(`${defaultTrail.getId()}`)
    })

    it("Deve lançar uma exceção quando a trilha não é encontrada", async () => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(null)

        const publishTrailUseCase = new PublishTrailUseCase(mockTrailRepository)
        const inputDTO: PublishTrailUseCaseInputDTO = { idTrail: '1' }

        await expect(publishTrailUseCase.execute(inputDTO)).rejects.toThrow(
            new TrailNotFoundApplicationException(
                "publish-trail-use-case.ts",
                "13"
            )
        )
        expect(mockTrailRepository.findById).toHaveBeenCalledWith('1')
    })
})


