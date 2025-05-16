import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})

export class HelpComponent implements OnInit {
  public lastSegment: string = '';

  constructor(private route: ActivatedRoute) {
    const functionName: string = `constructor`;
  }

  public async ngOnInit() {
    const lifecycleName: string = `ngOnInit`;

    this.route.url.subscribe(segments => {
      this.lastSegment = segments[segments.length - 1]?.path;
    });
  }
}
