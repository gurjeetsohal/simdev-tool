import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectronService } from './services/electron.service';
import { FileService } from './services/file.service';
import { TaskRepositoryService } from './services/task-repository.service';
import { UserSettingsService } from './services/user-settings.service';
import { BrowserService } from './services/browser.service';
import { DirectoryService } from './services/directory.service';
import { CommonUtilitiesService } from './services/common-utilities.service';
import { CodeBaseService } from './services/code-base.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ElectronService,
    FileService,
    TaskRepositoryService,
    UserSettingsService,
    BrowserService,
    DirectoryService,
    CommonUtilitiesService,
    CodeBaseService
  ]
})
export class CoreModule { }
