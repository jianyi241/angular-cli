import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pbd-information',
  templateUrl: './pbd-information.component.html',
  styleUrls: ['./pbd-information.component.less']
})
export class PbdInformationComponent implements OnInit {

  list = [
    ['pbd-information','FJSIER092JFJSJO'],['pbd-information','FJSIER092JFJSJO'],['pbd-information','FJSIER092JFJSJO'],['pbd-information','FJSIER092JFJSJO'],['pbd-information','FJSIER092JFJSJO'],['pbd-information','FJSIER092JFJSJO'],['pbd-information','FJSIER092JFJSJO'],
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
