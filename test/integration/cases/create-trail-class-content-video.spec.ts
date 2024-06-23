import { GetUrlForUploadArchiveContent } from "@/application/use-cases/educational-content-cases/trail-class-content/get-url-for-upload-archive/get-url-for-upload-archive-content"
import { UpdateCourseArchiveContentUseCase } from "@/application/use-cases/educational-content-cases/trail-class-content/update-course-archive-content-use-case"
import { CreateCourseUseCase } from "@/application/use-cases/educational-content-cases/trail-class/create/create-trail-class-use-case"
import { CreateTrailUseCase } from "@/application/use-cases/educational-content-cases/trail/create-trail-use-case"
import { CourseDomainService } from "@/domain/domain-services/trail-class-domain-service"
import { AmazonS3Adapter } from "@/infra/adapters/amazon-s3-adapter"
import { InMemoryCourseRepository } from "../../memory/in-memory-trail-class-repository"
import { InMemoryTrailRepository } from "../../memory/in-memory-trail-repository"
import { GetUrlForUploadVideoContent } from "@/application/use-cases/educational-content-cases/trail-class-content/get-url-for-upload-video-content"
import { MuxVideoServiceAdapter } from "@/infra/adapters/mux-video-service-adapter"
import { UpdateCourseVideoContentUseCase } from "@/application/use-cases/educational-content-cases/trail-class-content/update-course-video-content-use-case"

describe("Testando o fluxo de cadastrar um conteúdo do tipo arquivo em uma aula", async () => {

    const courseRepository = new InMemoryCourseRepository()
    const trailRepository = new InMemoryTrailRepository(courseRepository)
    const videoService = new MuxVideoServiceAdapter()
    const storageService = new AmazonS3Adapter()
    const createCourseUseCase = new CreateCourseUseCase(courseRepository, trailRepository, storageService)

    const getUrlForUploadVideoContent = new GetUrlForUploadVideoContent(courseRepository, videoService, new CourseDomainService())
    const uploadCourseVideoContent = new UpdateCourseVideoContentUseCase(courseRepository, new CourseDomainService())

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



    it("Deve gerar a URL", async () => {

        const url = await getUrlForUploadVideoContent.execute({idCourse: courseId})

        expect(url).toBeTruthy()
    })

    it("Deve realizar o upload", async () => {

        const url = await getUrlForUploadVideoContent.execute({idCourse: courseId})

   
    })

    
})







