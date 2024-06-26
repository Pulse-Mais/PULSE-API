import { Logger } from "@/infra/logs/logger";


export class TrailClassAlreadyAddedOnTrailDomainException extends Error {
    private readonly logger: Logger
    public readonly name = 'TrailClassAlreadyAddedOnTrailDomainException'

    constructor(filename: string, line: string) {
        super(`A aula já está presente na trilha.`);
        this.logger = new Logger("domain", filename, line)
        this.logger.error({
            line: Number(line),
            message: `A aula já está presente na trilha.`
        })
    }
}