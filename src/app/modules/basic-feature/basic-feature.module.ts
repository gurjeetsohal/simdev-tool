import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskToolComponent } from './components/task-tool/task-tool.component';
import { CodeBaseComponent } from './components/code-base/code-base.component';
import { WebLinkComponent } from './components/web-link/web-link.component';
import { BasicFeatureComponent } from './basic-feature.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [TaskToolComponent, CodeBaseComponent, WebLinkComponent, BasicFeatureComponent],
  declarations: [TaskToolComponent, CodeBaseComponent, WebLinkComponent, BasicFeatureComponent]
})
export class BasicFeatureModule { }
