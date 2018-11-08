import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit {
  menuItems = [
    {
      name: 'Basic Features',
      iconClass: 'fa-home',
      link: 'basic-feature'
    },
    {
      name: 'Concatenation Tool',
      iconClass: 'fa-link',
      link: 'concatenation-tool'
    },
    {
      name: 'Rebase Tool',
      iconClass: 'fa-refresh',
      link: 'rebase-tool'
    },
    {
      name: 'Settings',
      iconClass: 'fa-cog',
      link: 'settings'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
