import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  taskIdStored = '';

  constructor() { }

  get(): any {
    return this.taskIdStored;
  }

  set(taskId: string): any {
    this.taskIdStored = taskId;
  }

}
