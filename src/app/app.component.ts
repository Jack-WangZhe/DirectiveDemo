import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Action';

  list1 = [
    {key:1,value:'item1'},
    {key:2,value:'item2'},
    {key:3,value:'item3'}
  ];
  list2 = [
    {key:4,value:'item4'},
    {key:5,value:'item5'},
    {key:6,value:'item6'}
  ];

  handleResult(item) {
    this.list1 = this.list1.filter((listItem)=>{
      if(item.key === listItem.key){
        return false;
      }else{
        return true;
      }
    });
    this.list2.push(item);
  }
}
