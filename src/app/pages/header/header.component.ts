import { Component, HostListener, Input, OnInit } from '@angular/core';
import { userItems } from './header-dummy-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private componentName: string = `RegisterComponent`;

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  public canShowSearchAsOverlay = false;

  public userItems = userItems;

  constructor() {
    const functionName: string = `constructor`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
  }

  @HostListener('window:resize', ['event'])
    onResize(event: any): void {
      const lifecycleName: string = `onResize`;
      const logPath: string = `/${this.componentName}/${lifecycleName}()`
      this.checkCanShowSearchAsOverlay(window.innerWidth);
    }

  public ngOnInit(): void {
    const lifecycleName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Login`);

    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  public getHeadClass(): string {
    const lifecycleName: string = `getHeadClass`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Login`);

    let styleClass = '';

    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }

    return styleClass;
  }

  public checkCanShowSearchAsOverlay(innerWidth: number) : void {
    if(innerWidth < 845) {
      this.canShowSearchAsOverlay = true;
    } else {
      this.canShowSearchAsOverlay = false;
    }
  }

}
