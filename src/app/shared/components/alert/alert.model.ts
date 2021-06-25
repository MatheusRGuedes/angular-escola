/**
 * Classe para representação de modelo de um alerta
 *
 * - Pesquisar sobre Partial, para uso opcional de alguns
 *   propriedades na instanciaçao
*/

export class Alert {
  type :AlertType;
  message :string;
  
  constructor(type: AlertType, message: string) {
    this.type = type;
    this.message = message;
  }
}
  
export enum AlertType {
  Success,
  Danger
}