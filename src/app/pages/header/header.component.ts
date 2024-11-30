import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private componentName: string = `RegisterComponent`;

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  constructor() {
    const functionName: string = `constructor`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
  }

  public ngOnInit(): void {
    const lifecycleName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @Login`);
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

}
