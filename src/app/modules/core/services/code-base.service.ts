import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { UserSettingsService } from './user-settings.service';
import { UserData } from '../../../app.config';
import { FileService } from './file.service';
import { CommonUtilitiesService } from './common-utilities.service';

@Injectable({
  providedIn: 'root'
})
export class CodeBaseService {
  constructor(
    private electronService: ElectronService,
    private userSettingsService: UserSettingsService,
    private fileService: FileService,
    private commonUtilitiesService: CommonUtilitiesService
  ) {}

  async updateRepos() {
    const sim5servicePath = await this.userSettingsService.get(UserData.SIM5SERVICE_PATH);
    this.runBatchFile('git-pull.bat', sim5servicePath['value']);
  }

  async runBatchFile(batchFileName: string, args: any) {
    if (this.electronService.isElectron()) {
      this.electronService.childProcess.exec(`start ${batchFileName} ${args}`);
    }
  }

  async updateWebConfig() {
    if (this.electronService.isElectron()) {
      const sim5servicePath = await this.userSettingsService.get(UserData.SIM5SERVICE_PATH);
      const webConfigPath = sim5servicePath['value'] + '\\web.config';
      let webConfig = await this.fileService.readFile(webConfigPath);
      const webConfigXMLDom = await this.commonUtilitiesService.getTaskRepoDOMObject(webConfig);

      const sim5configChildNodes = webConfigXMLDom.getElementsByTagName('SIM5Config')[0].childNodes;
      for (const node of sim5configChildNodes) {
        if (node.tagName === 'add') {
          const key = node.getAttribute('key');
          if (key === 'StarterApp.Settings.AppRootFolder') {
            node.setAttribute('value', sim5servicePath['value']);
          }
          if (key === 'StarterApp.Settings.AppConfFolder') {
            node.setAttribute('value', sim5servicePath['value'] + '\\conf');
          }
        }
      }

      webConfig = await this.commonUtilitiesService.getStringFromXMLDOMObject(webConfigXMLDom);
      await this.fileService.writeFile(webConfigPath, webConfig);

    }
  }
}
