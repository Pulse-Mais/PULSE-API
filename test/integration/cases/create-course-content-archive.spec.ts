import { CourseDomainService } from "@/domain/domain-services/trail-class-domain-service"
import { InMemoryCourseRepository } from "../../memory/in-memory-course-repository"
import { GetUrlForUploadArchiveContent } from "@/application/use-cases/educational-content-cases/trail-class-content/get-url-for-upload-archive/get-url-for-upload-archive-content"
import { InMemoryTrailRepository } from "../../memory/in-memory-trail-repository"
import { AmazonS3Adapter } from "@/infra/adapters/amazon-s3-adapter"
import { CreateCourseUseCase } from "@/application/use-cases/educational-content-cases/trail-class/create/create-trail-class-use-case"
import { CreateTrailUseCase } from "@/application/use-cases/educational-content-cases/trail/create-trail-use-case"
import * as fs from 'fs';
import FormData from 'form-data'
import { UpdateCourseArchiveContentUseCase } from "@/application/use-cases/educational-content-cases/trail-class-content/update-course-archive-content-use-case"


describe("Testando o fluxo de cadastrar um conteúdo do tipo arquivo em uma aula", async () => {

    const courseRepository = new InMemoryCourseRepository()
    const trailRepository = new InMemoryTrailRepository(courseRepository)
    const storageService = new AmazonS3Adapter()
    const createCourseUseCase = new CreateCourseUseCase(courseRepository, trailRepository, storageService)
    const getUrlForArchiveCase = new GetUrlForUploadArchiveContent(courseRepository, trailRepository, storageService, new CourseDomainService())
    const updateCourseArchiveContent = new UpdateCourseArchiveContentUseCase(courseRepository, new CourseDomainService())

    const trail = await new CreateTrailUseCase(trailRepository, storageService).execute({
        title: "Testing trail",
        subtitle: "Estou cansado",
        description: "Nao sei porque estou fazendo isso"
    })

    const trailId = trail.getId()
    const trailKey = trail.getStorageKey()

    if (!trailId || !trailKey) throw new Error();

    const course = await createCourseUseCase.execute({
        title: "Título de teste",
        subtitle: "testee",
        description: "testee",
        idTrail: trailId,
        trailStorageKey: trailKey
    })

    const courseId = course.getId()
    if (!courseId) throw new Error();

    const defaultUrlForArchive = await getUrlForArchiveCase.execute({
        idTrail: trailId,
        idCourse: courseId,
        archiveExtension: "pdf",
        format: "pdf",
        type: "archive"
    })

    const defaultFilePath = 'D:\\projetos\\backend\\PULSE-API\\test\\assets\\teste-pdf.pdf';

        const buffer = fs.readFileSync(defaultFilePath);

        const defaultFormData = new FormData();
        defaultFormData.append('arquivo', buffer, 'teste-pdf.pdf');


    it("Deve geral a URL com sucesso.", async () => {

        const url = await getUrlForArchiveCase.execute({
            idTrail: trailId,
            idCourse: courseId,
            archiveExtension: "pdf",
            format: "pdf",
            type: "archive"
        })

        expect(url).toBeTruthy()
    })

    it("Deve realizar o upload com sucesso.", async () => {

        const urlForPdf = await getUrlForArchiveCase.execute({
            idTrail: trailId,
            idCourse: courseId,
            archiveExtension: "pdf",
            format: "pdf",
            type: "archive"
        })
        
        expect(urlForPdf).toBeTruthy()
        const filePath = 'D:\\projetos\\backend\\PULSE-API\\test\\assets\\teste-pdf.pdf';

        const buffer = fs.readFileSync(filePath);

        const formData = new FormData();
        formData.append('arquivo', buffer, 'teste-pdf.pdf');

        const response = await fetch(urlForPdf, {
            method: 'PUT',
            body: formData,
        })

        expect(response).toBeTruthy()
        expect(response.status).toBe(200)

    })

    it("Deve atualizar a aula no banco, ao realizar o upload de um conteúdo com sucesso.", async () => {

        const response = await fetch(defaultUrlForArchive, {
            method: 'PUT',
            body: defaultFormData,
        })

        expect(response).toBeTruthy()
        expect(response.status).toBe(200)

        if (response.status === 200) {
            const courseWithContentUpdated = await updateCourseArchiveContent.execute({idCourse: courseId})

            const contentUpdated = courseWithContentUpdated.getContent()
            console.log(contentUpdated)
            expect(contentUpdated).toBeTruthy()
            expect(contentUpdated?.status).toBe("filled")

        }

    }) 

})