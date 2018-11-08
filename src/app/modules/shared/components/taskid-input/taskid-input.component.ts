import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TaskRepositoryService } from '../../../core/services/task-repository.service';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-taskid-input',
  templateUrl: './taskid-input.component.html',
  styleUrls: ['./taskid-input.component.scss']
})
export class TaskidInputComponent implements OnInit {

  inputTaskId = '';
  filteredTaskIds: string[] = [];
  showDropdownList = false;
  currentFocus = -1;
  isValidTaskId = false;
  taskListHeight = 45;

  @ViewChild('filteredTaskIDList') filteredTaskIDList: ElementRef;

  constructor(private taskRepositoryService: TaskRepositoryService, private storageService: StorageService) {
    this.getFriendlyTaskIdList();
  }

  ngOnInit() {
    this.inputTaskId = this.storageService.get();
  }

  async getTaskID() {
    return this.inputTaskId;
  }

  async getFriendlyTaskIdList(): Promise<string[]> {
    const taskIdList = await this.taskRepositoryService.getFriendlyTaskIdList();
    this.filteredTaskIds = taskIdList;
    return taskIdList;
  }

  async validateTaskId(taskId: string): Promise<any> {
    const taskIdList = await this.getFriendlyTaskIdList();
    if (taskIdList.includes(taskId)) {
      this.isValidTaskId = true;
      this.showDropdownList = false;
      // Storing the entered task id in a service so that it can persist over route changes
      this.storageService.set(taskId);
      this.inputTaskId = taskId;
    } else {
      alert('Incorrect taskId');
      return null;
    }
  }

  focusAttributeListItem(e: any) {
    if (this.inputTaskId.length < 2) {
      this.showDropdownList = false;
      return;
    }
    this.showDropdownList = true;
    const filteredListElements = this.filteredTaskIDList.nativeElement.children;
    if (e.keyCode === 40 || e.keyCode === 9) { // down
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      e.preventDefault();
      this.currentFocus++;
      /*and and make the current item more visible:*/
      this.addActive(filteredListElements);
      this.filteredTaskIDList.nativeElement.scrollTop = this.taskListHeight * this.currentFocus;
    } else if (e.keyCode === 38) { // up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      this.currentFocus--;
      /*and and make the current item more visible:*/
      this.addActive(filteredListElements);
      this.filteredTaskIDList.nativeElement.scrollTop = this.taskListHeight * this.currentFocus;
    } else if (e.keyCode === 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      if (this.currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (filteredListElements) {
          this.inputTaskId = filteredListElements[this.currentFocus].textContent;
          this.validateTaskId(this.inputTaskId);
          this.showDropdownList = false;
        }
      }
    } else {
      this.currentFocus = -1;
      this.removeActive(filteredListElements);
    }
  }

  addActive(filteredTaskIDList: any) {
    /*a function to classify an item as "active":*/
    if (!filteredTaskIDList) {
      return false;
    }
    /*start by removing the "active" class on all items:*/
    this.removeActive(filteredTaskIDList);
    if (this.currentFocus >= filteredTaskIDList.length) {
      this.currentFocus = 0;
    }

    if (this.currentFocus < 0) {
      this.currentFocus = (filteredTaskIDList.length - 1);
    }
    // /*add class "autocomplete-active":*/
    return filteredTaskIDList[this.currentFocus].classList.add('autocomplete-active');
  }

  removeActive(filteredListElements: any) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (const listElement of filteredListElements) {
      listElement.classList.remove('autocomplete-active');
    }
  }

  closeDropdown() {
    this.filteredTaskIds = [];
  }
}
