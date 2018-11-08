import { Component, OnInit, ViewChild } from '@angular/core';
import { UserSettingsService } from '../core/services/user-settings.service';
import { FileInputComponent } from '../shared/components/file-input/file-input.component';
import { UserData } from '../../app.config';
import { IUserData } from '../core/models/user-data.model';
import { SourceTaskInfoComponent } from './components/source-task-info/source-task-info.component';
import StepConcatenator from 'concatenation-tool/dist/src/step.concatenator';
import { Inputs, MODE, TASKREPO } from '../concatenation-tool/models/input.model';
// const { exec } = require('child_process');


@Component({
  selector: 'app-rebase-tool',
  templateUrl: './rebase-tool.component.html',
  styleUrls: ['./rebase-tool.component.scss']
})
export class RebaseToolComponent implements OnInit {
  inputs: Inputs = {
    checkoutURL: '',
    stepRepoName: '',
    steps: [],
    destination: '',
    mode: MODE.REBASE_XML
  };

  destinationPath = '';
  sim5DirectoryPath = '';
  mode = MODE.REBASE_XML;
  stepCount = 0;
  toolOutput = '';
  stepInfoArr: Array<any> = [];
  placeholderText = 'Enter the path of destination folder';

  @ViewChild('destinationPathRef') destinationPathEle: FileInputComponent;
  @ViewChild('taskInfo') taskInfo: SourceTaskInfoComponent;

  constructor(private userSettingsService: UserSettingsService) { }

  ngOnInit() {
    this.getSIM5DirectoryPath();
  }

  getSIM5DirectoryPath() {
    this.getUserSettings()
      .then((userSettings: IUserData) => {
        this.sim5DirectoryPath = userSettings[UserData.SIM5SERVICE_PATH]['value'];
      });
  }

  getUserSettings() {
    return this.userSettingsService.getUserSettings();
  }

  async rebaseSteps() {

    this.toolOutput = '';

    this.inputs.checkoutURL = this.sim5DirectoryPath;

    this.inputs.destination = this.destinationPathEle.defaultFilePath;

    if (this.inputs.destination.startsWith(this.sim5DirectoryPath)) {
      this.inputs.destination = this.inputs.destination.substr(this.sim5DirectoryPath.length);
    }

    this.inputs.mode = this.mode;
    this.inputs.steps = [];
    this.inputs.stepRepoName = TASKREPO.TASK;
    this.inputs.steps.push(this.taskInfo.getTaskInfo());

    const stepConcatenatorObject = new StepConcatenator();
    await stepConcatenatorObject.process(this.inputs)
      .then(() => {
        const outputPath = this.destinationPathEle.defaultFilePath;
        this.toolOutput = `The rebased task has been saved at destination location: ${outputPath}`;
      })
      .catch((err) => {
        this.toolOutput = err.message;
      });
  }
}

