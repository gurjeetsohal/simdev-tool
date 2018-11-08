import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RebaseToolComponent } from './rebase-tool.component';
import { SourceTaskInfoComponent } from './components/source-task-info/source-task-info.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports: [RebaseToolComponent, SourceTaskInfoComponent],
  declarations: [RebaseToolComponent, SourceTaskInfoComponent]
})
export class RebaseToolModule { }
