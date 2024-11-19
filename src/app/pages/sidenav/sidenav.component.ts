import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter();
  private componentName: string = `SidenavComponent`;
  public collapsed = false;
  public navData = navbarData;
  public screenWidth: number = 0

  public constructor() {
    const functionName: string = `constructor`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
  }

  public ngOnInit(): void {
    const lifecycleName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Sidenav`);

  }

  public toggleCollapse(): void {
    const lifecycleName: string = `toggleColapse`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    this.collapsed = !this.collapsed;
    this.onToggleSidenav.emit({collapsed:this.collapsed, screenWidth: this.screenWidth});
  }

  public closeSidenav(): void {
    const lifecycleName: string = `closeSidenav`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    this.collapsed = false;
    this.onToggleSidenav.emit({collapsed:this.collapsed, screenWidth: this.screenWidth});
  }

}
