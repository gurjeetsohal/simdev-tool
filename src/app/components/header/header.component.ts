import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../app.config';
import { ElectronService } from '../../modules/core/services/electron.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  AppConfig  = AppConfig;
  userName: String = 'Guest User';

  constructor(private electronService: ElectronService) { }

  ngOnInit() {
    if (this.electronService.isElectron()) {
      this.userName = this.electronService.os.userInfo().username;
    }
  }

}
