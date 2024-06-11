

export class InvalidLogParam extends Error {
    
    public readonly name = 'InvalidLogParam'

    constructor (param: string, message: string) {
      super(`(${param}) - ${message}`)
    }

}