import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { UserSettingsService } from '../../../core/services/user-settings.service';
import { FileInputComponent } from '../../../shared/components/file-input/file-input.component';
import { UserData } from '../../../../app.config';
import { IUserData } from '../../../core/models/user-data.model';
import { IDORPATH, StepInfo } from './../../models/input.model';

@Component({
  selector: 'app-source-step-info',
  templateUrl: './source-steps-info.component.html',
  styleUrls: ['./source-steps-info.component.scss']
})
export class SourceStepsInfoComponent implements OnInit {
  sourceId = '';
  sim5DirectoryPath = '';
  sourcePath = '';
  selectedItem = IDORPATH.ID;
  _ref: any;
  stepInfo: StepInfo = {
    type: IDORPATH.ID,
    path: '',
    id: ''
  };
  placeholderText = 'Enter the path of Step folder';

  @Input() index: number;
  @Output() stepRemovedEvent = new EventEmitter();
  @ViewChild('sourcePathRef') sourcePathEle: FileInputComponent;

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

  getCheckedRadioItem($event: any) {
    this.selectedItem = $event.target.getAttribute(`value`);
  }

  removeStep() {
    this.stepRemovedEvent.emit(this.index);
    this._ref.destroy();
  }

  getUserSettings() {
    return this.userSettingsService.getUserSettings();
  }

  getStepsInfo() {
    if (this.selectedItem === IDORPATH.ID) {
      this.stepInfo['type'] = IDORPATH.ID;
      this.stepInfo['id'] = this.sourceId;
    } else {
      this.stepInfo['type'] = IDORPATH.PATH;
      this.sourcePath = this.sourcePathEle.defaultFilePath;
      let sourcePath = '';
      if (this.sourcePath.startsWith(this.sim5DirectoryPath)) {
        sourcePath = this.sourcePath.substr(this.sim5DirectoryPath.length);
      }
      this.stepInfo['path'] = sourcePath;
    }

    return this.stepInfo;
  }


}

