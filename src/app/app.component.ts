import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Jwt_Login_Angular';
  private componentName: string = `AppComponent`;
  public screenWidth: number = 0
  public isSideNavCollapsed = false;
  public hideSidebarAndHeader = false;

  public constructor(private router: Router) {
    const functionName: string = `constructor`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
  }

  public ngOnInit(): void {
    const lifecycleName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @App`);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.hideSidebarAndHeader = ['/login', '/register', '/forgot'].includes(this.router.url);
      }
    });
  }

  public onToggleSideNav(data: SideNavToggle): void {
    const lifecycleName: string = `onToggleSideNav`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    // console.log(`${logPath}/ @App`);

    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
