import { Logger } from "@/infra/logs/logger";


export class TrailNotDeletedOnRepositoryApplicationException extends Error {
    private readonly logger: Logger
    public readonly name = 'TrailNotDeletedOnRepositoryApplicationException'

    constructor(filename: string, line: string) {
        super(`A trilha específicada não foi deletada no serviço de armazenamento!`);
        this.logger = new Logger("application", filename, line)
        this.logger.error({
            line: Number(line),
            message: "A trilha específicada não foi deletada no serviço de armazenamento!",
        })
    }
}