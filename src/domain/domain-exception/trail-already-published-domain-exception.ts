
import { Logger } from "@/infra/logs/logger";

export class TrailAlreadyPublishedDomainException extends Error {
    private readonly logger: Logger
    public readonly name = 'TrailAlreadyPublishedDomainException'

    constructor(filename: string, line: string) {
        super(`A trilha já está publicada`);
        this.logger = new Logger("domain", filename, line)
        this.logger.error({
            line: Number(line),
            message: `A trilha já está publicada`
        })
    }
}