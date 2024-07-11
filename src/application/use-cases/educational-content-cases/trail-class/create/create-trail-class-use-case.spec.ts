import { TrailNotFoundApplicationException } from './../../../../application-exceptions/use-cases-application-exceptions/trail-not-found-app-exception';
import { CreateTrailOutputDTO } from './../../trail/create/dto/create-trail-output-dto';
import { CreateTrailClassOutputDTO } from './dto/create-trail-class-output-dto';
import { mockTrailClassRepository } from './../../../../../../test/mocks/mock-trail-class-repository';
import { CreateTrailClassUseCase } from "./create-trail-class-use-case"
import { mockTrailRepository } from "../../../../../../test/mocks/mock-trail-repository"
import { CreateTrailClassInputDTO } from './dto/create-trail-class-input-dto';
import { TrailClass } from '@/domain/entity/trail-class/trail-class-entity';
import { Trail } from '@/domain/entity/trail/trail-entity';
import { CreateTrailInputDTO } from '../../trail/create/dto/create-trail-input-dto';
 


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
        duration: 20
    }

    const defaultTrailClassCreated: TrailClass = TrailClass.create(defautlTrailClassInputDTO)

    defaultTrailCreated.setTrailClasses([defaultTrailClassCreated])

    beforeEach(() => {
  
    
        mockTrailRepository.findById = vi.fn().mockResolvedValue(defaultTrailCreated)
        mockTrailClassRepository.save = vi.fn().mockResolvedValue(defaultTrailClassCreated)
    })




    it("Deve criar a aula", async () => {

        const createTrailClassUseCase = new CreateTrailClassUseCase(mockTrailClassRepository, mockTrailRepository)

        const trailClassCreated = await createTrailClassUseCase.execute(defautlTrailClassInputDTO)

        expect(trailClassCreated).toBeTruthy()
        expect(mockTrailClassRepository.save).toHaveBeenCalledTimes(1)
        
    })


    it("Não deve criar a aula, caso não encontre a Trilha no banco", async () => {

        mockTrailRepository.findById = vi.fn().mockResolvedValue(null)
        const createTrailClassUseCase = new CreateTrailClassUseCase(mockTrailClassRepository, mockTrailRepository)

        expect(async () => await createTrailClassUseCase.execute(defautlTrailClassInputDTO)).rejects.toThrow(TrailNotFoundApplicationException)
        expect(mockTrailRepository.findById).toHaveBeenCalledTimes(1)
        expect(mockTrailClassRepository.save).toHaveBeenCalledTimes(0)
    })


   

    it("Não deve criar a aula caso o inputDTO seja inválido", async () => {

        const createTrailClassUseCase = new CreateTrailClassUseCase(mockTrailClassRepository, mockTrailRepository)

        const InvalidIdTrailClassInputDTO: CreateTrailClassInputDTO = {
            idTrail: "invalid",
            title: "Título",
            subtitle: "Subtítulo",
            description: "Descrição",
            duration: 20
            
        }

        const InvalidTitleTrailClassInputDTO: CreateTrailClassInputDTO = {
            idTrail: "0799d17e-7e55-4d74-99d7-ab07de38ad7e",
            title: "1949141901---225-15]]248/",
            subtitle: "Subtítulo",
            description: "Descrição",
            duration: 20
        }

        const InvalidSubtitleTrailClassInputDTO: CreateTrailClassInputDTO = {
            idTrail: "0799d17e-7e55-4d74-99d7-ab07de38ad7e",
            title: "Título",
            subtitle: "1949141901---225-15]]248/",
            description: "Descrição", 
            duration: 20
        }

        const InvalidDescriptionTrailClassInputDTO: CreateTrailClassInputDTO = {
            idTrail: "0799d17e-7e55-4d74-99d7-ab07de38ad7e",
            title: "Título",
            subtitle: "Subtítulo",
            description: "",
            duration: 20
        }

        const InvalidTrailStorageKeyTrailClassInputDTO: CreateTrailClassInputDTO = {
            idTrail: "0799d17e-7e55-4d74-99d7-ab07de38ad7e",
            title: "Título",
            subtitle: "Subtítulo",
            description: "Descrição",
            duration: 20
        }

        const allInvalidTrailClassInputDTO: CreateTrailClassInputDTO = {
            idTrail: "aaaaaaaaa",
            title: "titulo valido",
            subtitle: "",
            description: "",
            duration: 0
        }

        expect(async () => await createTrailClassUseCase.execute(InvalidTitleTrailClassInputDTO)).rejects.toThrow()
        expect(async () => await createTrailClassUseCase.execute(InvalidSubtitleTrailClassInputDTO)).rejects.toThrow()
        expect(async () => await createTrailClassUseCase.execute(InvalidDescriptionTrailClassInputDTO)).rejects.toThrow()
        expect(async () => await createTrailClassUseCase.execute(InvalidTrailStorageKeyTrailClassInputDTO)).rejects.toThrow()
        expect(async () => await createTrailClassUseCase.execute(allInvalidTrailClassInputDTO)).rejects.toThrow()
    })

})