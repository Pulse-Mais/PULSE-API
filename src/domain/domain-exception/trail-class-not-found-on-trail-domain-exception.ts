import { Logger } from "@/infra/logs/logger";

export class TrailClassNotFoundOnTrailDomainException extends Error {
    
    private readonly logger: Logger
    public readonly name = 'TrailClassNotFoundOnTrailDomainException'

    constructor(filename: string, line: string) {
        super(`A aula não foi encontrada na trilha!`);
        this.logger = new Logger("domain", filename, line)
        this.logger.error({
            message:`A aula não foi encontrada na trilha!`,
            line: Number(line)
        })
    }

}