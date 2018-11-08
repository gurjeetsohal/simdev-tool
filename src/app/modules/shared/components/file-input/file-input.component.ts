import { Component, OnInit, Input } from '@angular/core';
import { ElectronService } from '../../../core/services/electron.service';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {

  @Input()
  defaultFilePath: string;
  @Input()
  placeholderText?: string = 'Enter Sim5 Service Path';

  constructor(
    private electronService: ElectronService
  ) { }

  ngOnInit() {
  }

  openDialog() {
    const selectedFile = this.showOpenDialog();
    if (selectedFile !== undefined) {
      this.defaultFilePath = selectedFile[0];
    }
  }

  private showOpenDialog() {
    if (this.electronService.isElectron()) {
      const dialog: any = this.electronService.remote.dialog;
      return dialog.showOpenDialog({properties: ['openDirectory']});
    }
  }
}
