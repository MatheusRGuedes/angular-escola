import { Component, OnInit } from '@angular/core';
import { Alert, AlertType } from './alert.model';
import { AlertService } from './alert.service';

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
  
  //@ViewChild('alertElement') alertElement :ElementRef | undefined; 

  constructor(public alertService :AlertService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    //console.log(this.alertElement?.nativeElement);
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