import { Injectable } from '@angular/core';
import { UserData } from '../../../app.config';
import { UserSettingsService } from './user-settings.service';
import { TaskRepositoryService } from './task-repository.service';
import { ElectronService } from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor(
    private userSettingsService: UserSettingsService,
    private taskRepositoryService: TaskRepositoryService,
    private electronService: ElectronService
  ) { }

  async openTaskDirectory(taskID: string): Promise<any> {
    if (this.electronService.isElectron()) {
        const sim5servicePath = await this.userSettingsService.get(UserData.SIM5SERVICE_PATH);
        const taskNodeAttrs = await this.taskRepositoryService.getTaskNodeAttrsValue(taskID);
        const path = sim5servicePath['value'] + '/XMLs/' + taskNodeAttrs.xmlPath;
        return await this.openDirectory(path);
    }
  }

  async openDirectory(path: string) {
    if (this.electronService.isElectron()) {
      this.electronService.shell.showItemInFolder(path, function(err: Error, data: any) {
        if (!err) {
          return data;
        }
      });
    }
  }
}
