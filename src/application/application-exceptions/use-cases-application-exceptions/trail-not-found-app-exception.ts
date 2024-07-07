import { Logger } from "@/infra/logs/logger";


export class TrailNotFoundApplicationException extends Error {
    
    private readonly logger: Logger
    public readonly name = 'TrailNotFoundaApplicationException'

    constructor(filename: string, line: string) {
        super(`A trilha específicada não foi encontrada no serviço de armazenamento!`);
        this.logger = new Logger("application", filename, line)
        this.logger.error({
            line: Number(line),
            message: "A trilha específicada não foi encontrada no serviço de armazenamento!",
        })
    }
}
