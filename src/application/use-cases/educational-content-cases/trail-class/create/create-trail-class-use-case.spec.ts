import { TrailNotFoundApplicationException } from './../../../../application-exceptions/use-cases-application-exceptions/trail-not-found-app-exception';
import { CreateTrailOutputDTO } from './../../trail/create/dto/create-trail-output-dto';
import { CreateTrailClassOutputDTO } from './dto/create-trail-class-output-dto';
import { mockTrailClassRepository } from './../../../../../../test/mocks/mock-trail-class-repository';
import { CreateTrailClassUseCase } from "./create-trail-class-use-case"
import { mockTrailRepository } from "../../../../../../test/mocks/mock-trail-repository"
import { mockStorageService } from "../../../../../../test/mocks/mock-storage-service"
import { CreateTrailClassInputDTO } from './dto/create-trail-class-input-dto';
import { TrailClass } from '@/domain/entity/trail-class/trail-class-entity';
import { Trail } from '@/domain/entity/trail/trail-entity';
import { CreateTrailInputDTO } from '../../trail/create/dto/create-trail-input-dto';
import { TrailFolderNotAvaibilityApplicationException } from '@/application/application-exceptions/use-cases-application-exceptions/trail-folder-not-avaibility-application-exception';


describe("CreateTrailClassUseCase", () => {

    const defautlTrailInputDTO: CreateTrailInputDTO = {
        title: "Válido Title",
        subtitle: "Trail Subtitle",
        description: "Trail Description"
    }

    const defaultTrailCreated: Trail = Trail.create(defautlTrailInputDTO)

    defaultTrailCreated.setId("0799d17e-7e55-4d74-99d7-ab07de38ad7e")

    const defautlTrailClassInputDTO: CreateTrailClassInputDTO = {
        idTrail: "0799d17e-7e55-4d74-99d7-ab07de38ad7e",
        title: "Título",
        subtitle: "Subtítulo",
        description: "Descrição",
        trailStorageKey: "trilhas/trail-class-0799d17e-7e55-4d74-99d7-ab07de38ad7e"
    }

    const defaultTrailClassCreated: TrailClass = TrailClass.create(defautlTrailClassInputDTO)

    defaultTrailCreated.setTrailClasss([defaultTrailClassCreated])

    beforeEach(() => {
        mockStorageService.verifyFolderAvailability = vi.fn().mockResolvedValue(true)
        mockStorageService.createClassFolder = vi.fn().mockResolvedValue(true)
        mockTrailRepository.findById = vi.fn().mockResolvedValue(defaultTrailCreated)
        mockTrailClassRepository.save = vi.fn().mockResolvedValue(defaultTrailClassCreated)
    })




    it("Deve criar a aula", async () => {

        const createTrailClassUseCase = new CreateTrailClassUseCase(mockTrailClassRepository, mockTrailRepository, mockStorageService)

        const trailClassCreated = await createTrailClassUseCase.execute(defautlTrailClassInputDTO)

        expect(trailClassCreated).toBeTruthy()
        expect(mockTrailClassRepository.save).toHaveBeenCalledTimes(1)
        expect(mockStorageService.createClassFolder).toHaveBeenCalledTimes(1)
    })


    it("Não deve criar a aula, caso não encontre a Trilha no banco", async () => {

        mockTrailRepository.findById = vi.fn().mockResolvedValue(null)
        const createTrailClassUseCase = new CreateTrailClassUseCase(mockTrailClassRepository, mockTrailRepository, mockStorageService)

        expect(async () => await createTrailClassUseCase.execute(defautlTrailClassInputDTO)).rejects.toThrow(TrailNotFoundApplicationException)
        expect(mockTrailRepository.findById).toHaveBeenCalledTimes(1)
        expect(mockTrailClassRepository.save).toHaveBeenCalledTimes(0)
    })


    it("Não deve criar a aula se a partição da trilha associada não for encontrada no storage", async () => {

        mockStorageService.verifyFolderAvailability = vi.fn().mockResolvedValue(false)
        const createTrailClassUseCase = new CreateTrailClassUseCase(mockTrailClassRepository, mockTrailRepository, mockStorageService)

        expect(async () => await createTrailClassUseCase.execute(defautlTrailClassInputDTO)).rejects.toThrow(TrailFolderNotAvaibilityApplicationException)

        expect(mockTrailClassRepository.save).toHaveBeenCalledTimes(0)
        // expect(mockStorageService.verifyFolderAvailability).toHaveBeenCalledTimes(1)

    })

    it("Não deve criar a aula caso o inputDTO seja inválido", async () => {

        const createTrailClassUseCase = new CreateTrailClassUseCase(mockTrailClassRepository, mockTrailRepository, mockStorageService)

        const InvalidIdTrailClassInputDTO: CreateTrailClassInputDTO = {
            idTrail: "invalid",
            title: "Título",
            subtitle: "Subtítulo",
            description: "Descrição",
            trailStorageKey: "trilhas/trail-class-0799d17e-7e55-4d74-99d7-ab07de38ad7e"
        }

        const InvalidTitleTrailClassInputDTO: CreateTrailClassInputDTO = {
            idTrail: "0799d17e-7e55-4d74-99d7-ab07de38ad7e",
            title: "1949141901---225-15]]248/",
            subtitle: "Subtítulo",
            description: "Descrição",
            trailStorageKey: "trilhas/trail-class-0799d17e-7e55-4d74-99d7-ab07de38ad7e"
        }

        const InvalidSubtitleTrailClassInputDTO: CreateTrailClassInputDTO = {
            idTrail: "0799d17e-7e55-4d74-99d7-ab07de38ad7e",
            title: "Título",
            subtitle: "1949141901---225-15]]248/",
            description: "Descrição", 
            trailStorageKey: "trilhas/trail-class-0799d17e-7e55-4d74-99d7-ab07de38ad7e"
        }

        const InvalidDescriptionTrailClassInputDTO: CreateTrailClassInputDTO = {
            idTrail: "0799d17e-7e55-4d74-99d7-ab07de38ad7e",
            title: "Título",
            subtitle: "Subtítulo",
            description: "",
            trailStorageKey: "trilhas/trail-class-0799d17e-7e55-4d74-99d7-ab07de38ad7e"
        }

        const InvalidTrailStorageKeyTrailClassInputDTO: CreateTrailClassInputDTO = {
            idTrail: "0799d17e-7e55-4d74-99d7-ab07de38ad7e",
            title: "Título",
            subtitle: "Subtítulo",
            description: "Descrição",
            trailStorageKey: "a"
        }

        const allInvalidTrailClassInputDTO: CreateTrailClassInputDTO = {
            idTrail: "aaaaaaaaa",
            title: "titulo valido",
            subtitle: "",
            description: "",
            trailStorageKey: "aa"
        }

        expect(async () => await createTrailClassUseCase.execute(InvalidTitleTrailClassInputDTO)).rejects.toThrow()
        expect(async () => await createTrailClassUseCase.execute(InvalidSubtitleTrailClassInputDTO)).rejects.toThrow()
        expect(async () => await createTrailClassUseCase.execute(InvalidDescriptionTrailClassInputDTO)).rejects.toThrow()
        expect(async () => await createTrailClassUseCase.execute(InvalidTrailStorageKeyTrailClassInputDTO)).rejects.toThrow()
        expect(async () => await createTrailClassUseCase.execute(allInvalidTrailClassInputDTO)).rejects.toThrow()
    })


    it("Não deve criar a aula caso a partição da aula, não seja criada no storage", async () => {


    })



    it("Deve retornar a exceção 'TrailClassNotSavedOnRepositoryApplicationException' caso a aula não seja salva no banco", async () => {


    })






})