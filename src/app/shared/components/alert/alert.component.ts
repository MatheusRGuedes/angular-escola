import { Component, OnInit } from '@angular/core';
import { Alert, AlertType } from './alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alerts :Alert[] = [
    //{type: AlertType.Success, message: "teste"}, 
    //{type: AlertType.Danger, message: "teste2"}
  ];
  //private id_timeOut: NodeJS.Timeout | null = null;
  //private arrId :NodeJS.Timeout[] = [];
  //@ViewChild('alertElement') alertElement :ElementRef | undefined; 

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    //console.log(this.alertElement?.nativeElement);
  }

  /**
   * @param type Sspecifies the type of the alert element. Enum with 'danger' or 'success'.
   * @param msg Specifies the message of the alert element.
   */
  private addAlert(type: AlertType, msg: string) {
    let alert = new Alert(type, msg);
    this.alerts.push(alert);

    setTimeout(() => {
      this.close(alert)
    }, 3000 + (500 * this.alerts.length));
  }

  error(message :string) {
    console.error(message);
    this.addAlert(AlertType.Danger, message);
  }

  success(message :string) {
    this.addAlert(AlertType.Success, message);
  }

  close(alert: Alert) {
    if (!alert) return;

    if (!this.alerts.includes(alert)) return;

    this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssAlert(alert: Alert) :string {
    const classes = {
      [AlertType.Success]: "success",
      [AlertType.Danger]: "danger"
    }

    let type :string = classes[alert.type];

    return `alert alert-${type} alert-dismissible fade show`;
  }
}