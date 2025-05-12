import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/helpers/auth.service';
import { NavItem } from './nav-item.model';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('50ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 0}),
        animate('50ms',
          style({opacity: 0})
        )
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ]),
  ]
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter();
  private componentName: string = `SidenavComponent`;
  public collapsed = true;
  public navData: NavItem[] = navbarData;
  public filteredNavData: NavItem[] = [];
  public screenWidth: number = 0;
  public screenHeight: number = 0;

  public constructor(private router: Router, private authService: AuthService) {
    const functionName: string = `constructor`;
    const logPath: string = `/${this.componentName}/${functionName}()`;
  }

  public ngOnInit(): void {
    const lifecycleName: string = `ngOnInit`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;
    console.log(`${logPath}/ @Sidenav`);

    const role = this.authService.getUserRole();
    this.filteredNavData = navbarData.filter(item => item.visibleFor.includes(role));

    console.log(`${logPath}/ @role` , role);

    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.collapsed = this.screenWidth > 768;
    this.onToggleSidenav.emit({collapsed:this.collapsed, screenWidth: this.screenWidth});
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

  @HostListener('window:resize', ['event'])
  onResize(event: any): void {
    const lifecycleName: string = `onResize`;
    const logPath: string = `/${this.componentName}/${lifecycleName}()`;

    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    if(this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSidenav.emit({collapsed:this.collapsed, screenWidth: this.screenWidth});
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
