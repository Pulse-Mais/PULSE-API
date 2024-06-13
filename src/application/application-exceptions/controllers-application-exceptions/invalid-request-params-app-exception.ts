import { Logger } from "@/infra/logs/logger";


export class InvalidRequestParamsAppException extends Error {
    
    private readonly logger: Logger
    public readonly name = 'CoursePartionNotCreatedApplicationException'

    constructor(filename: string, line: string, param: string) {
        super(`O parâmetro ${param} é inválido ou nulo!`);
        this.logger = new Logger("application", filename, line)
    }

}