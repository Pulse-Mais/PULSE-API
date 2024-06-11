import { Logger } from "@/infra/logs/logger";

export class InvalidTrailClassPropetyDomainException extends Error {
    
    private readonly logger: Logger
    public readonly name = 'InvalidTrailClassPropetyDomainException'

    constructor(filename: string, line: string, propety: string) {
        super(`A propriedade ${propety} da trilha está inválida!`);
        this.logger = new Logger("domain", filename, line)
    }

}