import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcatenationToolComponent } from './concatenation-tool.component';
import { SourceStepsInfoComponent } from './components/source-steps-info/source-steps-info.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports: [ConcatenationToolComponent, SourceStepsInfoComponent],
  declarations: [ConcatenationToolComponent, SourceStepsInfoComponent],
  entryComponents: [SourceStepsInfoComponent]
})
export class ConcatenationToolModule { }
