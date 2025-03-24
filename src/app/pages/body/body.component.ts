import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  private componentName: string = `BodyComponent`;

  @Input() collapsed = false;
  public viewReady: boolean = false;
  @Input() screenWidth = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public getBodyClass(): string {
    const authRoutes = ['/login', '/register', '/forgot'];

    if (authRoutes.includes(this.router.url)) {
      return 'body-auth';
    }

    if (this.collapsed && this.screenWidth > 768) {
      return 'body-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      return 'body-md-screen';
    }
    return '';
  }
}
