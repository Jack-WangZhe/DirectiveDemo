import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-left-div',
  templateUrl: './left-div.component.html',
  styleUrls: ['./left-div.component.css']
})
export class LeftDivComponent implements OnInit {
  @Input() items = []
  constructor() { }

  ngOnInit() {
  }

}
