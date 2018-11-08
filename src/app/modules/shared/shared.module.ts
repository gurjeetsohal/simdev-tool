import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileInputComponent } from './components/file-input/file-input.component';
import { SectionHeadingComponent } from './components/section-heading/section-heading.component';
import { TaskidInputComponent } from './components/taskid-input/taskid-input.component';
import { FilterPipe } from './components/taskid-input/filter.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FileInputComponent,
    SectionHeadingComponent,
    TaskidInputComponent,
    FilterPipe
  ],
  declarations: [FileInputComponent, SectionHeadingComponent, TaskidInputComponent, FilterPipe]
})
export class SharedModule { }
