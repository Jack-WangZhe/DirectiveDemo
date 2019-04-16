import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface DragData {
  tag: string;//标记是哪个拖拽(在多级拖拽中),用户自定义
  data: any;//表示传递的内容
}
@Injectable()
export class DragDropService {
  // BehaviorSubject总能记住上一次的值
  private _dragData = new BehaviorSubject<DragData>(null);
  
  // 定义存储数据的方法
  setDragData(data: DragData) {
      this._dragData.next(data);
  }
  
  // 定义得到数据的方法
  getDragData(): Observable<DragData> {
      return this._dragData.asObservable();
  }
  
  // 定义清空数据的方法
  clearDragData() {
      this._dragData.next(null);
  }
}