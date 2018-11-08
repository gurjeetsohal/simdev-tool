import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { FileService } from './file.service';
import { Task } from '../models/task.model';
import { AppConfig, UserData } from '../../../app.config';
import { UserSettingsService } from './user-settings.service';
import { CommonUtilitiesService } from './common-utilities.service';

@Injectable({
  providedIn: 'root'
})
export class TaskRepositoryService {

  private repoTaskNodeHelper = {
    getfriendlyTaskID: (repoTaskNode: any) => repoTaskNode.getAttribute('friendlyTaskID'),
    getAppID: (repoTaskNode: any) => repoTaskNode.getAttribute('appID'),
    getXmlPath: (repoTaskNode: any) => repoTaskNode.getAttribute('xmlPath')
  };

  constructor(
    private electronService: ElectronService,
    private fileService: FileService,
    private userSettingsService: UserSettingsService,
    private commonUtilitiesService: CommonUtilitiesService,
  ) {}

  async getTaskNodeAttrsValue(taskId: string): Promise<Task> {
    // tslint:disable-next-line:prefer-const
    let taskNodeAttrs: Task = {};
    let taskNodeFound = false;
    const taskRepoName = await this.getTaskRepoNameFromTaskID(taskId);
    const xmlDoc = await this.getTaskRepoDOMObject(taskRepoName);
    const taskNodes = xmlDoc.getElementsByTagName('task');
    for (const taskNode of taskNodes) {
      if (taskId === taskNode.getAttribute('friendlyTaskID')) {
        taskNodeAttrs['friendlyTaskID'] = this.repoTaskNodeHelper.getfriendlyTaskID(taskNode);
        taskNodeAttrs['appID'] = this.repoTaskNodeHelper.getAppID(taskNode);
        taskNodeAttrs['xmlPath'] = this.repoTaskNodeHelper.getXmlPath(taskNode);
        taskNodeFound = true;
        break;
      }
    }
    if (taskNodeFound) {
      return taskNodeAttrs;
    }
    return null;
  }

  async getFriendlyTaskIdList(taskRepoName?: string) {
    const taskIdList: string[] = [];
    let taskRepos: any = AppConfig.taskRepos;
    if (taskRepoName) {
      taskRepos = {
          taskRepoName: taskRepoName
        };
    }
    for (const prop in taskRepos) {
      if (taskRepos.hasOwnProperty(prop)) {
        const xmlDOM = await this.getTaskRepoDOMObject(taskRepos[prop]);
        const taskNodes = xmlDOM.getElementsByTagName('task');
        for (const taskNode of taskNodes) {
          taskIdList.push(this.repoTaskNodeHelper.getfriendlyTaskID(taskNode));
        }
      }
    }
    return taskIdList;
  }

  async getTaskRepoNameFromTaskID (taskID: string) {
    const taskRepos: any = AppConfig.taskRepos;
    let taskRepo;

    for (const prop in taskRepos) {
      if (taskRepos.hasOwnProperty(prop)) {
        const taskIds: string[] = await this.getFriendlyTaskIdList(taskRepos[prop]);
        if (taskIds.includes(taskID)) {
          taskRepo = taskRepos[prop];
          break;
        }
      }
    }
    if (!taskRepo) {
      throw new Error(`Incorrect Task Id: ${taskID}`);
    }
    return taskRepo;
  }

  private async getTaskRepoXML(taskRepoName: string) {
    // if app mode is desktop then read from local File system
    if (this.electronService.isElectron()) {
      const sim5ServicePath = await this.userSettingsService.get(UserData.SIM5SERVICE_PATH);
      const taskRepoFilePath = sim5ServicePath['value'] + AppConfig.XMLsPathFromSim5Service + taskRepoName;
      return await this.fileService.readFile(taskRepoFilePath);
    } else {
      // Todo make http service to get the file
    }
  }

  private async getTaskRepoDOMObject (taskRepoName: string) {
    const taskRepoXML = await this.getTaskRepoXML(taskRepoName);
    return this.commonUtilitiesService.getTaskRepoDOMObject(taskRepoXML);
  }

}
