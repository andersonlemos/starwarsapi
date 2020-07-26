export interface Contract {
    _errors: any[];
    validate(model: any): boolean;
}
