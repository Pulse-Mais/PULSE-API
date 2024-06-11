import { InvalidLogParam } from "../../application/application-exceptions/invalid-log-param"

interface LogInput {
    message: string
    line: number
}

interface FormatedLogInput {
    category: "Error" | "Info" | "Warn"
    message: string
    line: number
}

export class Logger {


    private readonly filename: string
    private readonly layer: "application" | "domain" | "infra"
    private readonly path?: string 
    private readonly line?: string 

    private Errors = 0
    private Infos = 0
    private Warns = 0

    constructor(layer: "application" | "domain" | "infra", filename: string, line?: string, path?: string) {

        if (!filename || filename.length < 2) throw new InvalidLogParam("Filename", "Nome do arquivo onde log foi gerado é inválido!");
        // if (!path || path.length === 0) throw new InvalidLogParam("Path", "O caminho do arquivo onde o log foi gerado é inválido!");
        if (!layer) throw new InvalidLogParam("Layer", "A camada onde o log foi gerado é inválida!");

        this.filename = filename
        this.layer = layer;
        this.path = path;
        this.line = line;
     }

    private validateLogParams(data: LogInput) {

        if (!data.message || data.message.length < 10) throw new InvalidLogParam("Message", "Mensagem do log é inválida ou muito curta!");

        if (!data.line || data.line <= 0) throw new InvalidLogParam("Line", "A linha onde log foi gerado é inválida!");

        const validInput = data

        return validInput
    }

    private formatLog(data: FormatedLogInput): string {
        return `\n\n:::: ${data.category}_log (${this.Errors}) ::::\n\n-- Message: ${data.message} \n\n-- Filename: ${this.filename} \n-- Line: ${data.line} \n-- Layer: ${this.layer} \n-- Path: ${this.path} \n\n::::::::::::::::::::::::`
    }

    error(data: LogInput) {

        const inputIsValid = this.validateLogParams(data)

        this.Errors = this.Errors + 1

        const log = this.formatLog({
            category: "Error",
            message: inputIsValid.message,
            line: inputIsValid.line
        })

        console.log(log)
    }

    info(data: LogInput) {

        const inputIsValid = this.validateLogParams(data)

        this.Infos = this.Infos + 1

        const log = this.formatLog({
            category: "Info",
            message: inputIsValid.message,
            line: inputIsValid.line
        })

        console.log(log)

    }

    warn(data: LogInput) {

        const inputIsValid = this.validateLogParams(data)

        this.Warns = this.Warns + 1

        const log = this.formatLog({
            category: "Warn",
            message: inputIsValid.message,
            line: inputIsValid.line
        })

        console.log(log)

    }

}