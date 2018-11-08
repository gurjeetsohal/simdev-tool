import { Component, OnInit, ViewChild } from '@angular/core';
import { UserSettingsService } from '../../../core/services/user-settings.service';
import { FileInputComponent } from '../../../shared/components/file-input/file-input.component';
import { UserData } from '../../../../app.config';
import { IUserData } from '../../../core/models/user-data.model';
import { IDORPATH, StepInfo } from './../../models/input.model';

@Component({
  selector: 'app-source-task-info',
  templateUrl: './source-task-info.component.html',
  styleUrls: ['./source-task-info.component.scss']
})
export class SourceTaskInfoComponent implements OnInit {

  sim5DirectoryPath = '';
  sourcePath = '';
  selectedItem = IDORPATH.ID;
  sourceId = '';
  stepInfo: StepInfo = {
    type: IDORPATH.ID,
    path: '',
    id: ''
  };
  placeholderText = 'Enter the path of Task folder';

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

  getUserSettings() {
    return this.userSettingsService.getUserSettings();
  }

  getCheckedRadioItem($event: any) {
    this.selectedItem = $event.target.getAttribute(`value`);
  }

  getTaskInfo() {

    if (this.selectedItem === IDORPATH.ID) {
      this.stepInfo['type'] = IDORPATH.ID;
      this.stepInfo['id'] = this.sourceId;
    } else {
      this.stepInfo['type'] = IDORPATH.PATH;
      this.sourcePath = this.sourcePathEle.defaultFilePath;
      if (this.sourcePath.startsWith(this.sim5DirectoryPath)) {
        this.stepInfo['path'] = this.sourcePath.substr(this.sim5DirectoryPath.length);
      }
    }
    return this.stepInfo;
  }


}

