export interface Contrato {
  erros: any[];
  validar(model: any): boolean;
}
