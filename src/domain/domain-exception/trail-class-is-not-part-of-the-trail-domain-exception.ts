
import { Logger } from "@/infra/logs/logger";

export class TrailClassIsNotPartOfTheTrailDomainException extends Error {
    private readonly logger: Logger
    public readonly name = 'TrailClassIsNotPartOfTheTrailDomainException'

    constructor(filename: string, line: string) {
        super(`A aula não pertence a trilha.`);
        this.logger = new Logger("domain", filename, line)
        this.logger.error({
            line: Number(line),
            message: `A aula não pertence a trilha.`
        })
    }
}