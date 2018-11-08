import { Component, OnInit, ViewChild } from '@angular/core';
import { BrowserService } from '../../../core/services/browser.service';
import { ElectronService } from '../../../core/services/electron.service';
import { DirectoryService } from '../../../core/services/directory.service';
import { TaskidInputComponent } from '../../../shared/components/taskid-input/taskid-input.component';
import { AppConfig } from '../../../../app.config';

@Component({
  selector: 'app-task-tool',
  templateUrl: './task-tool.component.html',
  styleUrls: ['./task-tool.component.scss']
})
export class TaskToolComponent implements OnInit {

  @ViewChild('taskidValue') taskidInputElement: TaskidInputComponent;

  buttonContent = [
    {
      text: 'SIMS',
      iconClass: 'fa-play',
      method: 'launchTaskLocally'
    },
    {
      text: 'Folder',
      iconClass: 'fa-folder',
      method: 'openTaskFolder'
    },
    {
      text: 'Baloo',
      iconClass: 'fa-child',
      method: 'openTaskInBaloo'
    },
    {
      text: 'Jira',
      iconClass: 'fa-code',
      method: 'launchJira'
    },
  ];

  constructor(
    private browserService: BrowserService,
    private electronService: ElectronService,
    private directoryService: DirectoryService
  ) { }

  ngOnInit() {
  }

  async launchTaskLocally() {
    const taskID = await this.taskidInputElement.getTaskID();
    if (taskID) {
      try {
        return await this.browserService.launchTaskLocally(taskID);
      } catch (err) {
        alert(`Incorrect Task ID: ${taskID}`)
      }
    } else {
      alert('Please enter the task id');
    }
  }

  async openTaskInBaloo() {
    const taskID = await this.taskidInputElement.getTaskID();
    if (taskID) {
      try {
        return await this.browserService.launchTaskInBaloo(taskID);
      } catch (err) {
        alert(`Incorrect Task ID: ${taskID}`);
      }
    } else {
      alert('Please enter the task id');
    }
  }

  async openTaskFolder() {
    const taskID = await this.taskidInputElement.getTaskID();
    if (this.electronService.isElectron() && taskID) {
      try {
        return await this.directoryService.openTaskDirectory(taskID);
      } catch (err) {
        alert(`Incorrect Task ID: ${taskID}`);
      }
    } else {
      alert('Please enter the task id');
    }
  }

  async launchJira() {
    const taskID = await this.taskidInputElement.getTaskID();
    if (taskID) {
      return await this.browserService.launchURL(AppConfig.urls.jiraUrl);
    }
    alert('Please enter the task id');
  }
}
