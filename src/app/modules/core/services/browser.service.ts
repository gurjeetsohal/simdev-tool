import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { AppConfig } from '../../../app.config';
import { UserSettingsService } from './user-settings.service';
import { CommonUtilitiesService } from './common-utilities.service';
import { TaskRepositoryService } from './task-repository.service';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  constructor(
          private electronService: ElectronService,
          private userSettingsService: UserSettingsService,
          private commonUtilitiesService: CommonUtilitiesService,
          private taskRepositoryService: TaskRepositoryService
          ) { }

  async launchTaskLocally(taskId: string) {
    const sim5LaunchUrl = await this.userSettingsService.get('sim5LaunchUrl');
    const taskRepoName = await this.taskRepositoryService.getTaskRepoNameFromTaskID(taskId);
    if (taskRepoName === null) {
      throw new Error(`Incorrect Task Id: ${taskId}`);
    }
    if (!sim5LaunchUrl['value'].endsWith('/')) {
      sim5LaunchUrl['value'] = sim5LaunchUrl['value'] + '/';
    }
    const url = `${sim5LaunchUrl['value']}sim5frame.aspx?repo=${taskRepoName}&task=${taskId}`;
    return await this.launchURL(url);
  }

  async launchTaskInBaloo(taskId: string) {
    let url;
    const taskRepoName = await this.taskRepositoryService.getTaskRepoNameFromTaskID(taskId);
    if (taskRepoName === null) {
      throw new Error(`Incorrect Task Id: ${taskId}`);
    }
    if (taskRepoName === AppConfig.taskRepos.TaskRepoSSL) {
      const balooHomeUrl =  AppConfig.urls.balooHomeUrl;
      const appName = this.commonUtilitiesService.getAppNameFromTaskId(taskId);
      // eg - https://baloo.prd-prsn.com/#!/Excel/library/step/XL-183/2019/view
      url = `${balooHomeUrl}${appName}/library/step/${taskId}/2019/view`;
    } else {
      const balooTaskUrl =  AppConfig.urls.balooTaskUrl;
      url = balooTaskUrl + taskId;
    }
    return await this.launchURL(url);
  }

  async launchURL(url: string) {
    if (this.electronService.isElectron()) {
      this.electronService.shell.openExternal(url);
    } else {
      window.open(url);
    }
  }

}
