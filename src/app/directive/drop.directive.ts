import { Directive, HostListener, ElementRef, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { DragData, DragDropService } from './drag-drop.service';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[app-droppable][dragEnterClass]'
})
export class DropDirective {

  @Output() dropped = new EventEmitter<DragData>();
  @Input() dragEnterClass:string; 
  @Input() dropTags:string[] = [];//放的区域可能是多个区域，所以应该是数组
  private data$;

  constructor(
      private el:ElementRef,
      private rd:Renderer2,
      private service: DragDropService) {
      this.data$ = this.service.getDragData().pipe(take(1));//订阅service,需要在核心组件中导入import 'rxjs/add/operator/take',take是rxjs的操作符
  }

  //通过event的target判断是否是指令应用的元素发起的
  @HostListener('dragenter',['$event'])//drag的对象进入我的领域了
  onDragEnter(ev:Event) {
      // 多种元素都可以拖拽的话,拖拽的时候可能会影响多个,所以需要防止事件传播
      ev.preventDefault();
      ev.stopPropagation();
      if(this.el.nativeElement === ev.target) {
          this.data$.subscribe(dragData => {//取到data的时候，查看放的区域是否含有拖的tag
              if(this.dropTags.indexOf(dragData.tag) > -1) {
                  this.rd.addClass(this.el.nativeElement, this.dragEnterClass)//表示往el节点上应用draggedClass样式
              }
          });
      }
  }

  @HostListener('dragover',['$event'])//drag的对象在我的上面
  onDragOver(ev:Event) {
      ev.preventDefault();
      ev.stopPropagation();
      if(this.el.nativeElement === ev.target) {
          this.data$.subscribe(dragData => {
              if(this.dropTags.indexOf(dragData.tag) > -1) {
                  //设置data transfer的特效
                  this.rd.setProperty(ev, 'dataTransfer.effectAllowed','all');
                  this.rd.setProperty(ev, 'dataTransfer.dropEffect','move');
              }else{
                  this.rd.setProperty(ev, 'dataTransfer.effectAllowed','none');
                  this.rd.setProperty(ev, 'dataTransfer.dropEffect','none');
              }
          })
      }
  }

@HostListener('dragleave',['$event'])//drag的对象离开我的领域
  onDragLeave(ev:Event) {
      ev.preventDefault();
      ev.stopPropagation();
      if(this.el.nativeElement === ev.target) {
          this.data$.subscribe(dragData => {
              if(this.dropTags.indexOf(dragData.tag) > -1){
                  this.rd.removeClass(this.el.nativeElement, this.dragEnterClass)
              }
          });
      }
  }

  @HostListener('drop',['$event'])//监听放的事件
  onDrop(ev:Event) {
      ev.preventDefault();
      ev.stopPropagation();
      if(this.el.nativeElement === ev.target) {
        this.data$.subscribe(dragData => {
            if(this.dropTags.indexOf(dragData.tag) > -1){
                this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
                this.dropped.emit(dragData);// 把dropData发射出去
                this.service.clearDragData();//在放下的时候执行service的clear操作，否则会影响下一次的拖拽
            }
        });
      }
  }
}
