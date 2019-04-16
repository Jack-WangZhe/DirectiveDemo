import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LeftDivComponent } from '../left-div/left-div.component';

@Component({
  selector: 'app-right-div',
  templateUrl: './right-div.component.html',
  styleUrls: ['./right-div.component.css']
})
export class RightDivComponent implements OnInit {
  @Output() changeItem = new EventEmitter<any>();
  @Input() items = []

  constructor() { }

  ngOnInit() {
  }

  handleMove(srcData) {
    switch(srcData.tag) {
      case 'div-item':
        this.changeItem.emit(srcData.data);
        break;
      case 'div-list':
        console.log('handling list');
        break;
      default:
        break;
    }
  }
}
