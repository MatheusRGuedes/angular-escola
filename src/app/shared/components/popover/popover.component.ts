import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})
export class PopoverComponent implements OnInit {

  @Input() public buttonIcon :string = "";

  public isActive :boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.isActive = !this.isActive;
  }
}
