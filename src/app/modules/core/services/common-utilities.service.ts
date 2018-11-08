import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { SIM5AppsName } from '../../../app.config';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilitiesService {

  constructor(
    private electronService: ElectronService
  ) { }

  async getTaskRepoDOMObject (text: string) {
    let domParser;
    if (this.electronService.isElectron()) {
      // for node
      domParser = new this.electronService.DOMParser();
    } else {
      // for web application
      domParser = new DOMParser();
    }

    return domParser.parseFromString(text, 'text/xml');
  }

  async getStringFromXMLDOMObject(xmlDom: string) {
    let XMLSerializer;
    if (this.electronService.isElectron()) {
      // for node
      XMLSerializer = new this.electronService.XMLSerializer();
    } else {
      // for web application
    }
    return XMLSerializer.serializeToString(xmlDom);
  }

  getAppNameFromTaskId(taskID: string) {
    const abbrAppName: string = taskID.match(/(XL|WD|AC|PPT)/g)[0];
    const appName: SIM5AppsName = (<any>SIM5AppsName)[abbrAppName];
    return appName;
  }

}
