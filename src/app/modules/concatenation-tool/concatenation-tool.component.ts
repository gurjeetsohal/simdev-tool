import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { UserSettingsService } from '../../modules/core/services/user-settings.service';
import { FileInputComponent } from '../../modules/shared/components/file-input/file-input.component';
import { UserData } from '../../app.config';
import { IUserData } from '../../modules/core/models/user-data.model';
import { SourceStepsInfoComponent } from './components/source-steps-info/source-steps-info.component';
import StepConcatenator from './../../../../node_modules/concatenation-tool/dist/src/step.concatenator';
import { Inputs, MODE, TASKREPO } from './../concatenation-tool/models/input.model';
// const { exec } = require('child_process');


@Component({
  selector: 'app-concatenation-tool',
  templateUrl: './concatenation-tool.component.html',
  styleUrls: ['./concatenation-tool.component.scss']
})
export class ConcatenationToolComponent implements OnInit {
  inputs: Inputs = {
    checkoutURL: '',
    stepRepoName: '',
    steps: [],
    destination: '',
    mode: MODE.CONCATENATE_STEPS
  };

  destinationPath = '';
  sim5DirectoryPath = '';
  mode = MODE.CONCATENATE_STEPS;
  stepCount = 0;
  toolOutput = '';
  stepInfoArr: Array<any> = [];
  placeholderText = 'Enter the path of destination folder';

  @ViewChild('destinationPathRef') destinationPathEle: FileInputComponent;
  @ViewChild('stepsInfo', { read: ViewContainerRef }) stepInfoContainer: ViewContainerRef;

  constructor(private userSettingsService: UserSettingsService, private _cfr: ComponentFactoryResolver) { }

  ngOnInit() {
    this.getSIM5DirectoryPath();
    this.addStepInfo();
    this.addStepInfo();
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

  async concatenateSteps() {

    this.toolOutput = '';

    this.inputs.checkoutURL = this.sim5DirectoryPath;

    this.inputs.destination = this.destinationPathEle.defaultFilePath;

    if (this.inputs.destination.startsWith(this.sim5DirectoryPath)) {
      this.inputs.destination = this.inputs.destination.substr(this.sim5DirectoryPath.length);
    }

    this.inputs.mode = this.mode;
    this.inputs.steps = [];
    this.inputs.stepRepoName = TASKREPO.STEP;
    for (let i = 0; i < this.stepInfoArr.length; i++) {
      this.inputs.steps.push(this.stepInfoArr[i].instance.getStepsInfo());
    }

    const stepConcatenatorObject = new StepConcatenator();
    await stepConcatenatorObject.process(this.inputs)
      .then(() => {
        const outputPath = this.destinationPathEle.defaultFilePath;
        this.toolOutput = `The concatenated task has been saved at destination location: ${outputPath}`;
      })
      .catch((err) => {
        this.toolOutput = err.message;
      });
  }


  addStepInfo() {
    this.stepCount++;
    const comp = this._cfr.resolveComponentFactory(SourceStepsInfoComponent);
    const sourceStepsInfoComponent = this.stepInfoContainer.createComponent(comp);
    sourceStepsInfoComponent.instance._ref = sourceStepsInfoComponent;
    sourceStepsInfoComponent.instance.index = this.stepCount;
    sourceStepsInfoComponent.instance.stepRemovedEvent.subscribe((event: any) => {
      this.stepRemovedEvent(event);
    });

    this.stepInfoArr.push(sourceStepsInfoComponent);
  }

  stepRemovedEvent(count: any) {
    this.stepCount--;
    this.stepInfoArr.splice(count - 1, 1);
    for (let i = 0; i < this.stepInfoArr.length; i++) {
      const k: number = i + 1;
      this.stepInfoArr[i].instance.index = k;
    }
  }
}

