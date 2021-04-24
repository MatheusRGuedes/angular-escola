import { Component, OnInit } from '@angular/core';
//import { AfterViewInit } from '@angular/core'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  private id_timeOut : NodeJS.Timeout | null = null;

  //@ViewChild('alertElement') alertElement :ElementRef | null = null;

  //não era atualizado seus valores no template, por isso tirei
  //public tipo :string = '';
  //public mensagem :string = '';  

  constructor() { }

  ngOnInit(): void {
  }

  //ngAfterViewInit() {
    //this.alertElement= new ElementRef(document.querySelector(".alert"));
  //}

  /**
   * @param tipo Specifies the type of the alert element. Can be 'danger' or 'success'.
   * @param mensagem Specifies the message of the alert element.
   */
  openAlert(tipo: string, mensagem: string) {
    let alertElement = document.getElementById("alertElement");
    //console.log(alertElement);

    if (alertElement != null) {
      //this.alertElement.nativeElement.style.display = "block";
      alertElement.classList.add("alert-"+tipo);
      alertElement.firstElementChild!.innerHTML = mensagem;
      alertElement.style.display = "block";

      if (tipo === "danger") console.error(mensagem);

      this.id_timeOut = setTimeout(this.closeAlert, 3500);
    }
  }

  closeAlert() {
    //this.alertElement!.nativeElement.style.display = "none";

    //para a execução do setTimeOut, evitando erro de null pointer ou executação dupla
    clearTimeout(this.id_timeOut!);
    document.getElementById("alertElement")!.style.display = "none";
  }
}