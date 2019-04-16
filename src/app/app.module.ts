import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LeftDivComponent } from './left-div/left-div.component';
import { RightDivComponent } from './right-div/right-div.component';
import { DragDirective } from './directive/drag.directive';
import { DropDirective } from './directive/drop.directive';
import { DragDropService } from './directive/drag-drop.service';

@NgModule({
  declarations: [
    AppComponent,
    LeftDivComponent,
    RightDivComponent,
    DragDirective,
    DropDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    DragDropService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
