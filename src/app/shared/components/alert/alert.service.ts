import { Injectable } from '@angular/core';
import { Alert, AlertType } from './alert.model';

/**
 * - Criação do serviço de alerta, afim de, separar as funções chamadas por outros componentes das próprias 
 *   do alerta
 */

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alerts :Alert[] = [
    //{type: AlertType.Success, message: "teste"}, 
    //{type: AlertType.Danger, message: "teste2"}
  ];
  //private id_timeOut: NodeJS.Timeout | null = null;
  //private arrId :NodeJS.Timeout[] = [];

  constructor() { }

  /**
   * @param type Sspecifies the type of the alert element. Enum with 'danger' or 'success'.
   * @param msg Specifies the message of the alert element.
  */
  private add(type: AlertType, msg: string) {
    let alert = new Alert(type, msg);
    this.alerts.push(alert);

    setTimeout(() => {
      this.close(alert)
    }, 3000 + (500 * this.alerts.length));
  }

  close(alert: Alert) {
    if (!alert) return;

    if (!this.alerts.includes(alert)) return;

    this.alerts = this.alerts.filter(x => x !== alert);
  }

  error(message :string) {
    console.error(message);
    this.add(AlertType.Danger, message);
  }

  success(message :string) {
    this.add(AlertType.Success, message);
  }
}