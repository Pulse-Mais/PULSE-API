
import { Logger } from "@/infra/logs/logger";

export class TrailDoesNotHaveEnoughClassesForPublicationDomainException extends Error {
    private readonly logger: Logger
    public readonly name = 'TrailDoesNotHaveEnoughClassesForPublicationDomainException'

    constructor(filename: string, line: string) {
        super(`A trilha não possui aulas suficentes para ser publicada`);
        this.logger = new Logger("domain", filename, line)
        this.logger.error({
            line: Number(line),
            message: `A trilha não possui aulas suficentes para ser publicada`
        })
    }
}