import { Component, OnInit } from '@angular/core';
import {MetafrenzyService} from 'ngx-metafrenzy';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  constructor(private readonly metafrenzyService: MetafrenzyService) {

      this.metafrenzyService.setAllTitleTags('MyQuizzy - Privacy');
      this.metafrenzyService.setAllDescriptionTags('Privacy de MyQuizzy');

  }

  ngOnInit() {
  }

}
