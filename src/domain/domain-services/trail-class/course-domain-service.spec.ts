import { Trail } from "../entity/trail/trail-entity"
import { Content } from "../entity/value-objects/content-value-object"
import { CourseDomainService } from "./trail-class-domain-service"

describe("testing class-entity.", () => {

    const service = new CourseDomainService()

    const trail = Trail.create({
        title: "Testes unitários",
        subtitle: "aprendendo testes.",
        description: "Lorem ipsulum, não sei o que escrever, só espero que funcione, talvez aaaa.",
    })

    const tclass = service.createCourse({
        trail,
        title: "Título de teste, aaa",
        subtitle: "Subtítulo teste",
        description: "Description teste",
    })

    it("Não deve criar a entidade com os dados inválidos", () => {


        expect(() => {
          service.createCourse({
            trail,
            title: "",
            subtitle: "Subtítulo teste",
            description: "Description teste",
        })
        }).toThrow()

        expect(() => {
            service.createCourse({
              trail,
              title: "Subtítulo teste",
              subtitle: "",
              description: "Description teste",
          })
          }).toThrow()

          expect(() => {
            service.createCourse({
              trail,
              title: "Subtítulo teste",
              subtitle: "Subtítulo teste",
              description: "",
          })
          }).toThrow()
    })

    it("Não deve reconstruir a entidade com dados inválidos!", () => {
       
        expect(() => {
            service.restoreCourse({
                id: "string",
                idTrail: "",
                
                title: "string",
                description: "string",
                subtitle: "string",
                courseStorageKey: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
                content: new Content("empty", "empty", "empty", "empty", {id: "empty", status: "none"}),
                status: "published", 
                
                createAt: "2024-05-01",
                updateAt: "2024-05-01"
          })}).toThrow()
          
          expect(() => {
            service.restoreCourse({
                id: "194914110101411441",
                idTrail: "145890742170847012",
                
                title: "14894189410941",
                description: "14901941941941",
                subtitle: "498194191491141",
                courseStorageKey: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
                content: new Content("empty", "empty", "empty", "empty", {id: "empty", status: "none"}),
                status: "published", 
                
                createAt: String(new Date()),
                updateAt: String(new Date())
          })}).toThrow()
        
    })

    it("Testando a key e tals.", () => {

        service.generateArchiveContentKey(trail, tclass)

    })


})

 