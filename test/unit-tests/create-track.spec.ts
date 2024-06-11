// import { CreateTrackUseCase } from "@/application/use-cases/education-content-cases/trail/create-trail-use-case"
// import TrackDomainService from "@/domain/domain-services/trail-domain-service"
// import { InMemoryTrackRepository } from "../memory/in-memory-trail-repository"
// import { CreateBucketCommand } from "@aws-sdk/client-s3"
// import { InMemoryCourseRepository } from "../memory/in-memory-course-repository"
// import { CreateCourseUseCase } from "@/application/use-cases/education-content-cases/course/create-course-use-case"
// import { CreateCourseContentUseCase, CreateCourseContentUseCaseParams } from "@/application/use-cases/create-course-content-use-case"
// import { PublishCourseUseCase } from "@/application/use-cases/publish-course-use-case"


// describe("Track tests sessions", () => {

//     const trackRepository = new InMemoryTrackRepository
//     const trackUseCase = new CreateTrackUseCase(trackRepository)
//     const courseRepository = new InMemoryCourseRepository()

//     const createCourseContentUseCase = new CreateCourseContentUseCase(courseRepository, trackRepository)
//     const courseUseCase = new CreateCourseUseCase(courseRepository, trackRepository)
//     const publish = new PublishCourseUseCase(courseRepository, trackRepository)

//     it("Deve retornar a entidade Track", async () => {

//         const params = {
//             title: "teste",
//             subtitle: "aaa",
//             description: "aaaaaaaaaaaaaaaaaaaaaaa"
//         }

//         const track = await trackUseCase.execute(params)

//         expect(track.id).toBeDefined
//         expect(track.title).toBeDefined
//         expect(track.subtitle).toBeDefined
//         expect(track.description).toBeDefined
//         expect(track.status).toBe("not-published")
//         expect(track.storageTrackKey).toBeDefined
//     })

//     it("O endereço raiz do conteúdo da trilha deve ter o mesmo id da trilha", async () => {

//         const params = {
//             title: "teste",
//             subtitle: "aaa",
//             description: "aaaaaaaaaaaaaaaaaaaaaaa"
//         }

//         const track = await trackUseCase.execute(params)

//         expect(track.storageTrackKey).toBe(`/trilhas/track-${track.id}`)
//     })

//     it("O Status da trilha precisa ser não publicado", async () => {


//         const params = {
//             title: "teste",
//             subtitle: "aaa",
//             description: "aaaaaaaaaaaaaaaaaaaaaaa"
//         }

//         const track = await trackUseCase.execute(params)

//         expect(track.status).toBe("not-published")



//     })

//     it("As propriedades title, subtitle, description, storaKey precisam estar definidas", async () => {


//         const params = {
//             title: "teste",
//             subtitle: "aaa",
//             description: "aaaaaaaaaaaaaaaaaaaaaaa"
//         }

//         const track = await trackUseCase.execute(params)

//         expect(track.id).toBeDefined
//         expect(track.title).toBeDefined
//         expect(track.subtitle).toBeDefined
//         expect(track.description).toBeDefined
//         expect(track.status).toBe("not-published")
//         expect(track.storageTrackKey).toBeDefined

//     })







//     it("Deve gerar uma URL temporária", async () => {

//         const createTrack = {
//             title: "teste",
//             subtitle: "aaa",
//             description: "aaaaaaaaaaaaaaaaaaaaaaa"
//         }

//         const track = trackRepository.findById("6c42e8a6-5066-4a24-acac-a0090eb1f80a")
        
//         if (!track || !track.id || !track.storageTrackKey) {
//             throw new Error("");
//         }
 
        
//         const params = {
//             trackId: track.id,
//             trackStorageKey: track.storageTrackKey,
//             title: "aaaa",
//             subtitle: "aaaa",
//             description: "aaaa",
//             idTrack: track.id
//         }

//         const course = await courseUseCase.execute(params)


//         expect(track.status).toBe("not-published")


//         if (!track.id || !course.id) throw new Error("AAAAAAAAAAAAA");

//         const data: CreateCourseContentUseCaseParams = {
//             idTrack: track.id,
//             idCourse: "50969cc1-2e92-49b7-aa81-dc26ed3ee642",
//         }

//         const url = await createCourseContentUseCase.execute(data)

//         console.log(url)

//         expect(url).toBeDefined()

//         console.log(track)
//         console.log(course)

//     })


//     // it("Deve retornar o conteúdo da trilha", async  () => {
       
//     //     const params2 = {
//     //         idCourse: "f82e6a05-4a2c-4d2f-ac97-cc1be9f3d083",
//     //         idTrack: "d8c564a2-0a12-4940-ab9a-2846212058ad"
//     //     }

//     //     const content = await publish.execute(params2)

//     //     console.log(content)
    
//     // })
        


// })