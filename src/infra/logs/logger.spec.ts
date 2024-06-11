import { Logger } from "./logger"


describe("Testando os logs.", () => {

    const logger = new Logger("application", "create-course-use-case.ts", "src/application/use-cases/create-course-use-case.ts")

    it("Deve exibir a messagem formatada e bonita.", () => {

        logger.error({
            message: `Pasta da trilha não encontrada no Storage! 1491JGJG-19419841-VJWJA2-181491`,
            line: 60,
        })
    })

}) 