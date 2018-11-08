import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { ElectronService } from './modules/core/services/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public electronService: ElectronService,
    private translate: TranslateService) {

    this.translate.setDefaultLang('en');
    // tslint:disable-next-line:no-console
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      // tslint:disable-next-line:no-console
      console.log('Mode electron');
      // tslint:disable-next-line:no-console
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      // tslint:disable-next-line:no-console
      console.log('NodeJS childProcess', electronService.childProcess);

      // attaching handlers to open developer tools
      // Press CTRL + SHIFT + I to open dev tools
      window.document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.which === 73) {
          this.electronService.remote.getCurrentWindow().webContents.toggleDevTools();
        } else if (e.which === 116) {
          location.reload();
        }
      });

    } else {
      // tslint:disable-next-line:no-console
      console.log('Mode web');
    }
  }
}
