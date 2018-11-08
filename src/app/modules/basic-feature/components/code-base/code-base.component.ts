import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../../core/services/electron.service';
import { CodeBaseService } from '../../../core/services/code-base.service';

@Component({
  selector: 'app-code-base',
  templateUrl: './code-base.component.html',
  styleUrls: ['./code-base.component.scss']
})
export class CodeBaseComponent implements OnInit {

  constructor(
    private codeBaseService: CodeBaseService,
    private electronService: ElectronService) {}

  ngOnInit() {
  }

  async updateRepos() {
    if (this.electronService.isElectron()) {
      this.codeBaseService.updateRepos();
    }
  }

  async updateWebConfig() {
    this.codeBaseService.updateWebConfig();
  }

}
