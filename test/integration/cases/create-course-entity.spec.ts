import { CreateCourseUseCase } from "@/application/use-cases/educational-content-cases/trail-class/create/create-trail-class-use-case";
import { InMemoryCourseRepository } from "../../memory/in-memory-course-repository";
import { InMemoryTrailRepository } from "../../memory/in-memory-trail-repository";
import { AmazonS3Adapter } from "@/infra/adapters/amazon-s3-adapter";


describe("Create a course Entity, tests.", async () => {

    const courseRepo = new InMemoryCourseRepository()
    const trailRepo = new InMemoryTrailRepository(courseRepo)
    const storageService = new AmazonS3Adapter()
    const createCourse = new CreateCourseUseCase(courseRepo, trailRepo, storageService)

    it("Não deve criar a entidade com dados inválidos.", async () => {

        const invalidCreateCourseInput = {
            idTrail: "",
            title: "",
            description: "",
            subtitle: "",
            trailStorageKey: ""
        }

        expect(async () => await createCourse.execute(invalidCreateCourseInput)).toThrow
    });

    it("Deve criar uma entidade.", async () => {


        const validCreateCourseInput = {
            idTrail: "c2b05078-4df0-4248-9e40-01026f8a3c71",
            title: "aaaaaaaaaaaaaaaa",
            description: "Curso de teste",
            subtitle: "Curso de teste",
            trailStorageKey: "trilhas/trail-c2b05078-4df0-4248-9e40-01026f8a3c71/"
        }

        const course = await createCourse.execute(validCreateCourseInput)

        expect(course).toHaveProperty("id")
        expect(course.getTitle()).toBe(validCreateCourseInput.title)

        console.log(courseRepo.listByTrail("c2b05078-4df0-4248-9e40-01026f8a3c71"))

    });



})