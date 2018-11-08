import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private electronService: ElectronService) { }

  async readFile(filePath: string): Promise<any> {
    const readFileAsync: any = this.electronService.util.promisify(this.electronService.fs.readFile);
    // if app mode is desktop then read from local File system
    if (this.electronService.isElectron()) {
        return await readFileAsync(filePath, 'utf8');
    } else {
      throw new Error('Cannot access local filesystem');
    }
  }

  async writeFile(filePath: string, data: string): Promise<any> {
    const writeFileAsync: any = this.electronService.util.promisify(this.electronService.fs.writeFile);
    try {
      return await writeFileAsync(filePath, data);
    } catch (err) {
      // TODO: handle exception handling
    }
  }

  getfs() {
    if (this.electronService.isElectron()) {
      return this.electronService.fs;
    }
    return null;
  }

}

