import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { FileService } from './file.service';
import { DefaultUserSettings } from '../../../app.config';
import { IUserData, IUserDataProperty } from '../models/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  constructor(private electronService: ElectronService, private fileService: FileService) {
    this.storeDefaultUserSettings();
  }

  // This will just return the property on the `data` object
  async get(key: string): Promise<IUserDataProperty> {
    const userSettings = await this.getUserSettings();
    const value = userSettings[key];
    if (value !== undefined) {
      return value;
    }
    return null;
  }

  async storeSettings(userSettings: IUserData): Promise<void> {
    const userSettingsFilePath =  await this.getUserSettingsFilePath();
    return this.fileService.writeFile(userSettingsFilePath, JSON.stringify(userSettings));
  }

  // make file empty
  async deleteAllUserSettings(): Promise<void> {
    const userSettingsFilePath =  await this.getUserSettingsFilePath();
    const userSettings = JSON.parse(JSON.stringify(DefaultUserSettings));
    return this.fileService.writeFile(userSettingsFilePath, JSON.stringify(userSettings));
  }

  async getUserSettings(): Promise<IUserData> {
    if (this.electronService.isElectron()) {
      try {
        const userSettingsFilePath =  await this.getUserSettingsFilePath();
        const fileData: string = await this.fileService.readFile(userSettingsFilePath);
        return JSON.parse(fileData);
      } catch (err) {
        throw new Error(err);
      }
    } else {
      return null;
    }
  }

  // If 'user-data.json' is already present then do nothing and
  // if file is not present then create the new file and store the deafault settings
  private async storeDefaultUserSettings(): Promise<void> {
    if (this.electronService.isElectron()) {
      const userSettingsFilePath = await this.getUserSettingsFilePath();
      const fs = this.fileService.getfs();

      // if file not present then create the one with default settings
      if (!fs.existsSync(userSettingsFilePath)) {
        return this.fileService.writeFile(userSettingsFilePath, JSON.stringify(DefaultUserSettings));
      }
    }
  }

  private async getUserSettingsFilePath(): Promise<string> {
    if (this.electronService.isElectron()) {
      // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
      // app.getPath('userData') will return a string of the user's app data directory path.
      const userDataPath = (this.electronService.electron.app || this.electronService.electron.remote.app).getPath('userData');
      return this.electronService.path.join(userDataPath, 'user-data.json');
    }
    return null;
  }

}
