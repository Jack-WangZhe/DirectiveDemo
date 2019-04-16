import { Directive, HostListener, Input, ElementRef, Renderer2 } from '@angular/core';
import { DragDropService } from './drag-drop.service';

@Directive({
  selector: '[app-draggable][dragTag][dragData][draggedClass]'
})
export class DragDirective {

  private _isDraggable = false;//设置是否可拖拽的变量值

  //定义属性方法(set) 使用的时候可以直接写成this.isDraggable=xxx;就会直接调用set方法
  @Input('app-draggable')//定义app-draggable=xxx时就会调用set方法
  set isDraggable(val) {
      this._isDraggable = val;
      this.rd.setAttribute(this.el.nativeElement,'draggable',`${val}`);//根据html规范，如果元素可拖拽或是不可拖拽，需要设置draggable属性值
  }
  //定义属性方法(get)
  get isDraggable() {
      return this._isDraggable;
  }
    
  @Input() dragTag:string;//tag的唯一标识
  @Input() dragData:any;
  @Input() draggedClass: string;//表示动态添加的样式

  constructor(
    private el:ElementRef,
    private rd:Renderer2,
    private service: DragDropService) {}

  //通过event的target判断是否是指令应用的元素发起的
  @HostListener('dragstart',['$event'])//监听拖开始的事件
  onDragStart(ev:Event) {
      if(this.el.nativeElement === ev.target) {
          this.rd.addClass(this.el.nativeElement, this.draggedClass)//表示往el节点上应用draggedClass样式
          this.service.setDragData({tag:this.dragTag,data:this.dragData})
      }
  }

  @HostListener('dragend',['$event'])//监听拖结束的事件
  onDragEnd(ev:Event) {
      if(this.el.nativeElement === ev.target) {
        this.rd.removeClass(this.el.nativeElement, this.draggedClass)//表示拖拽完成之后把样式移除
      }
  }

}