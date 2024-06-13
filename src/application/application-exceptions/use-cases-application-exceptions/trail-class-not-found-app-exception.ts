import { Logger } from "@/infra/logs/logger";


export class TrailClassNotFoundApplicationException extends Error {
    
    private readonly logger: Logger
    public readonly name = 'TrailClassNotFoundaApplicationException'

    constructor(filename: string, line: string) {
        super(`A aula específicada não foi encontrada na trilha!`);
        this.logger = new Logger("application", filename, line)
    }

}