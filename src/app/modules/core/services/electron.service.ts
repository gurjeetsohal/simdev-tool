import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  shell: any;
  DOMParser: any;
  electron: any;
  path: any;
  util: any;
  os: any;
  XMLSerializer: any;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.electron = window.require('electron');
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.shell = window.require('electron').shell;
      this.DOMParser = window.require('xmldom').DOMParser;
      this.XMLSerializer = window.require('xmldom').XMLSerializer;
      this.path = window.require('path');
      this.util = window.require('util');
      this.os = window.require('os');
    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

}
