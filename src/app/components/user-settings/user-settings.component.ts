import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { UserSettingsService } from '../../modules/core/services/user-settings.service';
import { FileInputComponent } from '../../modules/shared/components/file-input/file-input.component';
import { UserData } from '../../app.config';
import { IUserData } from '../../modules/core/models/user-data.model';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  sim5servicePath = '';
  sim5launchurl = '';
  userSettings: IUserData;

  @ViewChild('sim5servicePathRef') sim5servicePathEle: FileInputComponent;
  @ViewChild('sim5launchurlRef') sim5launchurlEle: ElementRef;

  constructor(private userSettingsService: UserSettingsService) {
    this.populateSettingsField();
  }

  ngOnInit() {}

  async populateSettingsField() {
    this.userSettings = await this.getUserSettings();
    this.sim5servicePath = this.userSettings[UserData.SIM5SERVICE_PATH]['value'];
    this.sim5launchurl = this.userSettings[UserData.SIM5LAUNCH_URL]['value'];
  }

  async clearFields() {
    this.sim5servicePath = '';
    this.sim5launchurl = '';
  }

  async getUserSettings(): Promise<IUserData> {
    return this.userSettingsService.getUserSettings();
  }

  async save() {
    // todo determine all the fields and then store all fields data using loop
    this.userSettings[UserData.SIM5SERVICE_PATH]['value'] = this.sim5servicePathEle.defaultFilePath;
    this.userSettings[UserData.SIM5LAUNCH_URL]['value'] = this.sim5launchurlEle.nativeElement.value;
    this.userSettingsService.storeSettings(this.userSettings);
  }

  async resetToDefault() {
    await this.userSettingsService.deleteAllUserSettings();
    await this.clearFields();
    await this.populateSettingsField();
  }

  async reset() {
    await this.clearFields();
    await this.populateSettingsField();
  }

}
