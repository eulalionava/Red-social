import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Publication } from '../../../models/publication';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html'
})
export class TimelineComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
